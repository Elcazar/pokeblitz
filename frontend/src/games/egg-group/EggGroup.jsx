// games/egg-group/EggGroup.jsx
// Renderer for the egg-group minigame.
// Shows a Pokemon with a heart and 4 options in a 2x2 grid.
// On disabled: correct in green, wrong selection in red (review mode).

import './egg-group.css';

export default function EggGroup({ spriteUrl, options, selectedAnswer, onAnswer, disabled }) {
  function getCardClass(option) {
    if (!disabled) return 'eg-card';
    if (option.isCorrect) return 'eg-card eg-card--correct';
    if (selectedAnswer === option.id && !option.isCorrect) return 'eg-card eg-card--wrong';
    return 'eg-card eg-card--dim';
  }

  return (
    <div className="eg-container">
      <div className="eg-target">
        <img className="eg-sprite" src={spriteUrl} alt="Pokemon" draggable={false} />
        <span className="eg-heart">♥</span>
      </div>

      <div className="eg-options">
        {options.map((option) => (
          <button
            key={option.id}
            className={getCardClass(option)}
            onClick={() => !disabled && onAnswer(option.id)}
            disabled={disabled}
          >
            <img className="eg-option-sprite" src={option.spriteUrl} alt={option.name} draggable={false} />
            <span className="eg-name">{option.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}