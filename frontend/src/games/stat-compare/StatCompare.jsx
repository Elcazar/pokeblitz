// games/stat-compare/StatCompare.jsx
// Renderer for the stat-compare minigame.
// Shows two Pokemon sprites side by side with a VS, and two answer buttons.

import './stat-compare.css';

export default function StatCompare({ pokemonA, pokemonB, statLabel, options, onAnswer, disabled }) {
  return (
    <div className="sc-container">

      <div className="sc-matchup">
        <div className="sc-pokemon">
          <img className="sc-sprite" src={pokemonA.spriteUrl} alt={pokemonA.name} draggable={false} />
          <span className="sc-name">{pokemonA.name}</span>
        </div>

        <div className="sc-vs">
          <span className="sc-stat-label">{statLabel}</span>
          <span className="sc-vs-text">VS</span>
        </div>

        <div className="sc-pokemon">
          <img className="sc-sprite" src={pokemonB.spriteUrl} alt={pokemonB.name} draggable={false} />
          <span className="sc-name">{pokemonB.name}</span>
        </div>
      </div>

      <div className="sc-options">
        <button
          className="sc-btn sc-btn--higher"
          onClick={() => !disabled && onAnswer(true)}
          disabled={disabled}
        >
          {options.higher} ↑
        </button>
        <button
          className="sc-btn sc-btn--lower"
          onClick={() => !disabled && onAnswer(false)}
          disabled={disabled}
        >
          {options.lower} ↓
        </button>
      </div>

    </div>
  );
}