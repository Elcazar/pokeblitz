// games/egg-group/index.js
// Minigame: given a Pokemon, pick one it can breed with.
// Excludes undiscovered and ditto egg groups to keep it fair.
// The correct answer shares at least one egg group with the target.

import { registerGame } from '../registry.js';
import { getRandom, shuffle, capitalize } from '../../data/pokemonHelpers.js';

const EXCLUDED_EGG_GROUPS = new Set(['undiscovered', 'no-eggs', 'ditto']);

const INSTRUCTIONS = {
  en: (name) => `Who can ${name} breed with?`,
  es: (name) => `Con quién puede criar ${name}?`,
};

function isBreedable(pokemon) {
  return pokemon.eggGroups?.length > 0 &&
    !pokemon.eggGroups.some((g) => EXCLUDED_EGG_GROUPS.has(g));
}

function sharesEggGroup(a, b) {
  return a.eggGroups.some((g) =>
    !EXCLUDED_EGG_GROUPS.has(g) && b.eggGroups.includes(g)
  );
}

registerGame({
  id: 'egg-group',
  title:         { en: 'Egg Group', es: 'Grupo Huevo' },
  category:      'breeding',
  baseTimeMs:    6000,
  minDifficulty: 0,
  pokemonFilter: { excludeForms: true },

  build({ pokemon, lang }) {
    const breedablePool = pokemon.filter(isBreedable);

    const target = getRandom(breedablePool);

    // Compatible: shares at least one non-excluded egg group
    const compatible = breedablePool.filter(
      (p) => p.id !== target.id && sharesEggGroup(target, p)
    );

    // Incompatible: shares no egg group with target
    const incompatible = breedablePool.filter(
      (p) => p.id !== target.id && !sharesEggGroup(target, p)
    );

    if (compatible.length === 0 || incompatible.length < 3) {
      return this.build({ pokemon, lang });
    }

    const correctOption = getRandom(compatible);
    const wrongOptions  = shuffle(incompatible).slice(0, 3);

    const makeOption = (p, isCorrect) => ({
      id: p.id,
      name: lang === 'en' ? capitalize(p.name.en) : p.name.es,
      spriteUrl: p.spriteUrl,
      isCorrect,
    });

    const options = shuffle([
      makeOption(correctOption, true),
      ...wrongOptions.map((p) => makeOption(p, false)),
    ]);

    const displayName = lang === 'en' ? capitalize(target.name.en) : target.name.es;

    return {
      id: 'egg-group',
      instruction: {
        en: INSTRUCTIONS.en(displayName),
        es: INSTRUCTIONS.es(displayName),
      },
      component: 'EggGroup',
      props: {
        spriteUrl: target.spriteUrl,
        options,
      },
      validate: (selectedId) => selectedId === correctOption.id,
    };
  },
});