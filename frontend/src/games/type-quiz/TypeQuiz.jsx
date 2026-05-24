// components/renderers/TypeChoice.jsx
// Renderer for the type-quiz minigame.
// Supports single-type (tap one) and dual-type (tap two) selection.
// Buttons are styled with official type colors.

import { useState } from 'react';
import { getTypeColor, getTypeTextColor } from '../../data/typeColors.js';
import '../../games/type-quiz/type-quiz.css';


export default function TypeChoice({ spriteUrl, options, correctTypes, isDual, onAnswer, disabled }) {
  const [selected, setSelected] = useState([]);

  function handleSelect(type) {
    if (disabled) return;

    if (!isDual) {
      onAnswer([type]);
      return;
    }

    setSelected((prev) => {
      // Toggle selection
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      }

      const next = [...prev, type];

      // Auto-submit when both types are selected
      if (next.length === 2) {
        // Delay slightly so the user sees the second selection highlight
        setTimeout(() => onAnswer(next), 120);
      }

      return next;
    });
  }

  return (
    <div className="tc-container">
      {spriteUrl && (
        <img
          className="tc-sprite"
          src={spriteUrl}
          alt="Pokemon sprite"
          draggable={false}
        />
      )}

      <div className={`tc-options ${isDual ? 'tc-options--dual' : 'tc-options--single'}`}>
        {options.map((type) => {
          const isSelected = selected.includes(type);
          const bg = getTypeColor(type);
          const color = getTypeTextColor(type);

          return (
            <button
              key={type}
              className={`tc-btn ${isSelected ? 'tc-btn--selected' : ''}`}
              style={{
                '--type-bg': bg,
                '--type-color': color,
              }}
              onClick={() => handleSelect(type)}
              disabled={disabled}
            >
              {type}
            </button>
          );
        })}
      </div>

      {isDual && (
        <p className="tc-hint">
          {selected.length}/2
        </p>
      )}
    </div>
  );
}