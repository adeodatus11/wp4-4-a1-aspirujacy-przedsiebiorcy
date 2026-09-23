/* Przełącznik motywu — zapamiętywany lokalnie w przeglądarce. */
(function () {
  var KEY = "wp44-theme";
  var root = document.documentElement;

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function save(v) {
    try { v ? localStorage.setItem(KEY, v) : localStorage.removeItem(KEY); } catch (e) { /* prywatne okno */ }
  }

  var saved = stored();
  if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);

  function label(btn) {
    var explicit = root.getAttribute("data-theme");
    var dark = explicit
      ? explicit === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    btn.textContent = dark ? "Tryb jasny" : "Tryb ciemny";
    btn.setAttribute("aria-label", dark ? "Przełącz na tryb jasny" : "Przełącz na tryb ciemny");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var nav = document.getElementById("navbox");
    if (nav && window.matchMedia("(max-width: 62rem)").matches) nav.removeAttribute("open");

    var toc = document.getElementById("page-toc");
    if (toc && window.matchMedia("(max-width: 62rem)").matches) toc.removeAttribute("open");
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    label(btn);
    btn.addEventListener("click", function () {
      var explicit = root.getAttribute("data-theme");
      var dark = explicit
        ? explicit === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
      var next = dark ? "light" : "dark";
      root.setAttribute("data-theme", next);
      save(next);
      label(btn);
    });
  });
})();
