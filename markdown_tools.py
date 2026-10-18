#!/usr/bin/env python3
"""Buduje statyczną stronę z plików źródłowych Markdown w src/."""

import html
import re
import unicodedata

import markdown


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
