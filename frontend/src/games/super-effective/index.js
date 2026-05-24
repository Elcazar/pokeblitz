// games/super-effective/index.js
// Minigame: pick the move that hits the shown Pokemon super effectively.
// Exactly one of the 4 options is super effective.
// Pokemon with type-immunity abilities are excluded to avoid ambiguity.

import { registerGame } from '../registry.js';
import { getRandom, capitalize, shuffle } from '../../data/pokemonHelpers.js';
import { getEffectiveness } from '../../data/typeChart.js';
import { MOVES, MOVES_BY_TYPE } from '../../data/moves.js';
import { IMMUNE_POKEMON_IDS } from '../../data/immuneAbilities.js';

const INSTRUCTIONS = {
  en: (name) => `Hit ${name} super effectively!`,
  es: (name) => `Golpea a ${name} supereficaz!`,
};

/**
 * Returns true if a move type is super effective against ALL of the defender's types
 * and not immune to any of them.
 */
function isSuperEffective(moveType, defenderTypes) {
  const multiplier = defenderTypes.reduce((acc, defType) => {
    return acc * getEffectiveness(moveType, defType);
  }, 1);
  return multiplier >= 2;
}

/**
 * Returns true if a move type is NOT super effective against the defender.
 */
function isNotSuperEffective(moveType, defenderTypes) {
  return !isSuperEffective(moveType, defenderTypes);
}

registerGame({
  id: 'super-effective',
  title:         { en: 'Super Effective!', es: 'Supereficaz!' },
  category:      'types',
  baseTimeMs:    6000,
  minDifficulty: 0,
  pokemonFilter: { excludeForms: true },

  build({ pokemon, lang }) {
    // Exclude Pokemon with immunity abilities
    const pool = pokemon.filter((p) => !IMMUNE_POKEMON_IDS.has(p.id));
    const target = getRandom(pool);
    const defenderTypes = target.types.en;

    // Find all move types that are super effective against this Pokemon
    const superEffectiveTypes = Object.keys(MOVES_BY_TYPE).filter((type) =>
      isSuperEffective(type, defenderTypes)
    );

    if (superEffectiveTypes.length === 0) {
      // Fallback: retry with another Pokemon (e.g. Normal/Ghost has no weaknesses)
      return this.build({ pokemon, lang });
    }

    // Pick one super effective move as the correct answer
    const correctType = superEffectiveTypes[Math.floor(Math.random() * superEffectiveTypes.length)];
    const correctMove = getRandom(MOVES_BY_TYPE[correctType]);

    // Pick 3 wrong moves — types that are NOT super effective against this Pokemon
    const wrongTypes = Object.keys(MOVES_BY_TYPE).filter((type) =>
      isNotSuperEffective(type, defenderTypes) && type !== correctType
    );

    const wrongMoves = shuffle(wrongTypes)
      .slice(0, 3)
      .map((type) => getRandom(MOVES_BY_TYPE[type]));

    const options = shuffle([correctMove, ...wrongMoves]);

    const displayName = lang === 'en' ? capitalize(target.name.en) : target.name.es;

    return {
      id: 'super-effective',
      instruction: {
        en: INSTRUCTIONS.en(displayName),
        es: INSTRUCTIONS.es(displayName),
      },
      component: 'SuperEffective',
      props: {
        spriteUrl: target.spriteUrl,
        options,
        correctMove,
        lang,
      },
      validate: (moveName) => moveName === correctMove.name.en,
    };
  },
});