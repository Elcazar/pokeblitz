// games/gen-quiz/index.js
// Minigame: given a Pokemon sprite and name, pick its generation.
// 4 options are shown — always includes the correct generation.

import { registerGame } from '../registry.js';
import { getRandom, shuffle, capitalize } from '../../data/pokemonHelpers.js';

const GEN_LABELS = {
  en: (g) => `Gen ${g}`,
  es: (g) => `Gen ${g}`,
};

const INSTRUCTIONS = {
  en: (name) => `What generation is ${name} from?`,
  es: (name) => `De qué generación es ${name}?`,
};

const ALL_GENS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

registerGame({
  id: 'gen-quiz',
  title:         { en: 'Gen Quiz', es: 'Adivina la generación' },
  category:      'generation',
  baseTimeMs:    5000,
  minDifficulty: 0,
  pokemonFilter: { excludeForms: true },

  build({ pokemon, lang }) {
    const target = getRandom(pokemon);
    const correctGen = target.generation;
    const displayName = lang === 'en' ? capitalize(target.name.en) : target.name.es;

    const wrongGens = shuffle(ALL_GENS.filter((g) => g !== correctGen)).slice(0, 3);
    const options = shuffle([correctGen, ...wrongGens]).map((g) => ({
      value: g,
      label: GEN_LABELS[lang](g),
    }));

    return {
      id: 'gen-quiz',
      instruction: {
        en: INSTRUCTIONS.en(displayName),
        es: INSTRUCTIONS.es(displayName),
      },
      component: 'GenQuiz',
      props: {
        spriteUrl: target.spriteUrl,
        options,
        correctGen,
      },
      validate: (selected) => selected === correctGen,
    };
  },
});