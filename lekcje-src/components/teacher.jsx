import { useEffect, useRef } from 'react';
import { Reading } from './reading.jsx';
import { activityPoints, formatNumber, isScored, lessonActivities } from '../lib/scoring.js';
import { realiaFor } from '../content/realia.js';

const groupingNames = { solo: 'samodzielnie', pair: 'w parach', trio: 'w trójkach', group: 'w grupach', class: 'cała grupa' };

export function groupingLabel(grouping) {
  return groupingNames[grouping] || '';
}

// Opis organizacji pracy z etapów lekcji, np. „samodzielnie: etapy 1, 4; w parach: etapy 2–3”.
export function organisation(lesson) {
  const byKind = new Map();
  lesson.sections.forEach((s, i) => {
    if (!s.grouping) return;
    byKind.set(s.grouping, [...(byKind.get(s.grouping) || []), i + 1]);
  });
  const ranges = numbers =>
    numbers
      .reduce((acc, n) => {
        const last = acc.at(-1);
        if (last && last[1] === n - 1) last[1] = n;
        else acc.push([n, n]);
        return acc;
      }, [])
      .map(([a, b]) => (a === b ? `${a}` : `${a}–${b}`))
      .join(', ');
  return [...byKind].map(([kind, numbers]) => `${groupingLabel(kind)}: ${numbers.length > 1 ? 'etapy' : 'etap'} ${ranges(numbers)}`).join('; ');
}

export function TeacherDrawer({ open, onClose, lesson, stage, onStage }) {
  const ref = useRef(null);
  const section = lesson.sections[stage];
  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog ref={ref} className="drawer" aria-labelledby="drawer-title" onClose={onClose} onCancel={onClose} onClick={e => e.target === ref.current && onClose()}>
      <div className="drawer-inner">
        <div className="drawer-top">
          <span className="eyebrow">Dla prowadzącego · etap {stage + 1} z {lesson.sections.length}</span>
          <button type="button" className="icon-btn" aria-label="Zamknij notatki" onClick={onClose}>
            ✕
          </button>
        </div>
        <h2 id="drawer-title">{section.title}</h2>
        <p className="muted">
          {section.duration} min {section.grouping ? `· ${groupingLabel(section.grouping)}` : ''}
        </p>
        <SectionNotes section={section} />
        <h3>Odpowiedzi w tym etapie</h3>
        <AnswerKey activities={section.activities} />
        <div className="inline-actions">
          <button type="button" className="btn secondary" disabled={stage === 0} onClick={() => onStage(stage - 1)}>
            ← Poprzedni etap
          </button>
          <button type="button" className="btn secondary" disabled={stage === lesson.sections.length - 1} onClick={() => onStage(stage + 1)}>
            Następny etap →
          </button>
        </div>
        <a className="text-button" href={`#/plan/${lesson.id}`}>
          Cały plan lekcji do druku →
        </a>
      </div>
    </dialog>
  );
}

function SectionNotes({ section }) {
  return (
    <dl className="notes">
      <dt>Co robisz</dt>
      <dd>{section.teacherNotes}</dd>
      <dt>Zapytaj grupę</dt>
      <dd>„{section.askStudents}”</dd>
      <dt>Oczekiwane odpowiedzi</dt>
      <dd>{section.expectedAnswers}</dd>
      <dt>Typowy błąd</dt>
      <dd>{section.commonMistakes}</dd>
      <dt>Dla szybszych</dt>
      <dd>{section.optionalExtension}</dd>
      {section.skipIfShortOnTime && (
        <>
          <dt>Gdy brakuje czasu</dt>
          <dd>Ten etap można skrócić; zachowaj zadanie z punktami.</dd>
        </>
      )}
    </dl>
  );
}

export function answerText(activity) {
  switch (activity.type) {
    case 'choice':
      return activity.options[activity.correct];
    case 'multi':
      return activity.correct.map(i => activity.options[i]).join('; ');
    case 'number':
      return `${formatNumber(activity.answer)}${activity.unit ? ' ' + activity.unit : ''}`;
    case 'matching':
      return activity.rows.map(r => `${r.label} → ${activity.options[r.correct]}`).join('; ');
    case 'sequence':
      return activity.items.map((item, i) => `${i + 1}. ${item}`).join(' ');
    case 'docForm':
      return Object.entries(activity.fields)
        .map(([, f]) => `${f.label}: ${typeof f.answer === 'number' ? formatNumber(f.answer) : f.answer}`)
        .join('; ');
    case 'spotErrors':
      return activity.lines
        .filter(l => l.error)
        .map(l => `„${l.text}” — ${l.error}`)
        .join(' ');
    case 'dialog':
      return 'Dobre ścieżki rozmowy opisane w komentarzach do odpowiedzi.';
    case 'text':
      return activity.model;
    default:
      return null;
  }
}

