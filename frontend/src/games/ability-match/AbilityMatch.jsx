// games/ability-match/AbilityMatch.jsx
// Renderer for the ability-match minigame.
// Shows an ability name and 4 Pokemon options in a 2x2 grid.

import './ability-match.css';

export default function AbilityMatch({ abilityName, options, onAnswer, disabled }) {
  return (
    <div className="am-container">
      <div className="am-ability-badge">
        {abilityName}
      </div>

      <div className="am-options">
        {options.map((option) => (
          <button
            key={option.id}
            className="am-card"
            onClick={() => !disabled && onAnswer(option.id)}
            disabled={disabled}
          >
            <img
              className="am-sprite"
              src={option.spriteUrl}
              alt={option.name}
              draggable={false}
            />
            <span className="am-name">{option.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}