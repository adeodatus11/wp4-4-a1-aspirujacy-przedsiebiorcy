import { useMemo, useState } from 'react';
import { checkMulti, checkNumber, checkSequence, formatNumber } from '../lib/scoring.js';
import { scrambledOrder, shuffledOrder } from '../lib/shuffle.js';
import { DocForm, SpotErrors } from './documents.jsx';
import { readNote, writeNote } from '../lib/project.js';
import { Dialog } from './dialog.jsx';
import { ResultCard } from './result.jsx';

const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

export function Feedback({ tone, title, children }) {
  if (!children && !title) return null;
  return (
    <div className={`feedback feedback-${tone}`} role="status">
      {title && <strong>{title}</strong>}
      {children && <div>{children}</div>}
    </div>
  );
}

function Prompt({ activity, kind }) {
  return (
    <header className="activity-head">
      <span className="activity-kind">{kind}</span>
      {activity.question && <h3 className="activity-question">{activity.question}</h3>}
      {activity.title && !activity.question && <h3 className="activity-question">{activity.title}</h3>}
      {activity.context && <p className="activity-context">{activity.context}</p>}
    </header>
  );
}

function nextValue(value, ok) {
  const tries = (value.tries || 0) + 1;
  return { tries, done: ok || !!value.done, first: tries === 1 ? ok : !!value.first };
}

function Choice({ activity, value = {}, onChange }) {
  const order = useMemo(() => activity.order || shuffledOrder(activity.options.length, activity.id), [activity]);
  const [picked, setPicked] = useState(value.selected ?? null);
  const locked = value.done;
  const wrong = !value.done && value.lastWrong !== undefined && value.lastWrong !== null;

  function check() {
    if (picked === null) return;
    const ok = picked === activity.correct;
    onChange({ ...nextValue(value, ok), selected: picked, lastWrong: ok ? null : picked });
  }

  return (
    <div className="activity">
      <Prompt activity={activity} kind="Pytanie" />
      <fieldset className="options" disabled={locked}>
        <legend className="sr-only">{activity.question}</legend>
        {order.map((original, shown) => {
          const state = locked && original === activity.correct ? 'is-correct' : wrong && original === value.lastWrong ? 'is-wrong' : '';
          return (
            <label key={original} className={`option ${state} ${picked === original ? 'is-picked' : ''}`}>
              <input type="radio" name={activity.id} checked={picked === original} onChange={() => setPicked(original)} />
              <span className="option-letter" aria-hidden="true">{letters[shown]}</span>
              <span>{activity.options[original]}</span>
            </label>
          );
        })}
      </fieldset>
      {!locked && (
        <button className="btn" type="button" onClick={check} disabled={picked === null}>
          Sprawdź
        </button>
      )}
      {wrong && (
        <Feedback tone="wrong" title="Jeszcze nie.">
          {activity.why?.[value.lastWrong] || activity.hint || 'Wróć do danych z zadania i spróbuj ponownie.'}
        </Feedback>
      )}
      {locked && (
        <Feedback tone="ok" title={value.first ? 'Dobrze, za pierwszym razem.' : 'Dobrze.'}>
          {activity.explanation}
        </Feedback>
      )}
    </div>
  );
}

