import { StrictMode, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { lessons, parts } from '../content/lessons/index.js';
import { realia, realiaFor } from '../content/realia.js';
import { Activity } from '../components/activities.jsx';
import { Reading } from '../components/reading.jsx';
import { TeacherDrawer, TeacherPlan, groupingLabel } from '../components/teacher.jsx';
import { sectionDone } from '../lib/scoring.js';
import { clearAll, lessonState, loadState, saveState, withLesson, withoutLesson } from '../lib/store.js';
import './style.css';

function readRoute() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (parts[0] === 'lekcja' && parts[1]) return { page: 'lesson', id: parts[1], stage: Number(parts[2] || 1) - 1 };
  if (parts[0] === 'plan' && parts[1]) return { page: 'plan', id: parts[1] };
  if (parts[0] === 'o-lekcjach') return { page: 'about' };
  return { page: 'catalog' };
}

function useRoute() {
  const [route, setRoute] = useState(readRoute);
  useEffect(() => {
    const update = () => setRoute(readRoute());
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  return route;
}

function App() {
  const route = useRoute();
  const [state, setState] = useState(loadState);
  const [saveFailed, setSaveFailed] = useState(false);
  const mode = state.settings?.mode || 'learn';

  useEffect(() => {
    setSaveFailed(!saveState(state));
  }, [state]);

  function update(change) {
    setState(previous => change(previous));
  }

  function setMode(next) {
    update(s => ({ ...s, settings: { ...s.settings, mode: next } }));
  }

  const lesson = route.id ? lessons.find(l => l.id === route.id) : null;

  useEffect(() => {
    const title = lesson ? `${lesson.title} · Lekcje handlu` : 'Lekcje handlu i sprzedaży';
    document.title = route.page === 'plan' ? `Plan: ${title}` : title;
    window.scrollTo(0, 0);
  }, [route.page, route.id, lesson]);

  let content;
  if ((route.page === 'lesson' || route.page === 'plan') && !lesson) content = <NotFound />;
  else if (route.page === 'lesson') content = <LessonView lesson={lesson} stage={route.stage} state={state} update={update} mode={mode} />;
  else if (route.page === 'plan') content = <TeacherPlan lesson={lesson} />;
  else if (route.page === 'about') content = <About />;
  else content = <Catalog state={state} update={update} mode={mode} setMode={setMode} />;

  return (
    <>
      <a className="skip" href="#main">
        Przejdź do treści
      </a>
      <Header mode={mode} setMode={setMode} />
      {saveFailed && <p className="save-warning">Ta przeglądarka nie pozwala zapisać postępu. Lekcja działa, ale po zamknięciu strony odpowiedzi znikną.</p>}
      {content}
      <Footer />
    </>
  );
}

function Header({ mode, setMode }) {
  return (
    <header className="site-header no-print">
      <a className="brand" href="#/">
        <span className="brand-mark" aria-hidden="true">
          p.
        </span>
        <span>
          <b>Lekcje handlu</b>
          <small>Pracownia przedsiębiorczości</small>
        </span>
      </a>
      <nav aria-label="Główna">
        <a href="#/">Wszystkie lekcje</a>
        <a href="#/o-lekcjach">Jak korzystać</a>
        <a href="../index.html">Program dla przedsiębiorców ↗</a>
      </nav>
      <div className="mode-switch" role="group" aria-label="Tryb pracy">
        <button type="button" aria-pressed={mode === 'learn'} className={mode === 'learn' ? 'is-on' : ''} onClick={() => setMode('learn')}>
          Uczę się
        </button>
        <button type="button" aria-pressed={mode === 'teach'} className={mode === 'teach' ? 'is-on' : ''} onClick={() => setMode('teach')}>
          Prowadzę zajęcia
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer no-print">
      <p>
        Lekcje powstały w projekcie WIN4SMEs CoVE (Erasmus+), WP4.4.A1. Finansowane przez Unię Europejską. Wyrażone poglądy są poglądami autorów i nie muszą odzwierciedlać stanowiska UE ani EACEA.
      </p>
      <p>Firmy, osoby i kwoty w zadaniach są wymyślone na potrzeby nauki. Przepisy i kwoty z polskiego prawa mają datę sprawdzenia w zakładce „Jak korzystać”.</p>
    </footer>
  );
}

function NotFound() {
  return (
    <main id="main" className="page">
      <h1>Nie ma takiej lekcji.</h1>
      <p>
        <a href="#/">Wróć do listy lekcji</a>
      </p>
    </main>
  );
}

function progressOf(lesson, state) {
  const saved = lessonState(state, lesson.id);
  const done = lesson.sections.filter(s => saved.visited?.includes(s.id) && sectionDone(s, saved.answers)).length;
  return { done, total: lesson.sections.length };
}

function Catalog({ state, update, mode, setMode }) {
  const [part, setPart] = useState('');
  const [minutes, setMinutes] = useState('');
  const [query, setQuery] = useState('');
  const needle = query.trim().toLowerCase();
  const visible = lessons.filter(
    l =>
      (!part || l.part === part) &&
      (!minutes || String(l.duration) === minutes) &&
      (!needle || `${l.title} ${l.subtitle} ${l.tags.join(' ')} ${l.han.join(' ')}`.toLowerCase().includes(needle)),
  );
  const totalUnits = lessons.reduce((sum, l) => sum + l.duration / 45, 0);

  return (
    <main id="main" className="page">
      <section className="hero">
        <p className="eyebrow">Handel i sprzedaż · HAN.01 i HAN.02</p>
        <h1>{lessons.length} lekcji o sklepie, kliencie i liczbach w handlu.</h1>
        <p className="lead">
          Każda lekcja to 45 albo 90 minut pracy: krótkie wyjaśnienie, przykład rozwiązany krok po kroku, zadania z natychmiastową informacją zwrotną i karta wyniku. Razem {totalUnits} godzin lekcyjnych.
        </p>
        <div className="audience">
          <article className={mode === 'learn' ? 'is-on' : ''}>
            <h2>Uczysz się sam albo sama?</h2>
            <p>Lekcje są dla uczniów technikum i szkoły branżowej, ale też dla dorosłych, którzy chcą prowadzić sklep, pracować w handlu albo sprzedawać przez internet. Postęp zapisuje się w tej przeglądarce. Nie trzeba zakładać konta.</p>
            {mode !== 'learn' && (
              <button type="button" className="btn secondary" onClick={() => setMode('learn')}>
                Przełącz na „Uczę się”
              </button>
            )}
          </article>
          <article className={mode === 'teach' ? 'is-on' : ''}>
            <h2>Prowadzisz zajęcia?</h2>
            <p>W trybie „Prowadzę zajęcia” przy każdym etapie masz notatki: co powiedzieć, o co zapytać, typowe błędy i klucz odpowiedzi. Plan każdej lekcji drukuje się na A4.</p>
            {mode !== 'teach' && (
              <button type="button" className="btn secondary" onClick={() => setMode('teach')}>
                Przełącz na „Prowadzę zajęcia”
              </button>
            )}
          </article>
        </div>
      </section>
      <section className="filters" aria-label="Filtry">
        <label>
          Część
          <select value={part} onChange={e => setPart(e.target.value)}>
            <option value="">Obie części</option>
            {Object.entries(parts).map(([key, p]) => (
              <option key={key} value={key}>
                {p.title} ({p.qualification.split(' ')[0]})
              </option>
            ))}
          </select>
        </label>
        <label>
          Czas
          <select value={minutes} onChange={e => setMinutes(e.target.value)}>
            <option value="">45 i 90 min</option>
            <option value="45">45 min</option>
            <option value="90">90 min</option>
          </select>
        </label>
        <label className="grow">
          Szukaj
          <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="np. faktura, reklamacja, marża" />
        </label>
        <p role="status" className="small muted">
          Lekcje: {visible.length}
        </p>
      </section>
      {Object.entries(parts).map(([key, p]) => {
        const items = visible.filter(l => l.part === key);
        if (!items.length) return null;
        return (
          <section key={key} className="part">
            <header className="part-head">
              <p className="eyebrow">{p.qualification}</p>
              <h2>
                Część {key === 'A' ? 'pierwsza' : 'druga'}: {p.title}
              </h2>
              <p className="muted">{p.subtitle}</p>
            </header>
            <div className="cards">
              {items.map(l => (
                <LessonCard key={l.id} lesson={l} progress={progressOf(l, state)} mode={mode} />
              ))}
            </div>
          </section>
        );
      })}
      {Object.keys(state.lessons).length > 0 && (
        <section className="fresh">
          <h2>Ktoś inny będzie korzystał z tego komputera?</h2>
          <p>Usuń zapisane odpowiedzi ze wszystkich lekcji w tej przeglądarce.</p>
          <button type="button" className="btn secondary" onClick={() => window.confirm('Usunąć odpowiedzi ze wszystkich lekcji?') && update(s => ({ ...clearAll(), settings: s.settings }))}>
            Wyczyść wszystkie odpowiedzi
          </button>
        </section>
      )}
    </main>
  );
}

function LessonCard({ lesson, progress, mode }) {
  const status = progress.done === progress.total ? 'Ukończona' : progress.done > 0 ? `Kontynuuj · ${progress.done}/${progress.total} etapów` : 'Otwórz lekcję';
  return (
    <article className="card">
      <div className="card-meta">
        <span>Lekcja {lesson.id}</span>
        <span>{lesson.duration} min</span>
      </div>
      <h3>
        <a href={`#/lekcja/${lesson.id}`}>{lesson.title}</a>
      </h3>
      <p>{lesson.subtitle}</p>
      <ul className="tags" aria-label="Tematy">
        {lesson.tags.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className="card-foot">
        <span className={progress.done === progress.total ? 'done' : ''}>{status}</span>
        {mode === 'teach' && (
          <a className="small" href={`#/plan/${lesson.id}`}>
            Plan lekcji
          </a>
        )}
      </div>
    </article>
  );
}

function LessonView({ lesson, stage: routeStage, state, update, mode }) {
  const stage = Math.min(Math.max(routeStage, 0), lesson.sections.length - 1);
  const section = lesson.sections[stage];
  const saved = lessonState(state, lesson.id);
  const [drawer, setDrawer] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (!saved.visited?.includes(section.id)) {
      update(s => withLesson(s, lesson.id, current => ({ ...current, visited: [...new Set([...(current.visited || []), section.id])] })));
    }
    // zapis odwiedzin tylko przy zmianie etapu
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id, section.id]);

  function setAnswer(id, value) {
    update(s => withLesson(s, lesson.id, current => ({ ...current, answers: { ...current.answers, [id]: value } })));
  }

  function goTo(index) {
    location.hash = `#/lekcja/${lesson.id}/${index + 1}`;
  }

  function reset() {
    if (!window.confirm('Usunąć Twoje odpowiedzi w tej lekcji?')) return;
    update(s => withoutLesson(s, lesson.id));
    setResetKey(k => k + 1);
  }

  const startMinute = lesson.sections.slice(0, stage).reduce((sum, s) => sum + s.duration, 0);
  const realiaList = useMemo(() => realiaFor(lesson.realia), [lesson]);

  return (
    <main id="main" className="lesson">
      <header className="lesson-head">
        <p className="eyebrow">
          <a href="#/">Lekcje</a> · Lekcja {lesson.id} · {lesson.duration} min{lesson.sessions.length > 1 ? ' (2 × 45)' : ''} · {lesson.han.join(', ')}
        </p>
        <h1>{lesson.title}</h1>
        <p className="lead">{lesson.subtitle}</p>
        {stage === 0 && (
          <div className="goals">
            <h2>Po tej lekcji:</h2>
            <ul>
              {lesson.objectives.map(o => (
                <li key={o}>{o}</li>
              ))}
            </ul>
            <p className="small muted">{lesson.format.student}</p>
          </div>
        )}
      </header>
      <nav className="stages" aria-label="Etapy lekcji">
        <ol>
          {lesson.sections.map((s, i) => {
            const done = saved.visited?.includes(s.id) && sectionDone(s, saved.answers);
            return (
              <li key={s.id}>
                <a href={`#/lekcja/${lesson.id}/${i + 1}`} aria-current={i === stage ? 'step' : undefined} className={`${i === stage ? 'is-current' : ''} ${done ? 'is-done' : ''}`}>
                  <span className="stage-number">{done ? '✓' : i + 1}</span>
                  <span className="stage-label">{s.label}</span>
                  <span className="stage-time">{s.duration} min</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
      <article className="stage" key={`${section.id}-${resetKey}`}>
        <p className="eyebrow">
          Etap {stage + 1} z {lesson.sections.length} · {section.duration} min (od {startMinute}. minuty){section.grouping ? ` · ${groupingLabel(section.grouping)}` : ''}
        </p>
        <h2>{section.title}</h2>
        <p className="stage-intro">{section.intro}</p>
        {mode === 'teach' && (
          <button type="button" className="btn teacher-btn no-print" onClick={() => setDrawer(true)}>
            Notatki prowadzącego do tego etapu
          </button>
        )}
        <Reading reading={section.reading} />
        {section.activities.map(activity => (
          <Activity
            key={`${activity.id}-${resetKey}`}
            activity={activity}
            value={saved.answers?.[activity.id]}
            onChange={value => setAnswer(activity.id, value)}
            lesson={lesson}
            answers={saved.answers || {}}
          />
        ))}
        {section.breakAfter && (
          <aside className="break">
            <h3>Koniec pierwszej części.</h3>
            <p>Na lekcji szkolnej tu jest przerwa. Twoje odpowiedzi są zapisane w tej przeglądarce — po przerwie wróć do etapu {stage + 2}.</p>
          </aside>
        )}
        <div className="stage-nav no-print">
          {stage > 0 ? (
            <button type="button" className="btn secondary" onClick={() => goTo(stage - 1)}>
              ← {lesson.sections[stage - 1].label}
            </button>
          ) : (
            <span />
          )}
          {stage < lesson.sections.length - 1 && (
            <button type="button" className="btn" onClick={() => goTo(stage + 1)}>
              {lesson.sections[stage + 1].label} →
            </button>
          )}
        </div>
      </article>
      <footer className="lesson-foot no-print">
        {stage === lesson.sections.length - 1 && <p className="exit-ticket"><b>Na koniec:</b> {lesson.exitTicket}</p>}
        {realiaList.length > 0 && (
          <details>
            <summary>Przepisy i kwoty w tej lekcji (stan na {new Date(realiaList[0].checked).toLocaleDateString('pl-PL')})</summary>
            <ul className="realia">
              {realiaList.map(r => (
                <li key={r.key}>
                  <b>{r.label}:</b> {r.value}. <span className="muted">Źródło: {r.source}.</span>
                </li>
              ))}
            </ul>
          </details>
        )}
        <div className="inline-actions">
          {mode === 'teach' && <a href={`#/plan/${lesson.id}`}>Plan lekcji do druku</a>}
          <button type="button" className="text-button" onClick={reset}>
            Wyczyść moje odpowiedzi w tej lekcji
          </button>
        </div>
      </footer>
      {mode === 'teach' && <TeacherDrawer open={drawer} onClose={() => setDrawer(false)} lesson={lesson} stage={stage} onStage={i => goTo(i)} />}
    </main>
  );
}

function About() {
  const entries = Object.entries(realia);
  return (
    <main id="main" className="page prose">
      <p className="eyebrow">Jak korzystać</p>
      <h1>Jedna lekcja, dwa sposoby pracy.</h1>
      <h2>Samodzielnie</h2>
      <p>
        Otwórz lekcję i idź etapami. W każdym etapie jest krótkie wyjaśnienie, czasem przykład rozwiązany krok po kroku, i zadania. Po każdej odpowiedzi od razu widzisz, czy jest dobra, a jeśli nie — dlaczego. Za trafienie za pierwszym razem dostajesz pełne punkty, po poprawce połowę. Na końcu jest karta wyniku z samooceną, którą możesz wydrukować albo zapisać jako PDF.
      </p>
      <p>Odpowiedzi zapisują się w tej przeglądarce. Jeśli korzystasz ze wspólnego komputera, na końcu użyj przycisku „Wyczyść moje odpowiedzi”. Nic nie jest wysyłane na serwer.</p>
      <h2>Na zajęciach</h2>
      <p>
        Włącz tryb „Prowadzę zajęcia”. Przy każdym etapie pojawi się przycisk z notatkami: co zrobić, o co zapytać, czego się spodziewać, typowy błąd i klucz odpowiedzi. Plan całej lekcji, z kluczem, drukuje się na A4. Lekcje 90-minutowe mają zaznaczoną przerwę po 45 minutach.
      </p>
      <p>
        Lekcje odpowiadają wybranym efektom kwalifikacji HAN.01 (Prowadzenie sprzedaży) i HAN.02 (Prowadzenie działań handlowych). Nie obejmują języka obcego zawodowego. Pełne pokrycie podstawy programowej ustala szkoła w swoim programie nauczania.
      </p>
      <h2>Z dorosłymi</h2>
      <p>Każda lekcja ma wskazówkę, jak ją poprowadzić z dorosłymi: na przykład osobami, które otwierają sklep, przekwalifikowują się albo sprzedają przez internet. Zadania i liczby są te same, zmienia się tempo i przykłady z ich doświadczenia.</p>
      <h2>Przepisy i kwoty</h2>
      <p>W zadaniach używamy polskich przepisów w stanie na dzień sprawdzenia. Przed decyzją we własnej firmie sprawdź aktualny stan w źródle.</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Temat</th>
              <th scope="col">Co przyjmujemy w lekcjach</th>
              <th scope="col">Źródło i data</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([key, r]) => (
              <tr key={key}>
                <td>{r.label}</td>
                <td>{r.value}</td>
                <td>
                  <a href={r.url} target="_blank" rel="noopener noreferrer">
                    {r.source}
                  </a>
                  <br />
                  <span className="small muted">
                    {new Date(r.checked).toLocaleDateString('pl-PL')} · {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
