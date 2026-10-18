import { useState } from 'react';
import { SimpleTable } from './activities.jsx';

// Krótkie wyjaśnienie w etapie i przykład rozwiązany krok po kroku.
export function Reading({ reading, expanded = false }) {
  if (!reading) return null;
  return (
    <div className="reading">
      {reading.title && <h3>{reading.title}</h3>}
      {reading.paragraphs?.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      {reading.table && <SimpleTable table={reading.table} />}
      {reading.list && (
        <ul>
          {reading.list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
      {reading.example && <WorkedExample example={reading.example} expanded={expanded} />}
    </div>
  );
}

function WorkedExample({ example, expanded }) {
  const steps = example.steps || [];
  const [shown, setShown] = useState(expanded ? steps.length : 0);
  const all = shown >= steps.length;
  return (
    <div className="example">
      <p className="eyebrow">Przykład rozwiązany</p>
      <p className="example-question">{example.question}</p>
      {steps.length > 0 && (
        <ol className="example-steps">
          {steps.slice(0, shown).map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      )}
      {!all && (
        <button className="btn secondary" type="button" onClick={() => setShown(shown + 1)}>
          {shown === 0 ? 'Pokaż pierwszy krok' : 'Następny krok'}
        </button>
      )}
      {all && example.answer && (
        <p className="example-answer">
          <b>Wynik:</b> {example.answer}
        </p>
      )}
    </div>
  );
}
