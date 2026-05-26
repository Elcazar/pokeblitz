// games/count-type/CountType.jsx
// Renderer for the count-type minigame.
// 6 Pokemon in a 3x2 grid. Tap to select, OK to validate.
// On disabled: correct matches in green, wrong selections in red, missed in yellow.

import { useState } from 'react';
import { getTypeColor } from '../../data/typeColors.js';
import './count-type.css';

export default function CountType({ cards, targetType, selectedAnswer, onAnswer, disabled }) {
  const [selected, setSelected] = useState(() => {
    if (selectedAnswer && Array.isArray(selectedAnswer)) return new Set(selectedAnswer);
    return new Set();
  });

  function handleTap(id) {
    if (disabled) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleSubmit() {
    if (disabled) return;
    onAnswer([...selected]);
  }

  function getCardClass(card) {
    if (!disabled) {
      return `ct-card ${selected.has(card.id) ? 'ct-card--selected' : ''}`;
    }
    // Review mode
    const wasSelected = selected.has(card.id);
    if (card.isMatch && wasSelected) return 'ct-card ct-card--correct';   // correctly selected
    if (card.isMatch && !wasSelected) return 'ct-card ct-card--missed';   // should have selected
    if (!card.isMatch && wasSelected) return 'ct-card ct-card--wrong';    // wrongly selected
    return 'ct-card ct-card--dim';
  }

  const typeColor = getTypeColor(targetType);

  return (
    <div className="ct-container">
      <div className="ct-grid">
        {cards.map((card) => (
          <button
            key={card.id}
            className={getCardClass(card)}
            style={{ '--type-color': typeColor }}
            onClick={() => handleTap(card.id)}
            disabled={disabled}
          >
            <img className="ct-sprite" src={card.spriteUrl} alt="Pokemon" draggable={false} />
          </button>
        ))}
      </div>

      {!disabled && (
        <button className="ct-submit btn-primary" onClick={handleSubmit}>
          OK
        </button>
      )}
    </div>
  );
}