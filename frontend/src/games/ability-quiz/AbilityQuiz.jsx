// games/ability-quiz/AbilityQuiz.jsx
// Renderer for the ability-quiz minigame.
// On disabled: correct in green, wrong selection in red (review mode).

import './ability-quiz.css';

export default function AbilityQuiz({ spriteUrl, options, correctAbility, selectedAnswer, onAnswer, disabled }) {
  function getBtnClass(option) {
    if (!disabled) return 'aq-btn';
    if (option === correctAbility) return 'aq-btn aq-btn--correct';
    if (selectedAnswer === option && option !== correctAbility) return 'aq-btn aq-btn--wrong';
    return 'aq-btn aq-btn--dim';
  }

  return (
    <div className="aq-container">
      <img className="aq-sprite" src={spriteUrl} alt="Pokemon" draggable={false} />

      <div className="aq-options">
        {options.map((option) => (
          <button
            key={option}
            className={getBtnClass(option)}
            onClick={() => !disabled && onAnswer(option)}
            disabled={disabled}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}