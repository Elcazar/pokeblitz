// engine/gameEngine.js
// Central hook that wires together state, difficulty, and microgame registry.

import { useReducer, useCallback, useEffect, useRef } from 'react';
import { gameReducer, initialState, ACTIONS } from './gameState.js';
import { getDifficultyLabel, getDifficultyMultiplier } from './difficultySystem.js';
import {
  GAME_STATE,
  RESULT_DISPLAY_MS_WIN,
  RESULT_DISPLAY_MS_LOSE,
  INTERLUDE_DURATION_MS,
  CHECKPOINT_EVERY_N,
  CHECKPOINT_DURATION_MS,
} from './constants.js';

/**
 * useGameEngine
 *
 * Exposes:
 *   state             - full game state
 *   timeLimitMs       - time limit for the current game (from game's baseTimeMs × difficulty multiplier)
 *   difficultyLabel   - human-readable difficulty label
 *   startGame()
 *   onWin()
 *   onLose()
 */
export function useGameEngine({ getNextGame, getRandomPokemon }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const timerRef = useRef(null);

  const difficultyLabel = getDifficultyLabel(state.gamesPlayed);

  // Time limit comes from the current game's baseTimeMs scaled by difficulty
  const multiplier = getDifficultyMultiplier(state.gamesPlayed);
  const timeLimitMs = state.currentGame?.baseTimeMs
    ? Math.round(state.currentGame.baseTimeMs * multiplier)
    : 5000;

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  // After RESULT: go to interlude or game over
  useEffect(() => {
    if (state.status !== GAME_STATE.RESULT) return;

    const delay = state.lastResult === 'win' ? RESULT_DISPLAY_MS_WIN : RESULT_DISPLAY_MS_LOSE;

    timerRef.current = setTimeout(() => {
      if (state.lives <= 0) {
        dispatch({ type: ACTIONS.GAME_OVER });
        return;
      }
      dispatch({ type: ACTIONS.SHOW_INTERLUDE });
    }, delay);

    return () => clearTimeout(timerRef.current);
  }, [state.status, state.lives, state.lastResult]);

  // After INTERLUDE: checkpoint or next game
  useEffect(() => {
    if (state.status !== GAME_STATE.INTERLUDE) return;

    timerRef.current = setTimeout(() => {
      const isCheckpoint = state.gamesPlayed % CHECKPOINT_EVERY_N === 0;
      if (isCheckpoint) {
        const pokemon = getRandomPokemon();
        dispatch({ type: ACTIONS.SHOW_CHECKPOINT, payload: { pokemon } });
      } else {
        const nextGame = getNextGame();
        dispatch({ type: ACTIONS.NEXT_GAME, payload: { game: nextGame } });
      }
    }, INTERLUDE_DURATION_MS);

    return () => clearTimeout(timerRef.current);
  }, [state.status, state.gamesPlayed, getNextGame, getRandomPokemon]);

  // After CHECKPOINT: next game
  useEffect(() => {
    if (state.status !== GAME_STATE.CHECKPOINT) return;

    timerRef.current = setTimeout(() => {
      const nextGame = getNextGame();
      dispatch({ type: ACTIONS.NEXT_GAME, payload: { game: nextGame } });
    }, CHECKPOINT_DURATION_MS);

    return () => clearTimeout(timerRef.current);
  }, [state.status, getNextGame]);

  const startGame = useCallback(() => {
    dispatch({ type: ACTIONS.START_GAME });
    const firstGame = getNextGame();
    dispatch({ type: ACTIONS.LOAD_GAME, payload: { game: firstGame } });
  }, [getNextGame]);

  const onWin  = useCallback((selectedAnswer) => dispatch({ type: ACTIONS.WIN,  payload: { selectedAnswer } }), []);
  const onLose = useCallback((selectedAnswer) => dispatch({ type: ACTIONS.LOSE, payload: { selectedAnswer } }), []);

  return { state, timeLimitMs, difficultyLabel, startGame, onWin, onLose };
}