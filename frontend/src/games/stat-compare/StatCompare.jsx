// games/stat-compare/StatCompare.jsx
// Renderer for the stat-compare minigame.
// On disabled: correct button highlighted, wrong in red (review mode).

import './stat-compare.css';

export default function StatCompare({ pokemonA, pokemonB, statLabel, options, correctAnswer, selectedAnswer, onAnswer, disabled }) {
  function getBtnClass(value) {
    const isHigher = value === true;
    const base = isHigher ? 'sc-btn sc-btn--higher' : 'sc-btn sc-btn--lower';
    if (!disabled) return base;
    if (value === correctAnswer) return `${base} sc-btn--feedback-correct`;
    if (selectedAnswer === value && value !== correctAnswer) return `${base} sc-btn--feedback-wrong`;
    return `${base} sc-btn--feedback-dim`;
  }

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
          className={getBtnClass(true)}
          onClick={() => !disabled && onAnswer(true)}
          disabled={disabled}
        >
          {options.higher} ↑
        </button>
        <button
          className={getBtnClass(false)}
          onClick={() => !disabled && onAnswer(false)}
          disabled={disabled}
        >
          {options.lower} ↓
        </button>
      </div>
    </div>
  );
}