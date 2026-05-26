// games/ability-match/index.js
// Minigame: given an ability name, pick the Pokemon that can have it.
// All abilities (including hidden) are valid.
// Wrong options are Pokemon that do NOT have any of the target Pokemon's abilities.

import { registerGame } from '../registry.js';
import { getRandom, shuffle, capitalize } from '../../data/pokemonHelpers.js';

const INSTRUCTIONS = {
  en: (ability) => `Who can have "${ability}"?`,
  es: (ability) => `Quién puede tener "${ability}"?`,
};

registerGame({
  id: 'ability-match',
  title:         { en: 'Ability Match', es: 'Encuentra la habilidad' },
  category:      'abilities',
  baseTimeMs:    6000,
  minDifficulty: 0,
  pokemonFilter: { excludeForms: true },

  build({ pokemon, lang }) {
    const pool = pokemon.filter((p) => p.abilities.length > 0);
    const target = getRandom(pool);

    // Pick a random ability from this Pokemon
    const correctAbility = target.abilities[Math.floor(Math.random() * target.abilities.length)];
    const abilityName = correctAbility.name[lang];

    // All ability names the target Pokemon can have
    const targetAbilityNames = new Set(target.abilities.map((a) => a.name.en));

    // Wrong options: Pokemon that share NONE of the target's abilities
    const withoutAnyAbility = pokemon.filter((p) =>
      p.id !== target.id &&
      !p.abilities.some((a) => targetAbilityNames.has(a.name.en))
    );

    const wrongPokemon = shuffle(withoutAnyAbility).slice(0, 3);

    const correctOption = {
      id: target.id,
      name: lang === 'en' ? capitalize(target.name.en) : target.name.es,
      spriteUrl: target.spriteUrl,
      isCorrect: true,
    };

    const wrongOptions = wrongPokemon.map((p) => ({
      id: p.id,
      name: lang === 'en' ? capitalize(p.name.en) : p.name.es,
      spriteUrl: p.spriteUrl,
      isCorrect: false,
    }));

    const options = shuffle([correctOption, ...wrongOptions]);

    return {
      id: 'ability-match',
      instruction: {
        en: INSTRUCTIONS.en(abilityName),
        es: INSTRUCTIONS.es(abilityName),
      },
      component: 'AbilityMatch',
      props: {
        abilityName,
        options,
      },
      validate: (selectedId) => selectedId === target.id,
    };
  },
});