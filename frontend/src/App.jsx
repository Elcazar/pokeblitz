// App.jsx
// Root component. Wraps the app in global providers and routes between screens
// based on the game engine state.

import { useCallback } from 'react';
import { LanguageProvider, useLang } from './context/LanguageContext.jsx';
import { PokemonProvider, usePokemon } from './context/PokemonContext.jsx';
import { useGameEngine } from './engine/gameEngine.js';
import { getNormalizedDifficulty } from './engine/difficultySystem.js';
import { getRandomGame } from './games/registry.js';
import { getRandom } from './data/pokemonHelpers.js';
import { GAME_STATE } from './engine/constants.js';

// Screens
import SplashScreen from './screens/SplashScreen.jsx';
import GameScreen from './screens/GameScreen.jsx';
import GameOverScreen from './screens/GameOverScreen.jsx';
import InterludeScreen from './screens/InterludeScreen.jsx';
import CheckpointScreen from './screens/CheckpointScreen.jsx';

// Register all microgames (side-effect imports)
// import './games/type-quiz/index.js';
// import './games/name-fill/index.js';
// import './games/odd-type/index.js';
// import './games/type-matchup/index.js';
// import './games/super-effective/index.js';
// import './games/silhouette/index.js';
// import './games/evo-order/index.js';
// import './games/stat-compare/index.js';
// import './games/dex-entry/index.js';
// import './games/count-type/index.js';
import './games/ability-quiz/index.js';
// import './games/ability-match/index.js';
// import './games/gen-quiz/index.js';
// import './games/gen-match/index.js';

function Game() {
  const { lang } = useLang();
  const { pokemon, ready, error } = usePokemon();

  const getNextGame = useCallback(() => {
    const difficulty = getNormalizedDifficulty(0); // updated via engine state below
    return getRandomGame({ pokemon, lang, difficulty });
  }, [pokemon, lang]);

  const getRandomPokemon = useCallback(() => {
    return getRandom(pokemon);
  }, [pokemon]);

  const engine = useGameEngine({ getNextGame, getRandomPokemon });
  const { state, timeLimitMs, difficultyLabel, startGame, onWin, onLose } = engine;

  if (error) {
    return <div className="load-error">{error}</div>;
  }

  if (!ready) {
    return <div className="load-screen">Loading Pokemon data...</div>;
  }

  switch (state.status) {
    case GAME_STATE.IDLE:
      return <SplashScreen onStart={startGame} />;

    case GAME_STATE.PLAYING:
    case GAME_STATE.RESULT:
      return (
        <GameScreen
          state={state}
          timeLimitMs={timeLimitMs}
          difficultyLabel={difficultyLabel}
          lang={lang}
          onWin={onWin}
          onLose={onLose}
        />
      );

    case GAME_STATE.INTERLUDE:
      return <InterludeScreen state={state} lang={lang} />;

    case GAME_STATE.CHECKPOINT:
      return <CheckpointScreen state={state} lang={lang} />;

    case GAME_STATE.GAME_OVER:
      return (
        <GameOverScreen
          score={state.score}
          gamesPlayed={state.gamesPlayed}
          history={state.history}
          onRestart={startGame}
        />
      );

    default:
      return null;
  }
}

export default function App() {
  return (
    <LanguageProvider>
      <PokemonProvider>
        <Game />
      </PokemonProvider>
    </LanguageProvider>
  );
}