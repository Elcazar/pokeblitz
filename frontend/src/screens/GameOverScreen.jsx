// screens/GameOverScreen.jsx
// Shown when the player loses all lives.
// Displays final score, games played, and a scrollable run history.
// Tapping a history entry opens a review modal with the minigame in disabled mode.

import { useState } from 'react';
import { useLang } from '../context/LanguageContext.jsx';
import GameReviewModal from '../components/GameReviewModal.jsx';

const COPY = {
  en: {
    title: 'Game Over',
    score: 'Score',
    played: 'games played',
    restart: 'Try again',
    history: 'Run summary',
  },
  es: {
    title: 'Game Over',
    score: 'Puntos',
    played: 'microjuegos jugados',
    restart: 'Reintentar',
    history: 'Resumen de la run',
  },
};

export default function GameOverScreen({ score, gamesPlayed, history, onRestart }) {
  const { lang } = useLang();
  const copy = COPY[lang];
  const [reviewing, setReviewing] = useState(null);

  return (
    <div className="gameover-screen">
      <h2 className="gameover-title">{copy.title}</h2>
      <div className="gameover-score">{score}</div>
      <p className="gameover-label">{copy.score}</p>
      <p className="gameover-played">{gamesPlayed} {copy.played}</p>

      {history?.length > 0 && (
        <div className="gameover-history">
          <p className="gameover-history-label">{copy.history}</p>
          <div
            className="gameover-history-grid"
            style={{ '--grid-cols': Math.ceil(Math.sqrt(history.length)) }}
          >
            {history.map((entry, i) => (
              <button
                key={i}
                className={`gameover-history-cell gameover-history-cell--${entry.result}`}
                onClick={() => setReviewing(entry)}
                title={entry.instruction?.[lang]}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      <button className="btn-primary" onClick={onRestart}>
        {copy.restart}
      </button>

      {reviewing && (
        <GameReviewModal
          entry={reviewing}
          onClose={() => setReviewing(null)}
        />
      )}
    </div>
  );
}