// screens/CheckpointScreen.jsx
// Shown every N games. Celebrates progress with a random Pokemon,
// current score, and lives remaining.

import { MAX_LIVES } from '../engine/constants.js';

const COPY = {
  en: { title: 'Checkpoint!', score: 'Score', keep_going: 'Keep going!' },
  es: { title: 'Checkpoint!', score: 'Puntos', keep_going: 'Sigue adelante!' },
};

export default function CheckpointScreen({ state, lang }) {
  const { score, lives, gamesPlayed, checkpointPokemon } = state;
  const copy = COPY[lang];

  return (
    <div className="checkpoint-screen">
      <div className="checkpoint-title">{copy.title}</div>

      {checkpointPokemon && (
        <img
          className="checkpoint-sprite"
          src={checkpointPokemon.spriteUrl}
          alt={checkpointPokemon.name[lang]}
        />
      )}

      <div className="checkpoint-score">{score}</div>
      <div className="checkpoint-label">{copy.score}</div>

      <div className="checkpoint-lives">
        {Array.from({ length: MAX_LIVES }).map((_, i) => (
          <span key={i} className={`heart ${i < lives ? 'heart--full' : 'heart--empty'}`}>
            {i < lives ? '♥' : '♡'}
          </span>
        ))}
      </div>

      <div className="checkpoint-games">{gamesPlayed} games</div>
      <div className="checkpoint-keepgoing">{copy.keep_going}</div>
    </div>
  );
}