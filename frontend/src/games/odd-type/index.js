// games/odd-type/index.js
// Minigame: 4 Pokemon are shown in a 2x2 grid.
// 3 share a common type, 1 does not have that type at all.
// The player must tap the odd one out.

import { registerGame } from '../registry.js';
import { getRandom, getRandomN, shuffle, capitalize } from '../../data/pokemonHelpers.js';

const INSTRUCTIONS = {
  en: 'Tap the odd one out!',
  es: 'Toca el que no encaja!',
};

registerGame({
  id: 'odd-type',
  title:         { en: 'Odd Type', es: 'El intruso' },
  category:      'types',
  baseTimeMs:    6000,
  minDifficulty: 0,
  pokemonFilter: {},

  build({ pokemon, lang }) {
    // Pick a random common type from the full dataset (using English internally)
    const allTypes = [...new Set(pokemon.flatMap((p) => p.types.en))];
    const commonType = allTypes[Math.floor(Math.random() * allTypes.length)];

    // Pool of Pokemon that have the common type
    const withType = pokemon.filter((p) => p.types.en.includes(commonType));
    // Pool of Pokemon that do NOT have the common type at all
    const withoutType = pokemon.filter((p) => !p.types.en.includes(commonType));

    if (withType.length < 3 || withoutType.length < 1) {
      // Fallback: retry with a different type (shouldn't happen with full dataset)
      return this.build({ pokemon, lang });
    }

    const three = getRandomN(withType, 3);
    const threeTypes = new Set(three.flatMap((p) => p.types.en));

    // The odd one must not share any type that appears 2+ times among the three.
    // This prevents ambiguity with dual-type Pokemon.
    const typeCounts = {};
    three.forEach((p) => p.types.en.forEach((t) => {
      typeCounts[t] = (typeCounts[t] ?? 0) + 1;
    }));
    const ambiguousTypes = new Set(Object.keys(typeCounts).filter((t) => typeCounts[t] >= 2));

    const validOddPool = withoutType.filter((p) =>
      !p.types.en.some((t) => ambiguousTypes.has(t))
    );

    if (validOddPool.length === 0) {
      return this.build({ pokemon, lang });
    }

    const oddOne = getRandom(validOddPool);

    const options = shuffle([...three, oddOne]).map((p) => ({
      id: p.id,
      name: lang === 'en' ? capitalize(p.name.en) : p.name.es,
      spriteUrl: p.spriteUrl,
      isOdd: p.id === oddOne.id,
    }));

    return {
      id: 'odd-type',
      instruction: {
        en: INSTRUCTIONS.en,
        es: INSTRUCTIONS.es,
      },
      component: 'OddType',
      props: { options },
      validate: (selectedId) => {
        const selected = options.find((o) => o.id === selectedId);
        return selected?.isOdd === true;
      },
    };
  },
});