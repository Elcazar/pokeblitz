// games/type-matchup/TypeMatchup.jsx
// Renderer for the type-matchup minigame.
// On disabled: correct highlighted, wrong selection marked in review.

import { getTypeColor, getTypeTextColor } from '../../data/typeColors.js';
import './type-matchup.css';

export default function TypeMatchup({ attacking, defending, options, correctKey, selectedAnswer, lang, onAnswer, disabled }) {
  function getBtnClass(option) {
    const base = `tm-btn tm-btn--${option.key}`;
    if (!disabled) return base;
    if (option.key === correctKey) return `${base} tm-btn--feedback-correct`;
    if (selectedAnswer === option.key && option.key !== correctKey) return `${base} tm-btn--feedback-wrong`;
    return `${base} tm-btn--feedback-dim`;
  }

  return (
    <div className="tm-container">
      <div className="tm-matchup">
        <TypeBadge type={attacking} lang={lang} />
        <span className="tm-arrow">▶</span>
        <TypeBadge type={defending} lang={lang} />
      </div>

      <div className="tm-options">
        {options.map((option) => (
          <button
            key={option.key}
            className={getBtnClass(option)}
            onClick={() => !disabled && onAnswer(option.key)}
            disabled={disabled}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function TypeBadge({ type }) {
  const bg    = getTypeColor(type);
  const color = getTypeTextColor(type);
  return (
    <span className="tm-badge" style={{ '--type-bg': bg, '--type-color': color }}>
      {type}
    </span>
  );
}