// games/evo-order/EvoOrder.jsx
// Renderer for the evo-order minigame.
// Tap to select a card, tap another to swap positions.
// Submit button validates the order.

import { useState } from 'react';
import './evo-order.css';

export default function EvoOrder({ options, correctOrder, onAnswer, disabled }) {
  const [cards, setCards]     = useState(options);
  const [selected, setSelected] = useState(null); // index of selected card

  function handleTap(index) {
    if (disabled) return;

    if (selected === null) {
      // Select this card
      setSelected(index);
    } else if (selected === index) {
      // Deselect
      setSelected(null);
    } else {
      // Swap selected with this
      setCards((prev) => {
        const next = [...prev];
        [next[selected], next[index]] = [next[index], next[selected]];
        return next;
      });
      setSelected(null);
    }
  }

  function handleSubmit() {
    if (disabled) return;
    onAnswer(cards.map((c) => c.id));
  }

  return (
    <div className="eo-container">
      <div className="eo-chain">
        {cards.map((card, i) => (
          <div key={card.id} className="eo-slot">
            <button
              className={`eo-card ${selected === i ? 'eo-card--selected' : ''}`}
              onClick={() => handleTap(i)}
              disabled={disabled}
            >
              <img
                className="eo-sprite"
                src={card.spriteUrl}
                alt={card.name}
                draggable={false}
              />
              <span className="eo-name">{card.name}</span>
            </button>
            {i < cards.length - 1 && (
              <span className="eo-arrow">▶</span>
            )}
          </div>
        ))}
      </div>

      <button
        className="eo-submit btn-primary"
        onClick={handleSubmit}
        disabled={disabled}
      >
        OK
      </button>
    </div>
  );
}   