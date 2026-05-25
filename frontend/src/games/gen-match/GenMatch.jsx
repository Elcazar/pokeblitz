// games/gen-match/GenMatch.jsx
// Renderer for the gen-match minigame.
// Shows 4 Pokemon in a 2x2 grid, pick the one from the correct generation.

import './gen-match.css';

export default function GenMatch({ options, onAnswer, disabled }) {
  return (
    <div className="gm-grid">
      {options.map((option) => (
        <button
          key={option.id}
          className="gm-card"
          onClick={() => !disabled && onAnswer(option.id)}
          disabled={disabled}
        >
          <img
            className="gm-sprite"
            src={option.spriteUrl}
            alt={option.name}
            draggable={false}
          />
          <span className="gm-name">{option.name}</span>
        </button>
      ))}
    </div>
  );
}