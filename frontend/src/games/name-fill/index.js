// games/name-fill/index.js
// Minigame: fill in the missing letters of a Pokemon's name.
// 25% of non-space letters are revealed (ceil), the rest are hidden.

import { registerGame } from '../registry.js';
import { getRandom, capitalize } from '../../data/pokemonHelpers.js';

const INSTRUCTIONS = {
  en: 'Complete the name!',
  es: 'Completa el nombre!',
};

function buildHint(name) {
  const chars = name.split('');
  const letterIndices = chars
    .map((c, i) => (c !== ' ' ? i : null))
    .filter((i) => i !== null);

  const revealCount = Math.ceil(letterIndices.length * 0.25);
  const shuffled = [...letterIndices].sort(() => Math.random() - 0.5);
  const revealedIndices = new Set(shuffled.slice(0, revealCount));

  const hint = chars.map((c, i) => {
    if (c === ' ') return ' ';
    if (revealedIndices.has(i)) return c;
    return '_';
  });

  return { hint };
}

registerGame({
  id: 'name-fill',
  title:        { en: 'Fill the Name', es: 'Completa el nombre' },
  category:     'names',
  baseTimeMs:   9000,  // typing takes longer than tapping
  minDifficulty: 0,
  pokemonFilter: {},
  pokemonFilter: { excludeForms: true },

  build({ pokemon, lang }) {
    const target = getRandom(pokemon);
    const displayName = lang === 'en'
      ? capitalize(target.name.en)
      : target.name.es;

    const { hint } = buildHint(displayName);

    return {
      id: 'name-fill',
      instruction: {
        en: INSTRUCTIONS.en,
        es: INSTRUCTIONS.es,
      },
      component: 'NameFill',
      props: {
        spriteUrl: target.spriteUrl,
        hint,
        displayName,
      },
      validate: (answer) =>
        typeof answer === 'string' &&
        answer.trim().toLowerCase() === displayName.toLowerCase(),
    };
  },
});