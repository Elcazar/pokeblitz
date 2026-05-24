// games/count-type/CountType.jsx
// Renderer for the count-type minigame.
// 6 Pokemon in a 3x2 grid. Tap to select, OK to validate.

import { useState } from 'react';
import { getTypeColor } from '../../data/typeColors.js';
import './count-type.css';

export default function CountType({ cards, targetType, onAnswer, disabled }) {
  const [selected, setSelected] = useState(new Set());

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

  const typeColor = getTypeColor(targetType);

  return (
    <div className="ct-container">
      <div className="ct-grid">
        {cards.map((card) => (
          <button
            key={card.id}
            className={`ct-card ${selected.has(card.id) ? 'ct-card--selected' : ''}`}
            style={{ '--type-color': typeColor }}
            onClick={() => handleTap(card.id)}
            disabled={disabled}
          >
            <img
              className="ct-sprite"
              src={card.spriteUrl}
              alt="Pokemon"
              draggable={false}
            />
          </button>
        ))}
      </div>

      <button
        className="ct-submit btn-primary"
        onClick={handleSubmit}
        disabled={disabled}
      >
        OK
      </button>
    </div>
  );
}