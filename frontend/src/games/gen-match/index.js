// games/gen-match/index.js
// Minigame: given a generation number, pick the Pokemon that belongs to it.
// 4 Pokemon are shown as options — only one is from the correct generation.

import { registerGame } from '../registry.js';
import { getRandom, shuffle, capitalize } from '../../data/pokemonHelpers.js';

const INSTRUCTIONS = {
  en: (g) => `Pick a Gen ${g} Pokemon!`,
  es: (g) => `Elige un Pokemon de Gen ${g}!`,
};

registerGame({
  id: 'gen-match',
  title:         { en: 'Gen Match', es: 'Encuentra la generación' },
  category:      'generation',
  baseTimeMs:    5000,
  minDifficulty: 0,
  pokemonFilter: { excludeForms: true },

  build({ pokemon, lang }) {
    // Pick a target generation that has enough Pokemon
    const genCounts = {};
    pokemon.forEach((p) => { genCounts[p.generation] = (genCounts[p.generation] ?? 0) + 1; });
    const validGens = Object.keys(genCounts).filter((g) => genCounts[g] >= 4).map(Number);
    const targetGen = validGens[Math.floor(Math.random() * validGens.length)];

    const withGen    = pokemon.filter((p) => p.generation === targetGen);
    const withoutGen = pokemon.filter((p) => p.generation !== targetGen);

    const correct = getRandom(withGen);
    const wrong   = shuffle(withoutGen).slice(0, 3);

    const correctOption = {
      id: correct.id,
      name: lang === 'en' ? capitalize(correct.name.en) : correct.name.es,
      spriteUrl: correct.spriteUrl,
      isCorrect: true,
    };

    const wrongOptions = wrong.map((p) => ({
      id: p.id,
      name: lang === 'en' ? capitalize(p.name.en) : p.name.es,
      spriteUrl: p.spriteUrl,
      isCorrect: false,
    }));

    const options = shuffle([correctOption, ...wrongOptions]);

    return {
      id: 'gen-match',
      instruction: {
        en: INSTRUCTIONS.en(targetGen),
        es: INSTRUCTIONS.es(targetGen),
      },
      component: 'GenMatch',
      props: { options },
      validate: (selectedId) => selectedId === correct.id,
    };
  },
});