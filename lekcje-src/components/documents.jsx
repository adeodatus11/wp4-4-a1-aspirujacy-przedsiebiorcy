import { useState } from 'react';
import { checkDocFields, checkSpotErrors } from '../lib/scoring.js';
import { Feedback } from './activities.jsx';

// Dokument handlowy z polami do uzupełnienia: faktura, PZ, WZ, kartoteka, arkusz spisowy, raport kasowy.
// Komórka tabeli to tekst albo {f: 'klucz'} — pole do wpisania.
export function DocForm({ activity, value = {}, onChange }) {
  const { doc, fields } = activity;
  const [values, setValues] = useState(value.values || {});
  const checked = value.checked || {};
  const allFilled = Object.keys(fields).every(key => String(values[key] ?? '').trim() !== '');

  function check() {
    const result = checkDocFields(fields, values);
    const ratio = Object.values(result).filter(Boolean).length / Object.keys(fields).length;
    onChange({ values, checked: result, done: ratio === 1, firstRatio: value.firstRatio ?? ratio, tries: (value.tries || 0) + 1 });
  }

  function reveal() {
    const solved = Object.fromEntries(Object.entries(fields).map(([k, f]) => [k, String(f.answer).replace('.', ',')]));
    setValues(solved);
    onChange({ values: solved, checked: Object.fromEntries(Object.keys(fields).map(k => [k, true])), done: true, firstRatio: value.firstRatio ?? 0, revealed: true });
  }

  function cell(content, label) {
    if (content && typeof content === 'object' && content.f) {
      const key = content.f;
      const field = fields[key];
      const state = checked[key] === true ? 'is-correct' : checked[key] === false ? 'is-wrong' : '';
      if (field.kind === 'select') {
        return (
          <select
            className={`doc-input ${state}`}
            aria-label={field.label || label}
            value={values[key] ?? ''}
            disabled={value.done}
            onChange={e => setValues({ ...values, [key]: e.target.value })}
          >
            <option value="">wybierz</option>
            {field.options.map(o => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        );
      }
      return (
        <input
          className={`doc-input ${state}`}
          aria-label={field.label || label}
          inputMode={field.kind === 'text' ? 'text' : 'decimal'}
          autoComplete="off"
          value={values[key] ?? ''}
          disabled={value.done}
          onChange={e => setValues({ ...values, [key]: e.target.value })}
        />
      );
    }
    return content;
  }

  const wrongHints = Object.entries(checked)
    .filter(([, ok]) => !ok)
    .map(([key]) => fields[key].hint)
    .filter(Boolean);

  return (
    <div className="activity">
      <header className="activity-head">
        <span className="activity-kind">Dokument</span>
        <h3 className="activity-question">{activity.title}</h3>
        {activity.context && <p className="activity-context">{activity.context}</p>}
      </header>
      <div className="document" role="group" aria-label={doc.title}>
        <div className="document-top">
          <strong className="document-title">{doc.title}</strong>
          {doc.meta && (
            <dl className="document-meta">
              {doc.meta.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{cell(v, k)}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        {doc.parties && (
          <div className="document-parties">
            {doc.parties.map(([k, v]) => (
              <div key={k}>
                <span className="small muted">{k}</span>
                <p>{v}</p>
              </div>
            ))}
          </div>
        )}
        {doc.table && (
          <div className="table-wrap">
            <table className="doc-table">
              <thead>
                <tr>
                  {doc.table.head.map((h, i) => (
                    <th key={i} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {doc.table.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((c, i) => (
                      <td key={i}>{cell(c, `${doc.table.head[i]}, wiersz ${r + 1}`)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {doc.after && (
          <dl className="document-totals">
            {doc.after.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{cell(v, k)}</dd>
              </div>
            ))}
          </dl>
        )}
        {doc.footer && <p className="small muted document-footer">{doc.footer}</p>}
      </div>
      {!value.done && (
        <div className="inline-actions">
          <button className="btn" type="button" onClick={check} disabled={!allFilled}>
            Sprawdź dokument
          </button>
          {(value.tries || 0) >= 2 && (
            <button className="text-button" type="button" onClick={reveal}>
              Pokaż wypełniony dokument (bez punktów)
            </button>
          )}
        </div>
      )}
      {!value.done && wrongHints.length > 0 && (
        <Feedback tone="wrong" title="Popraw pola zaznaczone na czerwono.">
          <ul>
            {[...new Set(wrongHints)].map(h => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </Feedback>
      )}
      {value.done && (
        <Feedback tone={value.revealed ? 'info' : 'ok'} title={value.revealed ? 'Tak wygląda poprawnie wypełniony dokument.' : 'Dokument się zgadza.'}>
          {activity.explanation}
        </Feedback>
      )}
    </div>
  );
}

// Znajdź błędy: osoba zaznacza wiersze, w których coś jest nie tak.
export function SpotErrors({ activity, value = {}, onChange }) {
  const [marked, setMarked] = useState(value.marked || []);
  const result = value.result;
  const errorCount = activity.lines.filter(l => l.error).length;

  function toggle(i) {
    if (value.done) return;
    setMarked(current => (current.includes(i) ? current.filter(x => x !== i) : [...current, i]));
  }

  function check() {
    const r = checkSpotErrors(activity, marked);
    onChange({ marked, result: r, done: true, firstRatio: value.firstRatio ?? r.ratio });
  }

  return (
    <div className="activity">
      <header className="activity-head">
        <span className="activity-kind">Znajdź błędy ({errorCount})</span>
        <h3 className="activity-question">{activity.title}</h3>
        {activity.context && <p className="activity-context">{activity.context}</p>}
      </header>
      <ul className={`spot-lines ${activity.monospace ? 'mono' : ''}`}>
        {activity.lines.map((line, i) => {
          const isMarked = marked.includes(i);
          let state = '';
          if (value.done) state = line.error ? (isMarked ? 'is-found' : 'is-missed') : isMarked ? 'is-false' : '';
          return (
            <li key={i} className={state}>
              <button type="button" aria-pressed={isMarked} className={isMarked ? 'is-on' : ''} onClick={() => toggle(i)} disabled={value.done}>
                <span className="spot-flag" aria-hidden="true">{isMarked ? '!' : ''}</span>
                <span>{line.text}</span>
              </button>
              {value.done && line.error && <p className="row-note">{isMarked ? 'Znalezione: ' : 'Przeoczone: '}{line.error}</p>}
              {value.done && !line.error && isMarked && <p className="row-note">To jest poprawne. {line.ok || ''}</p>}
            </li>
          );
        })}
      </ul>
      {!value.done && (
        <button className="btn" type="button" onClick={check} disabled={!marked.length}>
          Sprawdź ({marked.length} zaznaczone)
        </button>
      )}
      {value.done && result && (
        <Feedback tone={result.ratio === 1 ? 'ok' : 'info'} title={`Znalezione: ${result.found} z ${result.total}${result.falseAlarms ? `, fałszywe alarmy: ${result.falseAlarms}` : ''}.`}>
          {activity.explanation}
        </Feedback>
      )}
      {value.done && (
        <button
          className="text-button"
          type="button"
          onClick={() => {
            setMarked([]);
            onChange({ firstRatio: value.firstRatio, done: false, marked: [] });
          }}
        >
          Spróbuj jeszcze raz (punkty z pierwszej próby zostają)
        </button>
      )}
    </div>
  );
}
