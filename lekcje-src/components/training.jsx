import { useMemo, useState } from 'react';
import { modules, trainings } from '../content/trainings/index.js';
import { realiaFor } from '../content/realia.js';
import { formatNumber, isScored } from '../lib/scoring.js';
import { finishSession, newSeed, nextDate, sessionActivities, sessionScore, startSession, trainingStatus, wrongCount } from '../lib/training.js';
import { trainingState, withTraining } from '../lib/store.js';
import { Activity } from './activities.jsx';

const dateText = iso => new Date(iso).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' });
const today = () => new Date().toISOString().slice(0, 10);

function statusText(progress) {
  const status = trainingStatus(progress, today());
  if (status.kind === 'open') return { text: 'Seria w toku', tone: 'open' };
  if (status.kind === 'new') return { text: 'Jeszcze nie zaczęty', tone: '' };
  const last = `${formatNumber(status.last.score, 1)}/${status.last.max} pkt`;
  if (status.kind === 'due') return { text: `Na dziś · ostatnio ${last}`, tone: 'due' };
  return { text: `Następny: ${dateText(status.last.next)} · ostatnio ${last}`, tone: 'done' };
}

function ModuleLinks({ list }) {
  return (
    <p className="small module-links">
      Ćwiczenie do {list.length > 1 ? 'modułów' : 'modułu'}:{' '}
      {list.map((n, i) => (
        <span key={n}>
          {i > 0 && ', '}
          <a href={`../modul-${n}.html`}>
            {n}. {modules[n]}
          </a>
        </span>
      ))}
    </p>
  );
}

