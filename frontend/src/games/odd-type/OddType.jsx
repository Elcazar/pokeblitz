// games/odd-type/OddType.jsx
// Renderer for the odd-type minigame.
// Shows 4 Pokemon in a 2x2 grid. Player taps the one that doesn't share the common type.

import './odd-type.css';

export default function OddType({ options, onAnswer, disabled }) {
  return (
    <div className="ot-grid">
      {options.map((option) => (
        <button
          key={option.id}
          className="ot-card"
          onClick={() => !disabled && onAnswer(option.id)}
          disabled={disabled}
        >
          <img
            className="ot-sprite"
            src={option.spriteUrl}
            alt={option.name}
            draggable={false}
          />
          <span className="ot-name">{option.name}</span>
        </button>
      ))}
    </div>
  );
}