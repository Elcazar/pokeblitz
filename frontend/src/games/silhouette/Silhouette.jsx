// games/silhouette/Silhouette.jsx
// Renderer for the silhouette minigame.
// Shows a black silhouette. On correct answer, reveals the sprite in color.
// On disabled, shows correct in green and wrong selection in red.

import { useState } from 'react';
import { getTypeColor, getTypeTextColor } from '../../data/typeColors.js';
import './silhouette.css';

export default function Silhouette({ spriteUrl, options, selectedAnswer, onAnswer, disabled }) {
  const [revealed, setRevealed] = useState(false);
  const [localSelected, setLocalSelected] = useState(selectedAnswer ?? null);

  function handleAnswer(option) {
    if (disabled) return;
    setLocalSelected(option.id);
    setRevealed(true); // siempre revelar, no solo si es correcto
    setTimeout(() => onAnswer(option.id), 400); // delay siempre para ver el reveal
  }

  function getBtnState(option) {
    if (!disabled) return 'idle';
    if (option.isCorrect) return 'correct';
    if (localSelected === option.id && !option.isCorrect) return 'wrong';
    return 'idle';
  }

  const isRevealed = revealed || disabled;

  return (
    <div className="sil-container">
      <img
        className={`sil-sprite ${isRevealed ? 'sil-sprite--revealed' : ''}`}
        src={spriteUrl}
        alt="Pokemon silhouette"
        draggable={false}
      />

      <div className="sil-options">
        {options.map((option) => {
          const primaryType = option.types[0];
          const bg    = getTypeColor(primaryType);
          const color = getTypeTextColor(primaryType);
          const state = getBtnState(option);

          return (
            <button
              key={option.id}
              className={`sil-btn sil-btn--${state}`}
              style={{ '--type-bg': bg, '--type-color': color }}
              onClick={() => handleAnswer(option)}
              disabled={disabled}
            >
              {option.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}