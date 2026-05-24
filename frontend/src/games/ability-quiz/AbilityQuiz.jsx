// games/ability-quiz/AbilityQuiz.jsx
// Renderer for the ability-quiz minigame.
// Shows a Pokemon sprite and 4 ability name options.

import './ability-quiz.css';

export default function AbilityQuiz({ spriteUrl, options, onAnswer, disabled }) {
  return (
    <div className="aq-container">
      <img
        className="aq-sprite"
        src={spriteUrl}
        alt="Pokemon"
        draggable={false}
      />

      <div className="aq-options">
        {options.map((option) => (
          <button
            key={option}
            className="aq-btn"
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