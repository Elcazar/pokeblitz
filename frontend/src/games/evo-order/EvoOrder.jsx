// games/evo-order/EvoOrder.jsx
// Renderer for the evo-order minigame.
// On disabled without selectedAnswer: correct positions green, wrong dim.
// On disabled with selectedAnswer (review): correct green, wrong red.

import { useState } from 'react';
import './evo-order.css';

export default function EvoOrder({ options, correctOrder, selectedAnswer, onAnswer, disabled }) {
  const initialCards = () => {
    if (selectedAnswer && Array.isArray(selectedAnswer)) {
      const byId = Object.fromEntries(options.map((o) => [String(o.id), o]));
      return selectedAnswer.map((id) => byId[String(id)]).filter(Boolean);
    }
    return options;
  };

  const [cards, setCards]       = useState(initialCards);
  const [selected, setSelected] = useState(null);

  function handleTap(index) {
    if (disabled) return;
    if (selected === null) {
      setSelected(index);
    } else if (selected === index) {
      setSelected(null);
    } else {
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

  function getCardClass(card, index) {
    if (!disabled) return `eo-card ${selected === index ? 'eo-card--selected' : ''}`;
    if (disabled && selectedAnswer && selectedAnswer.length > 0) {
      const isCorrect = String(card.id) === String(correctOrder[index]);
      return `eo-card ${isCorrect ? 'eo-card--correct' : 'eo-card--wrong'}`;
    }
    return 'eo-card';
  }

  return (
    <div className="eo-container">
      <div className="eo-chain">
        {cards.map((card, i) => (
          <div key={card.id} className="eo-slot">
            <button
              className={getCardClass(card, i)}
              onClick={() => handleTap(i)}
              disabled={disabled}
            >
              <img className="eo-sprite" src={card.spriteUrl} alt={card.name} draggable={false} />
              <span className="eo-name">{card.name}</span>
            </button>
            {i < cards.length - 1 && <span className="eo-arrow">▶</span>}
          </div>
        ))}
      </div>

      {!disabled && (
        <button className="eo-submit btn-primary" onClick={handleSubmit}>
          OK
        </button>
      )}
    </div>
  );
}