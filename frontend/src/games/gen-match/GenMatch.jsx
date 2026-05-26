// games/gen-match/GenMatch.jsx
// Renderer for the gen-match minigame.
// On disabled: correct in green, wrong selection in red (review only).

import './gen-match.css';

export default function GenMatch({ options, selectedAnswer, onAnswer, disabled }) {
  function getCardClass(option) {
    if (!disabled) return 'gm-card';
    if (option.isCorrect) return 'gm-card gm-card--correct';
    if (selectedAnswer === option.id && !option.isCorrect) return 'gm-card gm-card--wrong';
    return 'gm-card gm-card--dim';
  }

  return (
    <div className="gm-grid">
      {options.map((option) => (
        <button
          key={option.id}
          className={getCardClass(option)}
          onClick={() => !disabled && onAnswer(option.id)}
          disabled={disabled}
        >
          <img className="gm-sprite" src={option.spriteUrl} alt={option.name} draggable={false} />
          <span className="gm-name">{option.name}</span>
        </button>
      ))}
    </div>
  );
}