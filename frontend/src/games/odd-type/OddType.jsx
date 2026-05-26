// games/odd-type/OddType.jsx
// Renderer for the odd-type minigame.
// Shows 4 Pokemon in a 2x2 grid. Player taps the one that doesn't share the common type.
// On disabled, shows the odd one in green and wrong selection in red.

import { useState } from 'react';
import './odd-type.css';

export default function OddType({ options, selectedAnswer, onAnswer, disabled }) {
  const [localSelected, setLocalSelected] = useState(selectedAnswer ?? null);

  function handleAnswer(option) {
    if (disabled) return;
    setLocalSelected(option.id);
    onAnswer(option.id);
  }

  function getCardClass(option) {
    if (!disabled) return 'ot-card';
    if (option.isOdd) return 'ot-card ot-card--correct';
    if (localSelected === option.id && !option.isOdd) return 'ot-card ot-card--wrong';
    return 'ot-card ot-card--dim';
  }

  return (
    <div className="ot-grid">
      {options.map((option) => (
        <button
          key={option.id}
          className={getCardClass(option)}
          onClick={() => handleAnswer(option)}
          disabled={disabled}
        >
          <img
            className="ot-sprite"
            src={option.spriteUrl}
            alt={option.name}
            draggable={false}
          />
          <span className="ot-name">{option.name}</span>
        </button>
      ))}
    </div>
  );
}