function Multi({ activity, value = {}, onChange }) {
  const order = useMemo(() => shuffledOrder(activity.options.length, activity.id), [activity]);
  const [picked, setPicked] = useState(value.selected || []);
  const locked = value.done;

  function toggle(i) {
    setPicked(current => (current.includes(i) ? current.filter(x => x !== i) : [...current, i]));
  }

  function check() {
    const ok = checkMulti(activity, picked);
    onChange({ ...nextValue(value, ok), selected: picked, lastWrong: !ok });
  }

  const missing = activity.correct.filter(i => !picked.includes(i)).length;
  const extra = picked.filter(i => !activity.correct.includes(i)).length;

  return (
    <div className="activity">
      <Prompt activity={activity} kind="Zaznacz wszystkie poprawne" />
      <fieldset className="options" disabled={locked}>
        <legend className="sr-only">{activity.question}</legend>
        {order.map(original => (
          <label key={original} className={`option ${locked && activity.correct.includes(original) ? 'is-correct' : ''} ${picked.includes(original) ? 'is-picked' : ''}`}>
            <input type="checkbox" checked={picked.includes(original)} onChange={() => toggle(original)} />
            <span className="option-box" aria-hidden="true" />
            <span>{activity.options[original]}</span>
          </label>
        ))}
      </fieldset>
      {!locked && (
        <button className="btn" type="button" onClick={check} disabled={!picked.length}>
          Sprawdź
        </button>
      )}
      {!locked && value.lastWrong && (
        <Feedback tone="wrong" title="Jeszcze nie.">
          {[missing && `Brakuje ${missing} ${missing === 1 ? 'odpowiedzi' : 'odpowiedzi'}.`, extra && `Zaznaczono ${extra} ${extra === 1 ? 'zbędną' : 'zbędne'}.`].filter(Boolean).join(' ')} {activity.hint}
        </Feedback>
      )}
      {locked && <Feedback tone="ok" title="Dobrze.">{activity.explanation}</Feedback>}
    </div>
  );
}

function NumberQuestion({ activity, value = {}, onChange }) {
  const [input, setInput] = useState(value.input || '');
  const [invalid, setInvalid] = useState(false);
  const locked = value.done;

  function check() {
    const result = checkNumber(activity, input);
    if (!result.valid) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    onChange({ ...nextValue(value, result.correct), input, mistake: result.mistake?.text || null, lastWrong: !result.correct });
  }

  function reveal() {
    onChange({ ...value, input: formatNumber(activity.answer), done: true, first: false, revealed: true, lastWrong: false });
    setInput(formatNumber(activity.answer));
  }

  return (
    <div className="activity">
      <Prompt activity={activity} kind="Oblicz" />
      <div className="number-row">
        <label className="number-field">
          <span className="sr-only">Twoja odpowiedź</span>
          <input
            inputMode="decimal"
            autoComplete="off"
            value={input}
            disabled={locked}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && check()}
            placeholder="np. 12,50"
          />
          {activity.unit && <span className="unit">{activity.unit}</span>}
        </label>
        {!locked && (
          <button className="btn" type="button" onClick={check} disabled={!input.trim()}>
            Sprawdź
          </button>
        )}
      </div>
      {invalid && <Feedback tone="wrong">Wpisz samą liczbę, np. 1250 albo 12,5.</Feedback>}
      {!locked && value.lastWrong && (
        <Feedback tone="wrong" title="Jeszcze nie.">
          {value.mistake || activity.hint || 'Sprawdź, od jakiej kwoty liczysz procent.'}
        </Feedback>
      )}
      {!locked && (value.tries || 0) >= 2 && (
        <button className="text-button" type="button" onClick={reveal}>
          Pokaż rozwiązanie (bez punktów)
        </button>
      )}
      {locked && (
        <Feedback tone={value.revealed ? 'info' : 'ok'} title={value.revealed ? `Wynik: ${formatNumber(activity.answer)}${activity.unit ? ' ' + activity.unit : ''}` : 'Dobrze.'}>
          {activity.explanation}
        </Feedback>
      )}
    </div>
  );
}

