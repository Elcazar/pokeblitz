// games/bst-compare/index.js
// Minigame: which of these two Pokemon has a higher BST (base stat total)?
// Both Pokemon are chosen within a +-50 BST range to keep it challenging.

import { registerGame } from '../registry.js';
import { getRandom, capitalize } from '../../data/pokemonHelpers.js';

const INSTRUCTIONS = {
  en: 'Which has higher BST?',
  es: 'Cuál tiene mayor BST?',
};

const MAX_DIFF = 50;
const MAX_ATTEMPTS = 100;

function getBST(pokemon) {
  return Object.values(pokemon.stats).reduce((a, b) => a + b, 0);
}

registerGame({
  id: 'bst-compare',
  title:         { en: 'BST Compare', es: 'Compara BST' },
  category:      'stats',
  baseTimeMs:    6000,
  minDifficulty: 0,
  pokemonFilter: { excludeForms: true },

  build({ pokemon, lang }) {
    let pokemonA, pokemonB;
    let attempts = 0;

    do {
      pokemonA = getRandom(pokemon);
      const bstA = getBST(pokemonA);

      const candidates = pokemon.filter((p) => {
        if (p.id === pokemonA.id) return false;
        const diff = Math.abs(getBST(p) - bstA);
        return diff > 0 && diff <= MAX_DIFF;
      });

      if (candidates.length > 0) {
        pokemonB = candidates[Math.floor(Math.random() * candidates.length)];
      }

      attempts++;
    } while (!pokemonB && attempts < MAX_ATTEMPTS);

    if (!pokemonB) {
      pokemonB = pokemon.filter((p) => p.id !== pokemonA.id)[0];
    }

    const bstA = getBST(pokemonA);
    const bstB = getBST(pokemonB);
    const correctId = bstA >= bstB ? pokemonA.id : pokemonB.id;

    const nameA = lang === 'en' ? capitalize(pokemonA.name.en) : pokemonA.name.es;
    const nameB = lang === 'en' ? capitalize(pokemonB.name.en) : pokemonB.name.es;

    return {
      id: 'bst-compare',
      instruction: {
        en: INSTRUCTIONS.en,
        es: INSTRUCTIONS.es,
      },
      component: 'BSTCompare',
      props: {
        pokemonA: { id: pokemonA.id, name: nameA, spriteUrl: pokemonA.spriteUrl, bst: bstA },
        pokemonB: { id: pokemonB.id, name: nameB, spriteUrl: pokemonB.spriteUrl, bst: bstB },
        correctId,
      },
      validate: (selectedId) => selectedId === correctId,
    };
  },
});