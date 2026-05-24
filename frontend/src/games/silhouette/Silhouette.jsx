// games/silhouette/Silhouette.jsx
// Renderer for the silhouette minigame.
// Shows a black silhouette. On correct answer, reveals the sprite in color.

import { useState } from 'react';
import { getTypeColor, getTypeTextColor } from '../../data/typeColors.js';
import './silhouette.css';

export default function Silhouette({ spriteUrl, options, onAnswer, disabled }) {
  const [revealed, setRevealed] = useState(false);

  function handleAnswer(option) {
    if (disabled) return;
    if (option.isCorrect) setRevealed(true);
    // Small delay on correct so the reveal animation plays before result overlay
    setTimeout(() => onAnswer(option.id), option.isCorrect ? 400 : 0);
  }

  return (
    <div className="sil-container">
      <img
        className={`sil-sprite ${revealed ? 'sil-sprite--revealed' : ''}`}
        src={spriteUrl}
        alt="Pokemon silhouette"
        draggable={false}
      />

      <div className="sil-options">
        {options.map((option) => {
          const primaryType = option.types[0];
          const bg    = getTypeColor(primaryType);
          const color = getTypeTextColor(primaryType);

          return (
            <button
              key={option.id}
              className="sil-btn"
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