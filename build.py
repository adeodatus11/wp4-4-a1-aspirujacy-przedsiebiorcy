#!/usr/bin/env python3
"""Buduje statyczną stronę z plików źródłowych Markdown w src/."""

import html
import os
import re
import unicodedata

import markdown

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "src")

SITE_TITLE = "Program coachingowy dla aspirujących przedsiębiorców"
SITE_SUB = "WP4.4.A1 · WIN4SMEs CoVE"

# (plik źródłowy, nazwa wyjściowa, etykieta w nawigacji, numer w nawigacji)
PAGES = [
    ("10_Wyniki_przegladu.md", "analiza.html", "Co zawierają materiały", "→"),
    ("00_README_przeglad_programu.md", "przeglad.html", "Przegląd programu", "→"),
    ("01_Modul_1_Coaching.md", "modul-1.html", "Coaching", "1"),
    ("02_Modul_2_Postawa_przedsiebiorcza.md", "modul-2.html", "Postawa przedsiębiorcza", "2"),
    ("03_Modul_3_Walidacja_pomyslu.md", "modul-3.html", "Walidacja pomysłu", "3"),
    ("04_Modul_4_Model_biznesowy_LEAN.md", "modul-4.html", "Model biznesowy / LEAN", "4"),
    ("05_Modul_5_Narzedzia_cyfrowe_AI.md", "modul-5.html", "Narzędzia cyfrowe, AI", "5"),
    ("06_Modul_6_Marketing_STP.md", "modul-6.html", "Marketing, STP", "6"),
    ("07_Modul_7_ESG_zrownowazony_rozwoj.md", "modul-7.html", "Zielona gospodarka, ESG", "7"),
    ("08_Modul_8_Pitch_finansowanie.md", "modul-8.html", "Pitch i finansowanie", "8"),
    ("09_Wdrozenie_i_rekrutacja.md", "wdrozenie.html", "Wdrożenie i rekrutacja", "→"),
]

FLAG_HINTS = ("Luka w materiale", "BRAK w materiale", "Uwaga kluczowa",
              "W żaden sposób", "Uwaga o kompletności", "Uwaga lokalizacyjna")


PL_MAP = str.maketrans({"ł": "l", "Ł": "L", "ß": "ss"})


def slug(text):
    text = re.sub(r"<[^>]+>", "", text)
    text = html.unescape(text)
    text = text.translate(PL_MAP)
    text = unicodedata.normalize("NFKD", text)
    text = "".join(c for c in text if not unicodedata.combining(c))
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text or "sekcja"


def split_front(md_text):
    """Zwraca (tytuł, blok metadanych, treść).

    Metadane to kolejne niepuste wiersze bezpośrednio pod tytułem H1 —
    wszystko dalej (łącznie z blokami cytatu) trafia do treści.
    """
    lines = md_text.splitlines()
    title = ""
    i = 0
    if lines and lines[0].startswith("# "):
        title = lines[0][2:].strip()
        i = 1
    while i < len(lines) and not lines[i].strip():
        i += 1
    meta = []
    while i < len(lines) and lines[i].strip() and not lines[i].startswith("#") and lines[i].strip() != "---":
        meta.append(lines[i])
        i += 1
    while i < len(lines) and (not lines[i].strip() or lines[i].strip() == "---"):
        i += 1
    body = "\n".join(lines[i:]).lstrip("\n")
    return title, "\n".join(meta), body


def fix_lists(md_text):
    """Markdown wymaga pustego wiersza przed listą — źródła go nie mają."""
    out = []
    prev = ""
    for line in md_text.splitlines():
        starts_list = re.match(r"^\s{0,3}(\d+\.|[-*+])\s", line)
        prev_is_list = re.match(r"^\s*(\d+\.|[-*+])\s", prev)
        prev_is_block = prev.strip().startswith((">", "|", "#")) or not prev.strip()
        if starts_list and prev.strip() and not prev_is_list and not prev_is_block:
            out.append("")
        out.append(line)
        prev = line
    return "\n".join(out)


