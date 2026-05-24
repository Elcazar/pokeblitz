// games/silhouette/index.js
// Minigame: guess the Pokemon from its silhouette.
// The sprite is shown in black. On correct answer, it reveals in color.
// Alternate forms (dashes) are excluded for cleaner names.

import { registerGame } from '../registry.js';
import { getRandom, getRandomExcluding, capitalize, shuffle } from '../../data/pokemonHelpers.js';

const INSTRUCTIONS = {
  en: "Who's that Pokemon?",
  es: '¿Quién es ese Pokemon?',
};

registerGame({
  id: 'silhouette',
  title:         { en: 'Silhouette', es: 'Silueta' },
  category:      'names',
  baseTimeMs:    6000,
  minDifficulty: 0,
  pokemonFilter: { excludeForms: true },

  build({ pokemon, lang }) {
    const target = getRandom(pokemon);
    const displayName = lang === 'en' ? capitalize(target.name.en) : target.name.es;

    // 3 wrong options — different Pokemon names
    const wrongPokemon = getRandomExcluding(pokemon, target.id, 3);
    const wrongOptions = wrongPokemon.map((p) => ({
      id: p.id,
      name: lang === 'en' ? capitalize(p.name.en) : p.name.es,
      types: p.types.en,
      isCorrect: false,
    }));

    const correctOption = {
      id: target.id,
      name: displayName,
      types: target.types.en,
      isCorrect: true,
    };

    const options = shuffle([correctOption, ...wrongOptions]);

    return {
      id: 'silhouette',
      instruction: {
        en: INSTRUCTIONS.en,
        es: INSTRUCTIONS.es,
      },
      component: 'Silhouette',
      props: {
        spriteUrl: target.spriteUrl,
        options,
      },
      validate: (selectedId) => selectedId === target.id,
    };
  },
});