export function TrainingCatalog({ state }) {
  return (
    <main id="main" className="page">
      <section className="hero">
        <p className="eyebrow">Trening dla dorosłych</p>
        <h1>Krótkie serie zadań do regularnego powtarzania.</h1>
        <p className="lead">
          Jeden trening to 10–12 minut: ściąga na minutę i seria 6–7 zadań. Kwoty, daty i przypadki zmieniają się przy każdym podejściu, a zadania z błędem wracają w następnej serii. Po serii widzisz, kiedy warto wrócić: jutro, za trzy dni albo za tydzień.
        </p>
        <p className="muted">
          Treningi są ćwiczeniami do modułów programu dla aspirujących przedsiębiorców. To nie są lekcje szkolne i nie mają odniesień do kwalifikacji HAN — lekcje dla szkół są w zakładce <a href="#/">Lekcje HAN</a>.
        </p>
      </section>
      <div className="cards">
        {trainings.map(t => {
          const status = statusText(trainingState(state, t.id));
          return (
            <article key={t.id} className="card">
              <div className="card-meta">
                <span>Trening · ok. {t.minutes} min</span>
                <span>{t.round} zadań w serii</span>
              </div>
              <h3>
                <a href={`#/trening/${t.id}`}>{t.title}</a>
              </h3>
              <p>{t.subtitle}</p>
              <p className="small muted">{t.who}</p>
              <div className="card-foot">
                <span className={status.tone === 'done' ? 'done' : status.tone === 'due' ? 'due' : ''}>{status.text}</span>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

export function TrainingView({ training, state, update }) {
  const progress = trainingState(state, training.id);
  const session = progress.session;
  const [summary, setSummary] = useState(null);
  const activities = useMemo(() => (session ? sessionActivities(training, session) : []), [training, session?.seed, session?.items?.join()]);
  const realiaList = useMemo(() => realiaFor(training.realia), [training]);
  const wrong = wrongCount(progress);

  function save(change) {
    update(s => withTraining(s, training.id, change));
  }

  function start(onlyWrong = false) {
    setSummary(null);
    save(p => {
      const next = startSession(training, p, newSeed(), { onlyWrong });
      return next.items.length ? { ...p, session: next } : p;
    });
    window.scrollTo(0, 0);
  }

  function finish() {
    const now = new Date().toISOString();
    const result = sessionScore(training, session);
    setSummary({ ...result, next: nextDate(result.ratio, now) });
    save(p => finishSession(training, p, p.session, now));
    window.scrollTo(0, 0);
  }

  function abandon() {
    if (!window.confirm('Przerwać serię? Odpowiedzi z tej serii nie zostaną policzone.')) return;
    save(p => ({ ...p, session: null }));
  }

  const header = (
    <header className="lesson-head">
      <p className="eyebrow">
        <a href="#/trening">Trening</a> · ok. {training.minutes} min · {training.round} zadań w serii
      </p>
      <h1>{training.title}</h1>
      <p className="lead">{training.subtitle}</p>
      <ModuleLinks list={training.modules} />
    </header>
  );

  const brief = open => (
    <details className="brief" open={open}>
      <summary>Ściąga: najważniejsze zasady</summary>
      <ul>
        {training.brief.map(point => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </details>
  );

  if (session && activities.length) {
    const index = Math.min(session.index || 0, activities.length - 1);
    const current = activities[index];
    const value = session.answers[current.id];
    const done = !isScored(current) || value?.done;
    const allDone = activities.every(a => !isScored(a) || session.answers[a.id]?.done);
    const setIndex = i => save(p => ({ ...p, session: { ...p.session, index: i } }));
    return (
      <main id="main" className="lesson training">
        {header}
        <div className="training-progress" aria-label={`Zadanie ${index + 1} z ${activities.length}`}>
          <span>
            Zadanie {index + 1} z {activities.length}
            {session.onlyWrong ? ' · powtórka błędnych' : ''}
          </span>
          <div className="meter" aria-hidden="true">
            <span style={{ width: `${Math.round(((index + (done ? 1 : 0)) / activities.length) * 100)}%` }} />
          </div>
        </div>
        <article className="stage">
          <Activity
            key={current.id}
            activity={current}
            value={value}
            onChange={v => save(p => ({ ...p, session: { ...p.session, answers: { ...p.session.answers, [current.id]: v } } }))}
            lesson={null}
            answers={session.answers}
          />
          <div className="stage-nav no-print">
            {index > 0 ? (
              <button type="button" className="btn secondary" onClick={() => setIndex(index - 1)}>
                ← Poprzednie
              </button>
            ) : (
              <span />
            )}
            {index < activities.length - 1 ? (
              <button type="button" className="btn" disabled={!done} onClick={() => setIndex(index + 1)}>
                Następne zadanie →
              </button>
            ) : (
              <button type="button" className="btn" disabled={!allDone} onClick={finish}>
                Zakończ serię i zobacz wynik
              </button>
            )}
          </div>
        </article>
        <footer className="lesson-foot no-print">
          {brief(false)}
          <div className="inline-actions">
            <button type="button" className="text-button" onClick={abandon}>
              Przerwij serię
            </button>
          </div>
        </footer>
      </main>
    );
  }

  const status = trainingStatus(progress, today());
  const history = (progress.history || []).slice(-5).reverse();

  return (
    <main id="main" className="lesson training">
      {header}
      {summary && (
        <section className="training-summary" aria-live="polite">
          <h2>
            Wynik serii: {formatNumber(summary.score, 1)} / {summary.max} pkt
          </h2>
          <div className="meter" aria-hidden="true">
            <span style={{ width: `${Math.round(summary.ratio * 100)}%` }} />
          </div>
          {summary.next && (
            <p>
              Następny trening: <b>{dateText(summary.next)}</b>.{' '}
              {summary.ratio >= 0.9 ? 'Dobrze — wystarczy powtórka za tydzień.' : summary.ratio >= 0.7 ? 'Wróć za trzy dni, póki zasady są świeże.' : 'Najlepiej jutro, krótko — błędne zadania wrócą na początek serii.'}
            </p>
          )}
          {summary.rows.some(r => !r.full) && (
            <>
              <h3>Do powtórki</h3>
              <ul className="training-wrong">
                {summary.rows
                  .filter(r => !r.full)
                  .map(r => (
                    <li key={r.activity.id}>
                      <b>{r.activity.question || r.activity.title}</b>
                      <span>{r.activity.explanation}</span>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </section>
      )}
      {!summary && status.kind !== 'new' && (
        <p className="training-status">
          Ostatnia seria: {dateText(status.last.date)}, {formatNumber(status.last.score, 1)}/{status.last.max} pkt.{' '}
          {status.kind === 'due' ? <b>Czas na kolejną serię.</b> : <>Następna: {dateText(status.last.next)}.</>}
        </p>
      )}
      {!summary && status.kind === 'new' && <p className="training-status">{training.who} Przeczytaj ściągę, a potem zacznij serię.</p>}
      {brief(status.kind === 'new' && !summary)}
      <div className="inline-actions training-actions">
        <button type="button" className="btn" onClick={() => start(false)}>
          {status.kind === 'new' && !summary ? 'Zacznij pierwszą serię' : 'Nowa seria (nowe dane)'}
        </button>
        {wrong > 0 && (
          <button type="button" className="btn secondary" onClick={() => start(true)}>
            Tylko zadania z błędem ({wrong})
          </button>
        )}
      </div>
      {history.length > 0 && (
        <section className="training-history">
          <h2>Twoje serie</h2>
          <ol>
            {history.map(h => (
              <li key={h.date}>
                {dateText(h.date)} — {formatNumber(h.score, 1)}/{h.max} pkt
              </li>
            ))}
          </ol>
          <p className="small muted">Wyniki zostają w tej przeglądarce. Nic nie jest wysyłane.</p>
        </section>
      )}
      {realiaList.length > 0 && (
        <details className="lesson-foot">
          <summary>Przepisy i kwoty w tym treningu (stan na {new Date(realiaList[0].checked).toLocaleDateString('pl-PL')})</summary>
          <ul className="realia">
            {realiaList.map(r => (
              <li key={r.key}>
                <b>{r.label}:</b> {r.value}. <span className="muted">Źródło: {r.source}.</span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </main>
  );
}