function Matching({ activity, value = {}, onChange }) {
  const [picks, setPicks] = useState(value.picks || {});
  const checked = value.checked || {};
  const allPicked = activity.rows.every((_, i) => picks[i] !== undefined);

  function check() {
    const result = {};
    activity.rows.forEach((row, i) => {
      result[i] = picks[i] === row.correct;
    });
    const ratio = Object.values(result).filter(Boolean).length / activity.rows.length;
    onChange({ picks, checked: result, done: ratio === 1, firstRatio: value.firstRatio ?? ratio });
  }

  return (
    <div className="activity">
      <Prompt activity={activity} kind="Przyporządkuj" />
      <ol className="match-rows">
        {activity.rows.map((row, i) => (
          <li key={i} className={checked[i] === true ? 'is-correct' : checked[i] === false ? 'is-wrong' : ''}>
            <span className="match-label">{row.label}</span>
            <div className="segmented" role="radiogroup" aria-label={row.label}>
              {activity.options.map((option, o) => (
                <button
                  key={o}
                  type="button"
                  role="radio"
                  aria-checked={picks[i] === o}
                  disabled={value.done}
                  className={picks[i] === o ? 'is-on' : ''}
                  onClick={() => setPicks({ ...picks, [i]: o })}
                >
                  {option}
                </button>
              ))}
            </div>
            {checked[i] !== undefined && (checked[i] || value.done) && row.explanation && <p className="row-note">{row.explanation}</p>}
            {checked[i] === false && !value.done && <p className="row-note">Ten wiersz popraw.</p>}
          </li>
        ))}
      </ol>
      {!value.done && (
        <button className="btn" type="button" onClick={check} disabled={!allPicked}>
          Sprawdź
        </button>
      )}
      {value.done && <Feedback tone="ok" title="Wszystko na swoim miejscu.">{activity.explanation}</Feedback>}
    </div>
  );
}

function Sequence({ activity, value = {}, onChange }) {
  const initial = useMemo(() => scrambledOrder(activity.items.length, activity.id), [activity]);
  const [order, setOrder] = useState(value.order || initial);
  const locked = value.done;

  function move(index, delta) {
    const target = index + delta;
    if (target < 0 || target >= order.length) return;
    const next = [...order];
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
  }

  function check() {
    const ok = checkSequence(activity, order);
    onChange({ ...nextValue(value, ok), order, lastWrong: !ok, wrongAt: order.map((item, i) => item !== i) });
  }

  return (
    <div className="activity">
      <Prompt activity={activity} kind="Ułóż w kolejności" />
      <ol className="sequence">
        {order.map((item, i) => (
          <li key={item} className={locked ? 'is-correct' : value.lastWrong && value.wrongAt?.[i] ? 'is-wrong' : ''}>
            <span className="sequence-number">{i + 1}</span>
            <span className="sequence-text">{activity.items[item]}</span>
            {!locked && (
              <span className="sequence-buttons">
                <button type="button" className="icon-btn" aria-label={`Przesuń wyżej: ${activity.items[item]}`} disabled={i === 0} onClick={() => move(i, -1)}>
                  ↑
                </button>
                <button type="button" className="icon-btn" aria-label={`Przesuń niżej: ${activity.items[item]}`} disabled={i === order.length - 1} onClick={() => move(i, 1)}>
                  ↓
                </button>
              </span>
            )}
          </li>
        ))}
      </ol>
      {!locked && (
        <button className="btn" type="button" onClick={check}>
          Sprawdź kolejność
        </button>
      )}
      {!locked && value.lastWrong && <Feedback tone="wrong" title="Jeszcze nie.">Czerwone pozycje są w złym miejscu. {activity.hint}</Feedback>}
      {locked && <Feedback tone="ok" title="Dobra kolejność.">{activity.explanation}</Feedback>}
    </div>
  );
}

