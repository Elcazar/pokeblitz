// engine/difficultySystem.js
// Handles difficulty scaling based on games played.
// Instead of a fixed time limit, we expose a multiplier (1.0 = full time, 0.4 = very fast)
// that each game applies to its own baseTimeMs.

import { DIFFICULTY_STAGES } from './constants.js';

/**
 * Returns the current difficulty stage based on games played.
 *
 * @param {number} gamesPlayed
 * @returns {object}
 */
export function getCurrentStage(gamesPlayed) {
  const stages = [...DIFFICULTY_STAGES].reverse();
  return stages.find((stage) => gamesPlayed >= stage.gamesPlayed) ?? DIFFICULTY_STAGES[0];
}

/**
 * Returns a time multiplier between 1.0 (easiest) and 0.4 (hardest).
 * Applied to each game's own baseTimeMs.
 *
 * @param {number} gamesPlayed
 * @returns {number}
 */
export function getDifficultyMultiplier(gamesPlayed) {
  return getCurrentStage(gamesPlayed).multiplier;
}

/**
 * Returns the difficulty label for the HUD.
 *
 * @param {number} gamesPlayed
 * @returns {string}
 */
export function getDifficultyLabel(gamesPlayed) {
  return getCurrentStage(gamesPlayed).label;
}

/**
 * Returns a normalized difficulty value between 0 and 1.
 * Useful for microgames that want to scale their own complexity.
 *
 * @param {number} gamesPlayed
 * @returns {number}
 */
export function getNormalizedDifficulty(gamesPlayed) {
  const index = DIFFICULTY_STAGES.findIndex(
    (s) => s.label === getCurrentStage(gamesPlayed).label
  );
  return index / (DIFFICULTY_STAGES.length - 1);
}