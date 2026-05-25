// games/gen-quiz/GenQuiz.jsx
// Renderer for the gen-quiz minigame.
// Shows a Pokemon sprite and 4 generation options as buttons.

import './gen-quiz.css';

export default function GenQuiz({ spriteUrl, options, onAnswer, disabled }) {
  return (
    <div className="gq-container">
      <img
        className="gq-sprite"
        src={spriteUrl}
        alt="Pokemon"
        draggable={false}
      />

      <div className="gq-options">
        {options.map((option) => (
          <button
            key={option.value}
            className="gq-btn"
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