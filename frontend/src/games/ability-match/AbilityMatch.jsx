// games/ability-match/AbilityMatch.jsx
// Renderer for the ability-match minigame.
// On disabled: correct in green, wrong selection in red (review mode).

import './ability-match.css';

export default function AbilityMatch({ abilityName, options, selectedAnswer, onAnswer, disabled }) {
  function getCardClass(option) {
    if (!disabled) return 'am-card';
    if (option.isCorrect) return 'am-card am-card--correct';
    if (selectedAnswer === option.id && !option.isCorrect) return 'am-card am-card--wrong';
    return 'am-card am-card--dim';
  }

  return (
    <div className="am-container">
      <div className="am-ability-badge">{abilityName}</div>

      <div className="am-options">
        {options.map((option) => (
          <button
            key={option.id}
            className={getCardClass(option)}
            onClick={() => !disabled && onAnswer(option.id)}
            disabled={disabled}
          >
            <img className="am-sprite" src={option.spriteUrl} alt={option.name} draggable={false} />
            <span className="am-name">{option.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}