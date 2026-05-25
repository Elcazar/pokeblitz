// engine/gameState.js
// Central state reducer for the game engine.
// All state mutations go through here — no direct state changes elsewhere.

import {
  INITIAL_LIVES,
  POINTS_PER_WIN,
  BONUS_STREAK_THRESHOLD,
  BONUS_STREAK_POINTS,
  GAME_STATE,
} from './constants.js';

export const initialState = {
  status: GAME_STATE.IDLE,
  lives: INITIAL_LIVES,
  score: 0,
  streak: 0,
  gamesPlayed: 0,
  currentGame: null,
  lastResult: null,
  checkpointPokemon: null,
  // History of every game played in this run
  // Each entry: { gameId, instruction, result: 'win' | 'lose' }
  history: [],
};

export const ACTIONS = {
  START_GAME:      'START_GAME',
  LOAD_GAME:       'LOAD_GAME',
  WIN:             'WIN',
  LOSE:            'LOSE',
  SHOW_INTERLUDE:  'SHOW_INTERLUDE',
  SHOW_CHECKPOINT: 'SHOW_CHECKPOINT',
  NEXT_GAME:       'NEXT_GAME',
  GAME_OVER:       'GAME_OVER',
};

export function gameReducer(state, action) {
  switch (action.type) {

    case ACTIONS.START_GAME:
      return { ...initialState, status: GAME_STATE.PLAYING };

    case ACTIONS.LOAD_GAME:
      return {
        ...state,
        status: GAME_STATE.PLAYING,
        currentGame: action.payload.game,
        lastResult: null,
      };

    case ACTIONS.WIN: {
      const isBonus =
        (state.streak + 1) > 0 &&
        (state.streak + 1) % BONUS_STREAK_THRESHOLD === 0;
      const points = POINTS_PER_WIN + (isBonus ? BONUS_STREAK_POINTS : 0);

      return {
        ...state,
        status: GAME_STATE.RESULT,
        score: state.score + points,
        streak: state.streak + 1,
        gamesPlayed: state.gamesPlayed + 1,
        lastResult: 'win',
        history: [
          ...state.history,
          {
            gameId: state.currentGame?.id,
            instruction: state.currentGame?.instruction,
            component: state.currentGame?.component,
            props: state.currentGame?.props,
            result: 'win',
          },
        ],
      };
    }

    case ACTIONS.LOSE:
      return {
        ...state,
        status: GAME_STATE.RESULT,
        lives: state.lives - 1,
        streak: 0,
        gamesPlayed: state.gamesPlayed + 1,
        lastResult: 'lose',
        history: [
          ...state.history,
          {
            gameId: state.currentGame?.id,
            instruction: state.currentGame?.instruction,
            component: state.currentGame?.component,
            props: state.currentGame?.props,
            result: 'lose',
          },
        ],
      };

    case ACTIONS.SHOW_INTERLUDE:
      return { ...state, status: GAME_STATE.INTERLUDE };

    case ACTIONS.SHOW_CHECKPOINT:
      return {
        ...state,
        status: GAME_STATE.CHECKPOINT,
        checkpointPokemon: action.payload.pokemon,
      };

    case ACTIONS.NEXT_GAME:
      return {
        ...state,
        status: GAME_STATE.PLAYING,
        currentGame: action.payload.game,
        lastResult: null,
        checkpointPokemon: null,
      };

    case ACTIONS.GAME_OVER:
      return { ...state, status: GAME_STATE.GAME_OVER };

    default:
      return state;
  }
}