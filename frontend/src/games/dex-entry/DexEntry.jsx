// games/dex-entry/DexEntry.jsx
// Renderer for the dex-entry minigame.
// Shows a censored Pokedex entry and 4 Pokemon options with type colors.
// On answer, replaces the entry with the correct Pokemon's sprite.

import { useState } from 'react';
import { getTypeColor, getTypeTextColor } from '../../data/typeColors.js';
import './dex-entry.css';

export default function DexEntry({ entry, options, correctSpriteUrl, onAnswer, disabled }) {
  const [answered, setAnswered] = useState(false);

  function handleAnswer(option) {
    if (disabled) return;
    setAnswered(true);
    setTimeout(() => onAnswer(option.id), 400);
  }

  return (
    <div className="de-container">

      <div className="de-entry">
        {answered ? (
          <img
            className="de-reveal-sprite"
            src={correctSpriteUrl}
            alt="Pokemon revealed"
            draggable={false}
          />
        ) : (
          <>
            <span className="de-entry-icon">📖</span>
            <p className="de-entry-text">{entry}</p>
          </>
        )}
      </div>

      <div className="de-options">
        {options.map((option) => {
          const primaryType = option.types[0];
          const bg    = getTypeColor(primaryType);
          const color = getTypeTextColor(primaryType);

          return (
            <button
              key={option.id}
              className="de-btn"
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