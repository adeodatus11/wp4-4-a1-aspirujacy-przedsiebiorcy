import { useEffect, useMemo, useState } from 'react';
import { realiaFor } from '../content/realia.js';
import { sectionDone } from '../lib/scoring.js';
import { lessonState, withLesson, withoutLesson } from '../lib/store.js';
import { Activity } from './activities.jsx';
import { Reading } from './reading.jsx';

// Ścieżka pracy własnej do modułu programu: etapy, wyjaśnienia, ćwiczenia, pola projektu.
// Bez trybu prowadzącego — warsztat opisuje scenariusz na stronie modułu.
export function ModuleView({ unit, stage: routeStage, state, update }) {
  const key = `modul-${unit.n}`;
  const stage = Math.min(Math.max(routeStage, 0), unit.sections.length - 1);
  const section = unit.sections[stage];
  const saved = lessonState(state, key);
  const [resetKey, setResetKey] = useState(0);
  const realiaList = useMemo(() => realiaFor(unit.realia), [unit]);
  const last = stage === unit.sections.length - 1;

  useEffect(() => {
    if (!saved.visited?.includes(section.id)) {
      update(s => withLesson(s, key, current => ({ ...current, visited: [...new Set([...(current.visited || []), section.id])] })));
    }
    // zapis odwiedzin tylko przy zmianie etapu
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, section.id]);

  function setAnswer(id, value) {
    update(s => withLesson(s, key, current => ({ ...current, answers: { ...current.answers, [id]: value } })));
  }

  function goTo(index) {
    location.hash = `#/modul/${unit.n}/${index + 1}`;
  }

  function reset() {
    if (!window.confirm('Usunąć Twoje odpowiedzi z tej ścieżki? Pola „Mojego projektu” zostaną.')) return;
    update(s => withoutLesson(s, key));
    setResetKey(k => k + 1);
  }

  const startMinute = unit.sections.slice(0, stage).reduce((sum, s) => sum + s.duration, 0);

  return (
    <main id="main" className="lesson module">
      <header className="lesson-head">
        <p className="eyebrow">
          <a href={`../modul-${unit.n}.html`}>Moduł {unit.n}</a> · {unit.topic} · ok. {unit.duration} min pracy własnej
        </p>
        <h1>{unit.title}</h1>
        <p className="lead">{unit.subtitle}</p>
        {stage === 0 && (
          <div className="goals">
            <h2>Po tym module:</h2>
            <ul>
              {unit.objectives.map(o => (
                <li key={o}>{o}</li>
              ))}
            </ul>
            <p className="small muted">Pracujesz we własnym tempie. Odpowiedzi zapisują się w tej przeglądarce, a pola oznaczone „Mój projekt” trafiają do Twojego projektu w serwisie.</p>
          </div>
        )}
      </header>
      <nav className="stages" aria-label="Etapy modułu">
        <ol>
          {unit.sections.map((s, i) => {
            const done = saved.visited?.includes(s.id) && sectionDone(s, saved.answers);
            return (
              <li key={s.id}>
                <a href={`#/modul/${unit.n}/${i + 1}`} aria-current={i === stage ? 'step' : undefined} className={`${i === stage ? 'is-current' : ''} ${done ? 'is-done' : ''}`}>
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
          Etap {stage + 1} z {unit.sections.length} · ok. {section.duration} min (od {startMinute}. minuty)
        </p>
        <h2>{section.title}</h2>
        <p className="stage-intro">{section.intro}</p>
        <Reading reading={section.reading} />
        {section.activities.map(activity => (
          <Activity key={`${activity.id}-${resetKey}`} activity={activity} value={saved.answers?.[activity.id]} onChange={value => setAnswer(activity.id, value)} lesson={unit} answers={saved.answers || {}} />
        ))}
        {last && (
          <aside className="break">
            <h3>Co dalej</h3>
            <p>{unit.forGroup}</p>
            <p>{unit.solo}</p>
            <p>
              <a href={`../modul-${unit.n}.html#projekt`}>Wróć do strony modułu</a> · <a href="../moj-projekt.html">Mój projekt: wydruk i eksport</a>
            </p>
          </aside>
        )}
        <div className="stage-nav no-print">
          {stage > 0 ? (
            <button type="button" className="btn secondary" onClick={() => goTo(stage - 1)}>
              ← {unit.sections[stage - 1].label}
            </button>
          ) : (
            <span />
          )}
          {!last && (
            <button type="button" className="btn" onClick={() => goTo(stage + 1)}>
              {unit.sections[stage + 1].label} →
            </button>
          )}
        </div>
      </article>
      <footer className="lesson-foot no-print">
        {realiaList.length > 0 && (
          <details>
            <summary>Fakty i dane w tym module (stan na {new Date(realiaList[0].checked).toLocaleDateString('pl-PL')})</summary>
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
          <button type="button" className="text-button" onClick={reset}>
            Wyczyść moje odpowiedzi w tym module
          </button>
        </div>
      </footer>
    </main>
  );
}
