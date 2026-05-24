// games/dex-entry/index.js
// Minigame: read a censored Pokedex entry and guess which Pokemon it describes.
// The Pokemon's name is replaced with ??? in the entry text.
// Options are shown as Pokemon cards with name and type color.

import { registerGame } from '../registry.js';
import { getRandom, getRandomExcluding, capitalize, shuffle } from '../../data/pokemonHelpers.js';

const INSTRUCTIONS = {
  en: 'Which Pokemon is this?',
  es: 'De qué Pokemon habla?',
};

registerGame({
  id: 'dex-entry',
  title:         { en: 'Pokedex Entry', es: 'Entrada Pokedex' },
  category:      'pokedex',
  baseTimeMs:    10000, // reading takes longer
  minDifficulty: 0,
  pokemonFilter: { excludeForms: true },

  build({ pokemon, lang }) {
    // Only use Pokemon that have a Pokedex entry in the current language
    const withEntry = pokemon.filter((p) => p.pokedexEntry[lang]?.trim().length > 0);
    const target = getRandom(withEntry);

    const displayName = lang === 'en' ? capitalize(target.name.en) : target.name.es;

    // Censor the Pokemon's name in the entry (case-insensitive)
    const entry = target.pokedexEntry[lang].replace(
      new RegExp(displayName, 'gi'),
      '???'
    );

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
      id: 'dex-entry',
      instruction: {
        en: INSTRUCTIONS.en,
        es: INSTRUCTIONS.es,
      },
      component: 'DexEntry',
      props: {
        entry,
        options,
        correctSpriteUrl: target.spriteUrl,
      },
      validate: (selectedId) => selectedId === target.id,
    };
  },
});