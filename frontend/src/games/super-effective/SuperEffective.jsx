// games/super-effective/SuperEffective.jsx
// Renderer for the super-effective minigame.
// On disabled: correct move highlighted, wrong selection marked in review.

import { getTypeColor, getTypeTextColor } from '../../data/typeColors.js';
import './super-effective.css';

export default function SuperEffective({ spriteUrl, options, correctMove, selectedAnswer, lang, onAnswer, disabled }) {
  function getBtnClass(move) {
    if (!disabled) return 'se-btn';
    if (move.name.en === correctMove?.name?.en) return 'se-btn se-btn--correct';
    if (selectedAnswer === move.name.en && move.name.en !== correctMove?.name?.en) return 'se-btn se-btn--wrong';
    return 'se-btn se-btn--dim';
  }

  return (
    <div className="se-container">
      {spriteUrl && (
        <img className="se-sprite" src={spriteUrl} alt="Pokemon" draggable={false} />
      )}

      <div className="se-options">
        {options.map((move) => {
          const bg    = getTypeColor(move.type);
          const color = getTypeTextColor(move.type);

          return (
            <button
              key={move.name.en}
              className={getBtnClass(move)}
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