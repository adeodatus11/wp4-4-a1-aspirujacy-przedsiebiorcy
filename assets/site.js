(function () {
  'use strict';
  const C = window.CourseCore, key = 'pracownia-project-v1';
  const $ = q => document.querySelector(q), $$ = q => [...document.querySelectorAll(q)];
  const data = window.COURSE_DATA || [];
  let state = C.blank(), storageOK = true;
  function warning() { storageOK = false; $('#storage-warning').hidden = false; }
  function read() {
    try { const raw = localStorage.getItem(key); return raw ? C.normalize(JSON.parse(raw)) : C.blank(); }
    catch (_) { warning(); return state; }
  }
  state = read();
  function update(change) {
    const next = storageOK ? read() : state;
    change(next); state = next;
    try { localStorage.setItem(key, JSON.stringify(state)); }
    catch (_) { warning(); }
    $$('.save-state').forEach(el => el.textContent = storageOK ? 'Zapisano na tym urządzeniu' : 'Tylko w tej sesji — eksportuj kopię');
  }
  function progress() {
    $$('[data-completed-count]').forEach(el => el.textContent = state.completed.length);
    const bar = $('#course-progress');
    if (bar) { bar.value = state.completed.length; bar.textContent = state.completed.length + ' z 8'; }
    $$('[data-status]').forEach(el => el.classList.toggle('done', state.completed.includes(Number(el.dataset.status))));
    $$('[data-state]').forEach(el => {
      const n = Number(el.dataset.state), done = state.completed.includes(n);
      el.textContent = done ? 'Ukończony ✓' : state.visited.includes(n) ? 'W trakcie' : 'Do rozpoczęcia';
      el.classList.toggle('done', done);
    });
    $$('[data-complete]').forEach(el => el.checked = state.completed.includes(Number(el.dataset.complete)));
    const next = data.find(m => !state.completed.includes(m.n)), link = $('#continue-learning');
    if (link && next) { link.href = `modul-${next.n}.html`; link.textContent = `${state.visited.length ? 'Kontynuuj' : 'Zacznij'} od modułu ${next.n} ↗`; }
    else if (link) { link.href = 'moj-projekt.html'; link.textContent = 'Zobacz swój projekt ↗'; }
  }
  function role(value) {
    document.body.dataset.role = value;
    $('#role-select').value = value;
  }
  // Wejście do warsztatu lub bezpośredni odnośnik do scenariusza wybiera widok prowadzącego.
  if (document.body.dataset.defaultRole === 'teacher' || location.hash === '#dla-prowadzacego') update(s => s.role = 'teacher');
  role(state.role);
  $('#role-select').addEventListener('change', ev => { role(ev.target.value); update(s => s.role = ev.target.value); });
  window.addEventListener('hashchange', () => { if (location.hash === '#dla-prowadzacego') { role('teacher'); update(s => s.role = 'teacher'); } });
  const moduleNumber = Number(document.body.dataset.module);
  if (moduleNumber && !state.visited.includes(moduleNumber)) update(s => s.visited.push(moduleNumber));
  progress();
  $('.mobile-toggle').addEventListener('click', ev => {
    const button = ev.currentTarget, expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    $('#main-navigation').classList.toggle('open', !expanded);
  });
  $$('[data-complete]').forEach(el => el.addEventListener('change', () => {
    const n = Number(el.dataset.complete);
    update(s => s.completed = el.checked ? [...new Set([...s.completed, n])] : s.completed.filter(x => x !== n));
    progress();
  }));
  function populateNotes() {
    $$('[data-note]').forEach(el => { el.value = state.notes[el.dataset.note] || ''; el.maxLength = el.id === 'project-name' ? 150 : 20000; });
  }
  populateNotes();
  $$('[data-note]').forEach(el => el.addEventListener('input', () => update(s => s.notes[el.dataset.note] = el.value)));
  window.addEventListener('storage', ev => {
    if (ev.key === key) { state = read(); populateNotes(); progress(); role(state.role); renderCash(); }
  });

  // Wyniki wyszukiwania powstają wyłącznie z węzłów tekstowych, również dla importowanych notatek.
  function node(tag, text, cls) { const el = document.createElement(tag); if (text !== undefined) el.textContent = text; if (cls) el.className = cls; return el; }
  function showSearch() {
    const query = $('#site-search').value.trim(), box = $('#search-results');
    if (query.length < 2) { box.hidden = true; return; }
    const all = C.search(window.COURSE_SEARCH || [], query), list = $('#search-items');
    list.replaceChildren(); box.hidden = false;
    $('#search-count').textContent = all.length ? `Znaleziono: ${all.length}.` : 'Brak wyników. Spróbuj innego słowa, np. „gotówka” lub „klient”.';
    all.slice(0, 25).forEach(r => {
      const article = node('article', undefined, 'search-item'), link = node('a', r.title);
      link.href = r.url;
      if (r.url.startsWith('https://')) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
      article.append(node('span', r.type, 'eyebrow'), link);
      const term = C.norm(query).split(/\s+/)[0], index = C.norm(r.text).indexOf(term);
      const excerpt = r.text.slice(Math.max(0,index-60), Math.max(0,index-60)+200).replace(/[#*_|<>]/g,' ');
      article.append(node('p', excerpt + '…')); list.append(article);
    });
  }
  $('.search-form').addEventListener('submit', ev => { ev.preventDefault(); if ($('#site-search').value.trim().length < 2) { $('#search-results').hidden = false; $('#search-count').textContent = 'Wpisz co najmniej dwa znaki.'; $('#search-items').replaceChildren(); } else showSearch(); });
  $('#site-search').addEventListener('input', showSearch);
  $('#search-close').addEventListener('click', () => { $('#search-results').hidden = true; $('#site-search').focus(); });
  document.addEventListener('keydown', ev => { if (ev.key === 'Escape') $('#search-results').hidden = true; });

  if ($('#library-grid')) {
    function filterLibrary() {
      const query = C.norm($('#library-search').value), m = $('#library-module').value, kind = $('#library-kind').value;
      let count = 0;
      $$('[data-library-item]').forEach(el => {
        el.hidden = !(C.norm(el.textContent).includes(query) && (!m || el.dataset.modules.split(' ').includes(m)) && (!kind || el.dataset.kind === kind));
        if (!el.hidden) count++;
      });
      $('#library-count').textContent = count ? `Materiały: ${count}.` : 'Brak materiałów dla wybranych filtrów.';
    }
    ['#library-search','#library-module','#library-kind'].forEach(q => $(q).addEventListener('input', filterLibrary));
    filterLibrary();
  }

  $$('.quiz').forEach(form => {
    const n = Number(form.dataset.quiz), questions = data.find(m => m.n === n).quiz;
    function result(answers) {
      const grade = C.grade(questions, answers);
      questions.forEach((q,i) => {
        const feedback = form.querySelector(`[data-feedback="${i}"]`);
        feedback.hidden = false; feedback.classList.toggle('correct', grade.results[i]);
        feedback.textContent = `${grade.results[i] ? 'Dobrze.' : 'Wróć do tematu.'} ${q[3]} Prawidłowa odpowiedź: ${q[1][q[2]]}`;
      });
      form.querySelector('.quiz-result').textContent = `Wynik: ${grade.score}/${grade.total}. ${grade.score === grade.total ? 'Rozumiesz kluczowe pojęcia.' : 'Przeczytaj wyjaśnienia i spróbuj ponownie.'}`;
    }
    if (state.quizzes[n]) {
      state.quizzes[n].forEach((value,i) => { const input = form.querySelector(`[name="q${n}-${i}"][value="${value}"]`); if (input) input.checked = true; });
      result(state.quizzes[n]);
    }
    form.addEventListener('submit', ev => {
      ev.preventDefault();
      const answers = questions.map((_,i) => Number(form.querySelector(`[name="q${n}-${i}"]:checked`).value));
      update(s => s.quizzes[n] = answers); result(answers);
    });
    form.addEventListener('change', () => { form.querySelector('.quiz-result').textContent = 'Odpowiedzi zmienione — sprawdź ponownie.'; form.querySelectorAll('.quiz-feedback').forEach(x => x.hidden = true); });
  });

  function download(filename, content, type) {
    const url = URL.createObjectURL(new Blob([content], {type})), a = node('a');
    a.href = url; a.download = filename; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url),1000);
  }
  function projectText() {
    const lines = ['PRACOWNIA PRZEDSIĘBIORCZOŚCI — MÓJ PROJEKT', state.notes['project-name'] || '(bez nazwy)', state.notes['project-description'] || '', ''];
    data.forEach(m => {
      lines.push(`${m.n}. ${m.topic}`, state.completed.includes(m.n) ? 'Moduł ukończony (samoocena)' : 'Moduł nieoznaczony jako ukończony');
      m.fields.forEach((title,i) => lines.push(title, state.notes[`m${m.n}-${i}`] || '—', ''));
      if (state.quizzes[m.n]) lines.push(`Ostatni wynik quizu: ${C.grade(m.quiz,state.quizzes[m.n]).score}/3`, '');
    });
    if (Object.keys(state.cash).length) { lines.push('CASH FLOW — SALDA KOŃCOWE (PLN)'); C.calculate(state.cash).forEach((r,i) => lines.push(`Miesiąc ${i+1}: ${r.closing.toFixed(2)}`)); }
    return lines.join('\n');
  }
  if ($('#export-project')) {
    $('#export-project').addEventListener('click', () => download('moj-projekt.json', JSON.stringify(C.normalize(state),null,2), 'application/json'));
    $('#export-text').addEventListener('click', () => download('moj-projekt.txt', projectText(), 'text/plain;charset=utf-8'));
    $('#import-project').addEventListener('change', async ev => {
      const input = ev.target, file = input.files[0]; if (!file) return;
      try {
        if (file.size > 8000000) throw new Error('Plik jest zbyt duży (limit 8 MB).');
        const imported = C.normalize(JSON.parse(await file.text()));
        if (!confirm('Wczytanie kopii zastąpi obecny projekt, postępy i wyniki. Kontynuować?')) return;
        update(s => { for (const k of Object.keys(s)) delete s[k]; Object.assign(s, imported); });
        populateNotes(); progress(); role(state.role);
        $('#project-message').textContent = 'Kopia została wczytana.';
      } catch (err) { $('#project-message').textContent = 'Nie wczytano kopii. ' + (err instanceof SyntaxError ? 'Plik nie jest poprawnym JSON.' : err.message); }
      finally { input.value = ''; }
    });
    $('#reset-project').addEventListener('click', () => {
      if (!confirm('Usunąć wszystkie lokalne notatki, postępy i wyniki tego programu?')) return;
      try { localStorage.removeItem(key); } catch (_) { warning(); }
      state = C.blank(); populateNotes(); progress(); role(state.role);
      $('#project-message').textContent = 'Lokalny projekt został usunięty.';
    });
    $('#print-project').addEventListener('click', () => {
      const printed = node('section',undefined,'print-project-document');
      printed.append(node('h1','Mój projekt'),node('pre',projectText()));
      $('#main').append(printed); document.body.classList.add('printing-project'); window.print();
    });
    window.addEventListener('afterprint', () => { $$('.print-project-document').forEach(el => el.remove()); document.body.classList.remove('printing-project'); });
  }

  const currency = new Intl.NumberFormat('pl-PL',{style:'currency',currency:'PLN'});
  function renderCash() {
    if (!$('#cash-summary')) return;
    const rows = C.calculate(state.cash);
    $$('[data-cash]').forEach(el => {
      const i = Number(el.dataset.month), k = el.dataset.cash;
      el.value = k === 'opening' ? rows[i].opening : C.money(state.cash[k]?.[i]);
    });
    $$('[data-cash-output]').forEach(el => {
      const value = rows[Number(el.dataset.month)][el.dataset.cashOutput];
      el.textContent = currency.format(value); el.classList.toggle('negative',value < 0);
    });
    const min = Math.min(...rows.map(r => r.closing)), first = rows.findIndex(r => r.closing < 0);
    $('#cash-summary').textContent = first >= 0 ? `Uwaga: ujemne saldo od miesiąca ${first+1}. Najniższe saldo: ${currency.format(min)}. Sprawdź plan wydatków i finansowanie.` : `W tym wariancie nie ma ujemnego salda. Najniższe saldo: ${currency.format(min)}. Sprawdź też wariant ostrożny.`;
  }
  if ($('#cash-summary')) {
    renderCash();
    $$('[data-cash]').filter(el => !el.readOnly).forEach(el => el.addEventListener('input', () => {
      const k = el.dataset.cash, i = Number(el.dataset.month), value = C.money(el.value);
      update(s => { if (!s.cash[k]) s.cash[k] = [0,0,0,0,0,0]; s.cash[k][i] = value; });
      // Nie przepisuj aktywnego pola podczas wpisywania liczby ujemnej lub ułamka.
      const start = el.value; renderCash(); el.value = start;
    }));
    $('#cash-example').addEventListener('click', () => {
      if (Object.keys(state.cash).length && !confirm('Zastąpić dane kalkulatora fikcyjnym przykładem?')) return;
      update(s => s.cash = { opening:[10000,0,0,0,0,0],sales:[6000,9000,12000,15000,16000,17000],funding:[0,0,0,0,0,0],materials:[4000,5000,6000,6500,7000,7500],fixed:[4000,4000,4000,4000,4000,4000],tax:[1500,1500,1500,1500,1500,1500],investment:[5000,0,0,0,0,0],other:[0,0,0,0,0,0] });renderCash();
    });
    $('#cash-clear').addEventListener('click', () => { if (confirm('Wyczyścić wyłącznie dane kalkulatora?')) { update(s => s.cash = {});renderCash(); } });
    $('#cash-export').addEventListener('click', () => {
      const rows = C.calculate(state.cash), lines = [['Pozycja / PLN',...rows.map((_,i) => `Miesiąc ${i+1}`)]];
      const labels = {opening:'Saldo początkowe',sales:'Wpływy od klientów',funding:'Finansowanie',materials:'Materiały',fixed:'Koszty stałe',tax:'Podatki i składki',investment:'Inwestycje',other:'Pozostałe wydatki'};
      for (const k of C.cashKeys) lines.push([labels[k],...rows.map((r,i) => k === 'opening' ? r.opening : C.money(state.cash[k]?.[i]))]);
      for (const k of ['net','closing']) lines.push([k === 'net' ? 'Przepływ netto' : 'Saldo końcowe',...rows.map(r => r[k])]);
      const csv = lines.map(row => row.map(x => typeof x === 'number' ? x.toFixed(2).replace('.',',') : x).join(';')).join('\r\n');
      download('cash-flow.csv','\uFEFF'+csv,'text/csv;charset=utf-8');
    });
  }
})();
