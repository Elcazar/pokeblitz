// games/gen-quiz/GenQuiz.jsx
// Renderer for the gen-quiz minigame.
// On disabled: correct in green, wrong selection in red (review mode only).

import './gen-quiz.css';

export default function GenQuiz({ spriteUrl, options, correctGen, selectedAnswer, onAnswer, disabled }) {
  function getBtnClass(option) {
    if (!disabled) return 'gq-btn';
    if (option.value === correctGen) return 'gq-btn gq-btn--correct';
    if (selectedAnswer === option.value && option.value !== correctGen) return 'gq-btn gq-btn--wrong';
    return 'gq-btn gq-btn--dim';
  }

  return (
    <div className="gq-container">
      <img className="gq-sprite" src={spriteUrl} alt="Pokemon" draggable={false} />

      <div className="gq-options">
        {options.map((option) => (
          <button
            key={option.value}
            className={getBtnClass(option)}
            onClick={() => !disabled && onAnswer(option.value)}
            disabled={disabled}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}