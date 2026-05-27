// games/bst-compare/BSTCompare.jsx
// Renderer for the bst-compare minigame.
// Shows two Pokemon side by side, tap the one with higher BST.
// On disabled: correct in green, wrong in red (review mode).

import './bst-compare.css';

export default function BSTCompare({ pokemonA, pokemonB, correctId, selectedAnswer, onAnswer, disabled }) {
  function getCardClass(pokemon) {
    if (!disabled) return 'bst-card';
    if (pokemon.id === correctId) return 'bst-card bst-card--correct';
    if (selectedAnswer === pokemon.id && pokemon.id !== correctId) return 'bst-card bst-card--wrong';
    return 'bst-card bst-card--dim';
  }

  return (
    <div className="bst-container">
      <div className="bst-matchup">
        {[pokemonA, pokemonB].map((p) => (
          <button
            key={p.id}
            className={getCardClass(p)}
            onClick={() => !disabled && onAnswer(p.id)}
            disabled={disabled}
          >
            <img className="bst-sprite" src={p.spriteUrl} alt={p.name} draggable={false} />
            <span className="bst-name">{p.name}</span>
            {disabled && <span className="bst-value">{p.bst}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}