def render_md(text, breaks=False):
    ext = ["tables", "fenced_code", "sane_lists", "attr_list"]
    if breaks:
        ext.append("nl2br")
    return markdown.markdown(fix_lists(text), extensions=ext, output_format="html5")


def postprocess(body_html):
    """Nadaje id nagłówkom, opakowuje tabele, oznacza bloki ostrzegawcze."""
    if re.search(r"<h1[ >]", body_html):
        body_html = re.sub(r"<(\/?)(h)([1-4])(?=[ >])", lambda m: "<" + m[1] + m[2] + str(int(m[3]) + 1), body_html)
    toc = []
    used = set()

    def head_repl(m):
        level, attrs, inner = m.group(1), m.group(2), m.group(3)
        attrs = re.sub(r' id="[^"]*"', "", attrs)
        flagged = "⚠️" in inner
        clean = inner.replace("⚠️", "").strip()
        base = slug(clean)
        sid = base
        n = 2
        while sid in used:
            sid = f"{base}-{n}"
            n += 1
        used.add(sid)
        if level in ("1", "2"):
            plain = re.sub(r"<[^>]+>", "", clean)
            toc.append((level, sid, html.unescape(plain)))
        cls = ' class="h-flag"' if flagged else ""
        return f'<h{level} id="{sid}"{cls}{attrs}>{clean}</h{level}>'

    out = re.sub(r"<h([1-4])([^>]*)>(.*?)</h\1>", head_repl, body_html, flags=re.S)
    out = out.replace("<table>", '<div class="tablewrap"><table>').replace("</table>", "</table></div>")

    def quote_repl(m):
        inner = m.group(1)
        if any(h in inner for h in FLAG_HINTS) or "⚠️" in inner:
            return f'<blockquote class="is-flag">{inner.replace("⚠️", "").replace("<h3", "<h3")}</blockquote>'
        return f"<blockquote>{inner}</blockquote>"

    out = re.sub(r"<blockquote>(.*?)</blockquote>", quote_repl, out, flags=re.S)

    def task_repl(m):
        rest = m.group(1)
        cls = "task"
        if rest.lstrip().startswith("⚠️"):
            cls += " is-gap"
            rest = rest.lstrip()[2:].lstrip()
        return f'<li class="{cls}">{rest}'

    out = re.sub(r"<li>\[ \]\s*(.*)", task_repl, out)
    out = out.replace("⚠️ ", "").replace("⚠️", "")
    return out, toc


def nav_html(current):
    rows = []
    rows.append('<p class="nav__group">Materiał</p>')
    rows.append('<ul class="nav__list">')
    for _, out, label, num in PAGES:
        if num == "→" and out == "modul-1.html":
            continue
        if out == "wdrozenie.html":
            rows.append("</ul>")
            rows.append('<p class="nav__group">Realizacja</p>')
            rows.append('<ul class="nav__list">')
        cur = ' aria-current="page"' if out == current else ""
        rows.append(
            f'<li><a class="nav__link" href="{out}"{cur}>'
            f'<span class="nav__num">{num}</span><span>{label}</span></a></li>'
        )
        if out == "przeglad.html":
            rows.append("</ul>")
            rows.append('<p class="nav__group">Moduły</p>')
            rows.append('<ul class="nav__list">')
    rows.append("</ul>")
    return "\n".join(rows)


def toc_html(toc):
    if len(toc) < 3:
        return ""
    items = "\n".join(
        f'<li><a href="#{sid}">{html.escape(text)}</a></li>'
        for level, sid, text in toc if level in ("1", "2")
    )
    if not items:
        return ""
    return f'<details class="toc" id="page-toc" open><summary class="nav__group">Na tej stronie</summary><nav aria-label="Spis treści strony"><ul class="toc__list">{items}</ul></nav></details>'


HEAD = """<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="stylesheet" href="assets/site.css">
<script src="assets/site.js"></script>
</head>
<body>
<a class="skip" href="#main">Przejdź do treści</a>
<div class="shell">
<aside class="rail">
<a class="rail__brand" href="index.html">
<span class="rail__mark">{sub}</span>
<span class="rail__title">{brand}</span>
</a>
<details class="navbox" id="navbox" open>
<summary class="navbox__toggle">Spis materiału</summary>
<nav aria-label="Nawigacja główna">
{nav}
</nav>
</details>
{toc}
<button class="theme-toggle" id="theme-toggle" type="button">Tryb ciemny</button>
</aside>
<main class="main" id="main">
"""

