import { formatNumber, lessonScore } from '../lib/scoring.js';

const levels = [
  ['yes', 'Umiem'],
  ['almost', 'Prawie'],
  ['no', 'Jeszcze nie'],
];

export function ResultCard({ activity, value = {}, onChange, lesson, answers }) {
  const result = lessonScore(lesson, answers);
  const self = value.self || {};
  const badges = [...(activity.badges || [])].sort((a, b) => b.min - a.min);
  const badge = badges.find(b => result.ratio >= b.min);
  const unanswered = result.rows.filter(r => {
    const v = answers[r.id];
    return !v || (!v.done && v.firstRatio === undefined);
  }).length;

  return (
    <div className="activity result-card" id="karta-wyniku">
      <header className="result-top">
        <div>
          <p className="eyebrow">Karta wyniku · {lesson.kind === 'module' ? `moduł ${lesson.n}` : `lekcja ${lesson.id}`}</p>
          <h3>{lesson.title}</h3>
        </div>
        <div className="result-score" aria-label={`Wynik ${formatNumber(result.score, 1)} na ${result.max} punktów`}>
          <strong>{formatNumber(result.score, 1)}</strong>
          <span>/ {result.max} pkt</span>
        </div>
      </header>
      <div className="meter" aria-hidden="true">
        <span style={{ width: `${Math.round(result.ratio * 100)}%` }} />
      </div>
      {badge && (
        <div className="result-badge">
          <strong>{badge.name}</strong>
          {badge.text && <p>{badge.text}</p>}
        </div>
      )}
      {unanswered > 0 && <p className="small">Nierozwiązane zadania: {unanswered}. Możesz do nich wrócić — wynik się zaktualizuje.</p>}
      <details className="result-rows">
        <summary>Skąd te punkty?</summary>
        <ul>
          {result.rows.map(row => (
            <li key={row.id}>
              <span>{row.label}</span>
              <b>
                {formatNumber(row.score, 1)}/{row.max}
              </b>
            </li>
          ))}
        </ul>
        <p className="small muted">Pytania: pełne punkty za trafienie za pierwszym razem, połowa po poprawce. Dokumenty, dopasowania i rozmowy: odsetek poprawnych elementów przy pierwszym sprawdzeniu.</p>
      </details>
      <fieldset className="self-check">
        <legend>Samoocena: co już potrafisz?</legend>
        {lesson.objectives.map((objective, i) => (
          <div key={i} className="self-row">
            <span>{objective}</span>
            <div role="group" aria-label={objective}>
              {levels.map(([key, label]) => (
                <button key={key} type="button" className={`self-${key} ${self[i] === key ? 'is-on' : ''}`} aria-pressed={self[i] === key} onClick={() => onChange({ ...value, self: { ...self, [i]: key } })}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </fieldset>
      <label className="result-name">
        Podpis na karcie (np. imię i pierwsza litera nazwiska; opcjonalnie)
        <input maxLength={40} autoComplete="off" value={value.name || ''} onChange={e => onChange({ ...value, name: e.target.value })} />
      </label>
      <footer className="result-foot">
        {lesson.kind !== 'module' && (
          <span>
            W szkole: proponowana ocena <b>{result.grade}</b>
          </span>
        )}
        <span>
          {value.name && <b>{value.name} · </b>}
          {new Date().toLocaleDateString('pl-PL')}
        </span>
      </footer>
      <div className="inline-actions no-print">
        <button className="btn" type="button" onClick={() => window.print()}>
          Drukuj kartę / zapisz PDF
        </button>
      </div>
      <p className="small muted">
        {lesson.kind === 'module'
          ? 'Wynik zostaje tylko w tej przeglądarce i służy Tobie. Odpowiedzi otwarte i pola projektu nie są oceniane.'
          : 'Wynik zostaje tylko w tej przeglądarce. Nie jest nigdzie wysyłany. Ocenę szkolną wystawia nauczyciel; zadania otwarte ocenia osobno.'}
      </p>
    </div>
  );
}
