// screens/GameScreen.jsx
// Main game screen. Renders the HUD, timer bar, current microgame,
// and the result overlay (win/lose) between games.

import { useEffect, useRef, useState, useCallback } from 'react';
import { GAME_STATE, MAX_LIVES } from '../engine/constants.js';
import GameRenderer from '../components/renderers/GameRenderer.jsx';

const COPY = {
  en: { correct: 'Correct!', wrong: 'Wrong!', score: 'Score' },
  es: { correct: 'Correcto!', wrong: 'Incorrecto!', puntos: 'Puntos' },
};

const DIFFICULTY_LABELS = {
  normal: { en: 'Normal', es: 'Normal' },
  fast:   { en: 'Fast',   es: 'Rapido' },
  faster: { en: 'Faster', es: 'Mas rapido' },
  insane: { en: 'Insane', es: 'Insano' },
  max:    { en: 'MAX',    es: 'MAX' },
};

export default function GameScreen({ state, timeLimitMs, difficultyLabel, lang, onWin, onLose }) {
  const { status, score, lives, streak, currentGame } = state;
  const copy = COPY[lang];
  const isResult = status === GAME_STATE.RESULT;

  // -- Timer --
  const [timeLeft, setTimeLeft] = useState(1);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const answeredRef = useRef(false);

  // Reset and start timer when a new game loads
  useEffect(() => {
    if (status !== GAME_STATE.PLAYING || !currentGame) return;

    answeredRef.current = false;
    setTimeLeft(1);
    startTimeRef.current = performance.now();

    timerRef.current = setInterval(() => {
      const elapsed = performance.now() - startTimeRef.current;
      const remaining = Math.max(0, 1 - elapsed / timeLimitMs);
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(timerRef.current);
        if (!answeredRef.current) {
          answeredRef.current = true;
          onLose();
        }
      }
    }, 50);

    return () => clearInterval(timerRef.current);
  }, [currentGame, status, timeLimitMs, onLose]);

  const handleAnswer = useCallback((answer) => {
    if (answeredRef.current || isResult) return;
    answeredRef.current = true;
    clearInterval(timerRef.current);

    if (currentGame.validate(answer)) {
      onWin(answer);
    } else {
      onLose(answer);
    }
  }, [currentGame, isResult, onWin, onLose]);

  // -- Timer bar color --
  const timerColor =
    timeLeft > 0.6 ? '#22c55e' :
    timeLeft > 0.3 ? '#f59e0b' :
    '#ef4444';

  const diffLabel = DIFFICULTY_LABELS[difficultyLabel]?.[lang] ?? difficultyLabel;

  return (
    <div className="game-screen">

      {/* HUD */}
      <div className="hud">
        <div className="hud-lives">
          {Array.from({ length: MAX_LIVES }).map((_, i) => (
            <span key={i} className={`heart ${i < lives ? 'heart--full' : 'heart--empty'}`}>
              {i < lives ? '♥' : '♡'}
            </span>
          ))}
        </div>
        <div className="hud-score">
          {copy.score ?? 'Score'}: {score}
          {streak >= 3 && <span className="hud-streak"> x{streak}</span>}
        </div>
        <div className="hud-difficulty">{diffLabel}</div>
      </div>

      {/* Timer bar */}
      <div className="timer-bar-track">
        <div
          className="timer-bar-fill"
          style={{ width: `${timeLeft * 100}%`, background: timerColor }}
        />
      </div>

      {/* Instruction */}
      {currentGame && (
        <p className="game-instruction" key={`instruction-${state.gamesPlayed}`}>
          {currentGame.instruction[lang]}
        </p>
      )}

      {/* Microgame renderer */}
      <div className="game-area" key={`game-${state.gamesPlayed}`}>
        <GameRenderer
          game={currentGame}
          lang={lang}
          onAnswer={handleAnswer}
          disabled={isResult}
        />
      </div>

      {/* Result overlay */}
      {isResult && (
        <div className={`result-overlay result-overlay--${state.lastResult}`}>
          {state.lastResult === 'win' ? copy.correct : copy.wrong}
        </div>
      )}

    </div>
  );
}