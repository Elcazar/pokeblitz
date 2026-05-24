// games/ability-quiz/index.js
// Minigame: given a Pokemon sprite and name, pick one of its real abilities.
// All abilities (including hidden) are valid correct answers.
// Wrong options are abilities that the Pokemon cannot have at all.

import { registerGame } from '../registry.js';
import { getRandom, shuffle, capitalize } from '../../data/pokemonHelpers.js';

const INSTRUCTIONS = {
  en: (name) => `What ability can ${name} have?`,
  es: (name) => `Qué habilidad puede tener ${name}?`,
};

registerGame({
  id: 'ability-quiz',
  title:         { en: 'Ability Quiz', es: 'Adivina la habilidad' },
  category:      'abilities',
  baseTimeMs:    6000,
  minDifficulty: 0,
  pokemonFilter: { excludeForms: true },

  build({ pokemon, lang }) {
    const pool = pokemon.filter((p) => p.abilities.length > 0);
    const target = getRandom(pool);

    const targetAbilityNames = new Set(target.abilities.map((a) => a.name.en));
    const correctAbility = target.abilities[Math.floor(Math.random() * target.abilities.length)];
    const correctName = correctAbility.name[lang];

    const wrongPool = [...new Set(
      pokemon
        .flatMap((p) => p.abilities)
        .filter((a) => !targetAbilityNames.has(a.name.en))
        .map((a) => a.name[lang])
    )];

    const wrongOptions = shuffle(wrongPool).slice(0, 3);
    const options = shuffle([correctName, ...wrongOptions]);

    const displayName = lang === 'en' ? capitalize(target.name.en) : target.name.es;

    return {
      id: 'ability-quiz',
      instruction: {
        en: INSTRUCTIONS.en(displayName),
        es: INSTRUCTIONS.es(displayName),
      },
      component: 'AbilityQuiz',
      props: {
        spriteUrl: target.spriteUrl,
        options,
      },
      validate: (selected) => selected === correctName,
    };
  },
});