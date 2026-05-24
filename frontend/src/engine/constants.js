// engine/constants.js
// Central configuration for the game engine.

// -- Lives --
export const INITIAL_LIVES = 3;
export const MAX_LIVES = 3;

// -- Scoring --
export const POINTS_PER_WIN = 1;
export const BONUS_STREAK_THRESHOLD = 5;
export const BONUS_STREAK_POINTS = 2;

// -- Difficulty stages --
// multiplier is applied to each game's own baseTimeMs.
// 1.0 = full time, 0.4 = 40% of base time (hardest).
export const DIFFICULTY_STAGES = [
  { gamesPlayed: 0,  multiplier: 1.0,  label: 'normal' },
  { gamesPlayed: 5,  multiplier: 0.90, label: 'fast'   },
  { gamesPlayed: 10, multiplier: 0.85,  label: 'faster' },
  { gamesPlayed: 20, multiplier: 0.80, label: 'insane' },
  { gamesPlayed: 35, multiplier: 0.75,  label: 'max'    },
];

// -- Result display --
export const RESULT_DISPLAY_MS_WIN  = 600;
export const RESULT_DISPLAY_MS_LOSE = 800;

// -- Interlude --
export const INTERLUDE_DURATION_MS  = 1500;
export const CHECKPOINT_EVERY_N     = 5;
export const CHECKPOINT_DURATION_MS = 3000;

// -- Game states --
export const GAME_STATE = {
  IDLE:        'idle',
  PLAYING:     'playing',
  RESULT:      'result',
  INTERLUDE:   'interlude',
  CHECKPOINT:  'checkpoint',
  GAME_OVER:   'game_over',
};