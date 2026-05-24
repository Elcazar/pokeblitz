// games/type-quiz/index.js
// Minigame: given a Pokemon sprite and name, pick its correct type(s).
// Single-type Pokemon require one selection.
// Dual-type Pokemon require both types to be selected (in any order).

import { registerGame } from '../registry.js';
import { getRandom, buildOptions, getAllTypes, capitalize } from '../../data/pokemonHelpers.js';

const INSTRUCTIONS = {
  single: {
    en: (name) => `What type is ${name}?`,
    es: (name) => `¿De qué tipo es ${name}?`,
  },
  dual: {
    en: (name) => `Pick both types of ${name}!`,
    es: (name) => `Elige los 2 tipos de ${name}!`,
  },
};

registerGame({
  id: 'type-quiz',
  title:         { en: 'Type Quiz', es: 'Adivina el tipo' },
  category:      'types',
  baseTimeMs:    5000,
  minDifficulty: 0,
  pokemonFilter: {},

  build({ pokemon, allPokemon, lang }) {
    const target = getRandom(pokemon);
    const targetTypes = target.types[lang];
    const isDual = targetTypes.length > 1;

    // Use full dataset for wrong options so all types are always available
    const allTypes = getAllTypes(allPokemon, lang);
    const wrongPool = allTypes.filter((t) => !targetTypes.includes(t));

    const totalOptions = isDual ? 6 : 4;
    const options = buildOptions(targetTypes[0], wrongPool, totalOptions);

    if (isDual && !options.includes(targetTypes[1])) {
      options[options.length - 1] = targetTypes[1];
    }

    options.sort(() => Math.random() - 0.5);

    const instructionKey = isDual ? 'dual' : 'single';

    return {
      id: 'type-quiz',
      instruction: {
        en: INSTRUCTIONS[instructionKey].en(capitalize(target.name.en)),
        es: INSTRUCTIONS[instructionKey].es(target.name.es),
      },
      component: 'TypeQuiz',
      props: {
        spriteUrl: target.spriteUrl,
        options,
        correctTypes: targetTypes,
        isDual,
      },
      validate: (selected) => {
        if (!Array.isArray(selected)) return false;
        return (
          selected.length === targetTypes.length &&
          targetTypes.every((t) => selected.includes(t))
        );
      },
    };
  },
});