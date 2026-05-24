// screens/GameOverScreen.jsx
// Shown when the player loses all lives.
// Displays final score and a restart button.

import { useLang } from '../context/LanguageContext.jsx';

const COPY = {
  en: {
    title: 'Game Over',
    score: 'Score',
    played: 'games played',
    restart: 'Try again',
  },
  es: {
    title: 'Game Over',
    score: 'Puntos',
    played: 'microjuegos jugados',
    restart: 'Reintentar',
  },
};

export default function GameOverScreen({ score, gamesPlayed, onRestart }) {
  const { lang } = useLang();
  const copy = COPY[lang];

  return (
    <div className="gameover-screen">
      <h2 className="gameover-title">{copy.title}</h2>
      <div className="gameover-score">{score}</div>
      <p className="gameover-label">{copy.score}</p>
      <p className="gameover-played">{gamesPlayed} {copy.played}</p>
      <button className="btn-primary" onClick={onRestart}>
        {copy.restart}
      </button>
    </div>
  );
}