FOOT = """
<footer class="sitefoot wrap">
<p>Opracowanie merytoryczne materiałów źródłowych programu WP4.4.A1 — <em>Consulting and coaching programme for aspiring entrepreneurs</em>.</p>
<p>Projekt wdrożenia: Wiesław Filipiak, Maciej Najwer, Zespół Szkół Zawodowych nr 5 we Wrocławiu, listopad 2025. Testowanie: 1.09.2025 – 28.02.2027.</p>
<p>Finansowane przez Unię Europejską. Wyrażone poglądy i opinie są jedynie opiniami autorów i niekoniecznie odzwierciedlają poglądy Unii Europejskiej lub Europejskiej Agencji Wykonawczej ds. Edukacji i Kultury (EACEA). Unia Europejska ani EACEA nie ponoszą za nie odpowiedzialności.</p>
</footer>
</main>
</div>
</body>
</html>
"""


def page_shell(title, desc, nav, toc, inner, current=None):
    head = HEAD.format(
        title=html.escape(title),
        desc=html.escape(desc),
        sub=SITE_SUB,
        brand=SITE_TITLE,
        nav=nav,
        toc=toc,
    )
    return (head + inner + FOOT).replace("—", "–")


def pagenav(idx):
    prev_item = PAGES[idx - 1] if idx > 0 else None
    next_item = PAGES[idx + 1] if idx + 1 < len(PAGES) else None
    parts = ['<nav class="pagenav wrap" aria-label="Nawigacja między stronami">']
    if prev_item:
        parts.append(
            f'<a class="is-prev" href="{prev_item[1]}"><span class="pagenav__dir">Poprzednia</span>'
            f'<span class="pagenav__name">{html.escape(prev_item[2])}</span></a>'
        )
    if next_item:
        parts.append(
            f'<a class="is-next" href="{next_item[1]}"><span class="pagenav__dir">Następna</span>'
            f'<span class="pagenav__name">{html.escape(next_item[2])}</span></a>'
        )
    parts.append("</nav>")
    return "\n".join(parts)


def build():
    for idx, (src_name, out_name, label, num) in enumerate(PAGES):
        raw = open(os.path.join(SRC, src_name), encoding="utf-8").read().replace("—", "–")
        title, meta_md, body_md = split_front(raw)
        body_html, toc = postprocess(render_md(body_md))
        meta_html = render_md(meta_md, breaks=True) if meta_md.strip() else ""

        eyebrow = f"Moduł {num}" if num.isdigit() else ("Przegląd dokumentacji" if out_name == "analiza.html" else "Materiał" if out_name == "przeglad.html" else "Realizacja")

        inner = [
            '<header class="pagehead wrap">',
            f'<p class="eyebrow">{eyebrow}</p>',
            f"<h1>{html.escape(title)}</h1>",
        ]
        if meta_html:
            inner.append(f'<div class="pagehead__meta">{meta_html}</div>')
        inner.append("</header>")
        inner.append(f'<article class="prose wrap"><p class="reading-note">Synteza materiałów i propozycje metodyczne. <a href="analiza.html">Zakres przeglądu i ograniczenia</a>.</p>{body_html}</article>')
        inner.append(pagenav(idx))

        desc = re.sub(r"<[^>]+>", " ", meta_html)
        desc = " ".join(desc.split())[:180] or title

        page = page_shell(
            f"{title} — {SITE_TITLE}",
            desc,
            nav_html(out_name),
            toc_html(toc),
            "\n".join(inner),
        )
        with open(os.path.join(ROOT, out_name + ".tmp"), "w", encoding="utf-8") as fh:
            fh.write(page)
        os.replace(os.path.join(ROOT, out_name + ".tmp"), os.path.join(ROOT, out_name))
        print("zapisano", out_name, len(page) // 1024, "KB")


if __name__ == "__main__":
    build()
