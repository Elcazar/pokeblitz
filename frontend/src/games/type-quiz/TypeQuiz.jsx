// games/type-quiz/TypeQuiz.jsx
// Renderer for the type-quiz minigame.
// Supports single-type (tap one) and dual-type (tap two) selection.
// On disabled, shows correct types in green and wrong selection in red.

import { useState } from 'react';
import { getTypeColor, getTypeTextColor } from '../../data/typeColors.js';
import './type-quiz.css';

export default function TypeQuiz({ spriteUrl, options, correctTypes, isDual, selectedAnswer, onAnswer, disabled }) {
  const [selected, setSelected] = useState(
    // In review mode, pre-populate with the answer the player gave
    selectedAnswer ? (Array.isArray(selectedAnswer) ? selectedAnswer : [selectedAnswer]) : []
  );

  function handleSelect(type) {
    if (disabled) return;

    if (!isDual) {
      setSelected([type]);
      onAnswer([type]);
      return;
    }

    setSelected((prev) => {
      if (prev.includes(type)) return prev.filter((t) => t !== type);
      const next = [...prev, type];
      if (next.length === 2) setTimeout(() => onAnswer(next), 120);
      return next;
    });
  }

  function getCellState(type) {
    if (!disabled) return selected.includes(type) ? 'selected' : 'idle';
    const isCorrect = correctTypes.includes(type);
    const wasSelected = selected.includes(type);
    if (isCorrect) return 'correct';
    if (wasSelected && !isCorrect) return 'wrong';
    return 'idle';
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
          const state = getCellState(type);
          const bg    = getTypeColor(type);
          const color = getTypeTextColor(type);

          return (
            <button
              key={type}
              className={`tc-btn tc-btn--${state}`}
              style={{ '--type-bg': bg, '--type-color': color }}
              onClick={() => handleSelect(type)}
              disabled={disabled}
            >
              {type}
            </button>
          );
        })}
      </div>

      {isDual && !disabled && (
        <p className="tc-hint">{selected.length}/2</p>
      )}
    </div>
  );
}