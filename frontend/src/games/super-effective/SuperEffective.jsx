// games/super-effective/SuperEffective.jsx
// Renderer for the super-effective minigame.
// Shows a Pokemon sprite and 4 move buttons colored by their type.

import { getTypeColor, getTypeTextColor } from '../../data/typeColors.js';
import './super-effective.css';

export default function SuperEffective({ spriteUrl, options, lang, onAnswer, disabled }) {
  return (
    <div className="se-container">
      {spriteUrl && (
        <img
          className="se-sprite"
          src={spriteUrl}
          alt="Pokemon"
          draggable={false}
        />
      )}

      <div className="se-options">
        {options.map((move) => {
          const bg    = getTypeColor(move.type);
          const color = getTypeTextColor(move.type);

          return (
            <button
              key={move.name.en}
              className="se-btn"
              style={{ '--type-bg': bg, '--type-color': color }}
              onClick={() => !disabled && onAnswer(move.name.en)}
              disabled={disabled}
            >
              {move.name[lang]}
            </button>
          );
        })}
      </div>
    </div>
  );
}