function OpenText({ activity, value = {}, onChange }) {
  const text = value.text || '';
  const min = activity.minLength ?? 20;
  const [showModel, setShowModel] = useState(false);
  const enough = text.trim().length >= min;

  return (
    <div className="activity">
      <Prompt activity={activity} kind="Twoja odpowiedź" />
      <label className="text-field">
        <span className="sr-only">{activity.question}</span>
        <textarea
          rows={activity.rows || 4}
          maxLength={2000}
          value={text}
          placeholder={activity.placeholder || ''}
          onChange={e => onChange({ text: e.target.value, done: e.target.value.trim().length >= min })}
        />
      </label>
      <p className="small muted">
        {enough ? 'Zapisane na tym urządzeniu.' : `Napisz co najmniej ${min} znaków, wtedy zobaczysz przykładową odpowiedź.`}
      </p>
      {enough && activity.model && (
        <>
          <button className="text-button" type="button" aria-expanded={showModel} onClick={() => setShowModel(!showModel)}>
            {showModel ? 'Ukryj przykładową odpowiedź' : 'Porównaj z przykładową odpowiedzią'}
          </button>
          {showModel && (
            <Feedback tone="info" title="Przykładowa odpowiedź">
              {activity.model}
              {activity.criteria && (
                <ul className="criteria">
                  {activity.criteria.map(c => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              )}
            </Feedback>
          )}
        </>
      )}
    </div>
  );
}

function Checklist({ activity, value = {}, onChange }) {
  const marks = value.marks || {};
  return (
    <div className="activity">
      <Prompt activity={activity} kind="Lista kontrolna" />
      <ul className="checklist">
        {activity.items.map((item, i) => (
          <li key={i}>
            <label>
              <input type="checkbox" checked={!!marks[i]} onChange={() => onChange({ marks: { ...marks, [i]: !marks[i] } })} />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className="small muted">{activity.note || 'To Twoja deklaracja. Strona nie sprawdza wykonania.'}</p>
    </div>
  );
}

function InfoCard({ activity }) {
  return (
    <aside className={`info-card info-${activity.tone || 'plain'}`}>
      {activity.title && <h3>{activity.title}</h3>}
      {activity.paragraphs?.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      {activity.table && <SimpleTable table={activity.table} />}
      {activity.list && (
        <ul>
          {activity.list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export function SimpleTable({ table }) {
  return (
    <div className="table-wrap">
      <table>
        {table.caption && <caption>{table.caption}</caption>}
        <thead>
          <tr>
            {table.head.map((h, i) => (
              <th key={i} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td key={c}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Pole „Mojego projektu”: tekst zapisuje się w notatkach projektu w serwisie programu.
function ProjectField({ activity, value = {}, onChange }) {
  const [text, setText] = useState(() => readNote(activity.field) || value.text || '');
  const [saved, setSaved] = useState(null);
  const [showExample, setShowExample] = useState(false);

  function change(next) {
    setText(next);
    setSaved(writeNote(activity.field, next));
    onChange({ text: next, done: next.trim().length >= 10 });
  }

  return (
    <div className="activity">
      <Prompt activity={{ ...activity, question: activity.label }} kind="Mój projekt" />
      {activity.prompt && <p className="activity-context">{activity.prompt}</p>}
      <label className="text-field">
        <span className="sr-only">{activity.label}</span>
        <textarea rows={activity.rows || 4} value={text} maxLength={20000} placeholder={activity.placeholder || ''} onChange={e => change(e.target.value)} />
      </label>
      <p className="small muted" role="status">
        {saved === false ? 'Nie udało się zapisać w przeglądarce. Skopiuj tekst, zanim zamkniesz stronę.' : 'Zapisuje się w „Moim projekcie” w tej przeglądarce.'}
      </p>
      {activity.example && (
        <>
          <button type="button" className="text-button" onClick={() => setShowExample(v => !v)} aria-expanded={showExample}>
            {showExample ? 'Ukryj przykład' : 'Pokaż przykład'}
          </button>
          {showExample && <Feedback tone="info">{activity.example}</Feedback>}
        </>
      )}
    </div>
  );
}

const components = {
  projectField: ProjectField,
  choice: Choice,
  multi: Multi,
  number: NumberQuestion,
  matching: Matching,
  sequence: Sequence,
  text: OpenText,
  checklist: Checklist,
  info: InfoCard,
  docForm: DocForm,
  spotErrors: SpotErrors,
  dialog: Dialog,
  resultCard: ResultCard,
};

export const activityTypes = Object.keys(components);

export function Activity({ activity, value, onChange, lesson, answers }) {
  const Component = components[activity.type];
  if (!Component) return <p className="feedback feedback-wrong">Nieznany typ ćwiczenia: {activity.type}</p>;
  return (
    <section className={`activity-wrap activity-${activity.type}`} id={`a-${activity.id}`}>
      <Component activity={activity} value={value} onChange={onChange} lesson={lesson} answers={answers} />
    </section>
  );
}
