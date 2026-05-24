// games/evo-order/index.js
// Minigame: put a 3-stage evolution chain in the correct order.
// Only chains with exactly 3 members are used.
// The player taps to select and tap again to swap. Submits via button.

import { registerGame } from '../registry.js';
import { shuffle, capitalize } from '../../data/pokemonHelpers.js';

const INSTRUCTIONS = {
  en: 'Order the evolution chain!',
  es: 'Ordena la cadena evolutiva!',
};

registerGame({
  id: 'evo-order',
  title:         { en: 'Evolution Order', es: 'Orden evolutivo' },
  category:      'evolution',
  baseTimeMs:    10000,
  minDifficulty: 0,
  pokemonFilter: { excludeForms: true },

  build({ pokemon, lang }) {
    // Build a map of id -> pokemon for fast lookup
    const pokemonById = Object.fromEntries(pokemon.map((p) => [p.id, p]));

    // Find all valid 3-stage chains where all 3 members exist in the dataset
    const chains = [];
    const seen = new Set();

    for (const p of pokemon) {
      if (p.evolutionChain?.length === 3) {
        const key = p.evolutionChain.join('-');
        if (!seen.has(key)) {
          const members = p.evolutionChain.map((id) => pokemonById[id]).filter(Boolean);
          if (members.length === 3) {
            chains.push(members);
            seen.add(key);
          }
        }
      }
    }

    if (chains.length === 0) {
      throw new Error('No valid 3-stage evolution chains found.');
    }

    const chain = chains[Math.floor(Math.random() * chains.length)];

    // Shuffle until not in correct order
    let shuffled;
    do {
      shuffled = shuffle(chain);
    } while (shuffled.every((p, i) => p.id === chain[i].id));

    const options = shuffled.map((p, i) => ({
      id: p.id,
      name: lang === 'en' ? capitalize(p.name.en) : p.name.es,
      spriteUrl: p.spriteUrl,
      position: i,
    }));

    const correctOrder = chain.map((p) => p.id);

    return {
      id: 'evo-order',
      instruction: {
        en: INSTRUCTIONS.en,
        es: INSTRUCTIONS.es,
      },
      component: 'EvoOrder',
      props: {
        options,
        correctOrder,
      },
      validate: (order) =>
        Array.isArray(order) &&
        order.length === 3 &&
        order.every((id, i) => id === correctOrder[i]),
    };
  },
});