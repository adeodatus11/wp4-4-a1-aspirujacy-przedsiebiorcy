import { Feedback } from './activities.jsx';

// Rozmowa z rozgałęzieniami. Węzeł: {speaker, text, choices:[{text, next, good, feedback}]} albo {end:true, text}.
// Wynik: odsetek węzłów, w których pierwszy wybór był dobry.
export function Dialog({ activity, value = {}, onChange }) {
  const nodeId = value.node || activity.start;
  const node = activity.nodes[nodeId];
  const history = value.history || [];
  const firstPicks = value.firstPicks || {};
  const lastBad = value.lastBad;

  function pick(choice, index) {
    const first = firstPicks[nodeId] === undefined ? { ...firstPicks, [nodeId]: !!choice.good } : firstPicks;
    if (!choice.good) {
      onChange({ ...value, node: nodeId, firstPicks: first, lastBad: { node: nodeId, index } });
      return;
    }
    const next = activity.nodes[choice.next];
    const entries = [...history, { speaker: node.speaker, text: node.text }, { speaker: activity.you || 'Ty', text: choice.text, feedback: choice.feedback }];
    const finished = !!next?.end;
    const decisions = Object.values(first);
    const ratio = decisions.length ? decisions.filter(Boolean).length / decisions.length : 0;
    onChange({
      ...value,
      node: choice.next,
      history: entries,
      firstPicks: first,
      lastBad: null,
      done: finished || value.done,
      firstRatio: finished ? value.firstRatio ?? ratio : value.firstRatio,
    });
  }

  function restart() {
    onChange({ done: value.done, firstRatio: value.firstRatio, firstPicks: value.firstRatio !== undefined ? firstPicks : {}, node: activity.start, history: [] });
  }

  return (
    <div className="activity">
      <header className="activity-head">
        <span className="activity-kind">Rozmowa</span>
        <h3 className="activity-question">{activity.title}</h3>
        {activity.context && <p className="activity-context">{activity.context}</p>}
      </header>
      <ol className="chat" aria-live="polite">
        {history.map((entry, i) => (
          <li key={i} className={entry.speaker === (activity.you || 'Ty') ? 'chat-you' : 'chat-them'}>
            <span className="chat-speaker">{entry.speaker}</span>
            <p>{entry.text}</p>
            {entry.feedback && <p className="chat-note">{entry.feedback}</p>}
          </li>
        ))}
        {node && !node.end && (
          <li className="chat-them">
            <span className="chat-speaker">{node.speaker}</span>
            <p>{node.text}</p>
          </li>
        )}
      </ol>
      {node && !node.end && (
        <div className="chat-choices" role="group" aria-label="Co odpowiadasz?">
          <p className="small muted">Co odpowiadasz?</p>
          {node.choices.map((choice, i) => (
            <button key={i} type="button" className={`chat-choice ${lastBad?.node === nodeId && lastBad.index === i ? 'is-wrong' : ''}`} onClick={() => pick(choice, i)}>
              {choice.text}
            </button>
          ))}
          {lastBad?.node === nodeId && (
            <Feedback tone="wrong" title="Ta odpowiedź pogorszy rozmowę.">
              {node.choices[lastBad.index].feedback}
            </Feedback>
          )}
        </div>
      )}
      {node?.end && (
        <>
          <Feedback tone="ok" title="Koniec rozmowy.">
            {node.text}
          </Feedback>
          <button className="text-button" type="button" onClick={restart}>
            Przeprowadź rozmowę jeszcze raz
          </button>
        </>
      )}
    </div>
  );
}
