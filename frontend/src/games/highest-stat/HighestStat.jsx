// games/highest-stat/HighestStat.jsx
// Renderer for the highest-stat minigame.
// Shows a Pokemon and 6 stat buttons. On disabled: correct in green, wrong in red.

import './highest-stat.css';

export default function HighestStat({ spriteUrl, options, correctStats, selectedAnswer, onAnswer, disabled }) {
  function getBtnClass(option) {
    if (!disabled) return 'hs-btn';
    if (option.isCorrect) return 'hs-btn hs-btn--correct';
    if (selectedAnswer === option.key && !option.isCorrect) return 'hs-btn hs-btn--wrong';
    return 'hs-btn hs-btn--dim';
  }

  return (
    <div className="hs-container">
      <img className="hs-sprite" src={spriteUrl} alt="Pokemon" draggable={false} />

      <div className="hs-options">
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