function AnswerKey({ activities }) {
  const items = activities.filter(a => isScored(a) || a.type === 'text');
  if (!items.length) return <p className="small muted">Brak zadań z kluczem.</p>;
  return (
    <ol className="answer-key">
      {items.map(a => (
        <li key={a.id}>
          <b>{a.question || a.title}</b>
          {isScored(a) && <span className="small muted"> ({activityPoints(a)} pkt)</span>}
          <p>{answerText(a)}</p>
        </li>
      ))}
    </ol>
  );
}

export function TeacherPlan({ lesson }) {
  let minute = 0;
  const realia = realiaFor(lesson.realia);
  const scored = lessonActivities(lesson).filter(isScored);
  return (
    <main id="main" className="plan">
      <div className="plan-actions no-print">
        <a className="text-button" href={`#/lekcja/${lesson.id}`}>
          ← Wróć do lekcji
        </a>
        <button className="btn" type="button" onClick={() => window.print()}>
          Drukuj plan
        </button>
      </div>
      <p className="eyebrow">
        Plan dla prowadzącego · lekcja {lesson.id} · {lesson.han.join(', ')}
      </p>
      <h1>{lesson.title}</h1>
      <p className="lead">{lesson.subtitle}</p>
      <p>
        <b>Czas:</b> {lesson.duration} min{lesson.sessions.length > 1 ? ` (${lesson.sessions.join(' + ')}, przerwa po pierwszej części)` : ''}.{' '}
        <b>Punkty na platformie:</b> {scored.reduce((s, a) => s + activityPoints(a), 0)}.
      </p>
      <section className="plan-grid">
        <div>
          <h2>Cele</h2>
          <ul>
            {lesson.objectives.map(o => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Materiały</h2>
          <p className="small muted">Urządzenie z przeglądarką: jedno na osobę albo na parę.</p>
          <ul>
            {lesson.materials.map(m => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </section>
      <h2>Jak prowadzić</h2>
      <p>{lesson.format.teacher}</p>
      <p>
        <b>Organizacja:</b> {organisation(lesson)}.{lesson.format.grouping ? ` ${lesson.format.grouping}` : ''}
      </p>
      <p>
        <b>Metody:</b>{' '}
        {lesson.format.methods.map((m, i) => (
          <span key={m.url}>
            {i > 0 && ', '}
            <a href={m.url} target="_blank" rel="noopener noreferrer">
              {m.name}
            </a>
          </span>
        ))}
      </p>
      <p>
        <b>Z dorosłymi:</b> {lesson.audience.adults}
      </p>
      <h2>Przed zajęciami</h2>
      <p>{lesson.teacherGuide.preparation}</p>
      <h2>Przebieg</h2>
      <ol className="timeline">
        {lesson.sections.map(section => {
          const start = minute;
          minute += section.duration;
          return (
            <li key={section.id}>
              <span className="timeline-time">
                {start}–{minute} min
              </span>
              <div>
                <h3>
                  {section.label}: {section.title}
                  {section.grouping ? ` · ${groupingLabel(section.grouping)}` : ''}
                </h3>
                <Reading reading={section.reading} expanded />
                <SectionNotes section={section} />
                {section.breakAfter && <p className="break-note">Przerwa. Uczestnicy mają pracę zapisaną na urządzeniu.</p>}
              </div>
            </li>
          );
        })}
      </ol>
      <h2>Klucz odpowiedzi</h2>
      <AnswerKey activities={lessonActivities(lesson)} />
      <h2>Podsumowanie</h2>
      <p>{lesson.teacherGuide.summary}</p>
      <p>
        <b>Bilet wyjścia:</b> {lesson.exitTicket}
      </p>
      {realia.length > 0 && (
        <>
          <h2>Przepisy i kwoty użyte w lekcji</h2>
          <ul className="realia">
            {realia.map(r => (
              <li key={r.key}>
                <b>{r.label}:</b> {r.value}. Źródło: {r.source}. Sprawdzono {new Date(r.checked).toLocaleDateString('pl-PL')} ({r.status}).
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
