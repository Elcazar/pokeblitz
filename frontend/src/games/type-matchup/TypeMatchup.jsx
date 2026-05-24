// games/type-matchup/TypeMatchup.jsx
// Renderer for the type-matchup minigame.
// Shows two type badges (attacking vs defending) and 4 effectiveness options.

import { getTypeColor, getTypeTextColor } from '../../data/typeColors.js';
import './type-matchup.css';

export default function TypeMatchup({ attacking, defending, options, lang, onAnswer, disabled }) {
  return (
    <div className="tm-container">

      {/* Type matchup display */}
      <div className="tm-matchup">
        <TypeBadge type={attacking} lang={lang} />
        <span className="tm-arrow">▶</span>
        <TypeBadge type={defending} lang={lang} />
      </div>

      {/* Options */}
      <div className="tm-options">
        {options.map((option) => (
          <button
            key={option.key}
            className={`tm-btn tm-btn--${option.key}`}
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

function TypeBadge({ type, lang }) {
  const bg    = getTypeColor(type);
  const color = getTypeTextColor(type);

  return (
    <span
      className="tm-badge"
      style={{ '--type-bg': bg, '--type-color': color }}
    >
      {type}
    </span>
  );
}