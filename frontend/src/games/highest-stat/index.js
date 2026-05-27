// games/highest-stat/index.js
// Minigame: given a Pokemon sprite and name, pick its highest base stat.
// If two stats are tied, both are considered correct.

import { registerGame } from '../registry.js';
import { getRandom, capitalize } from '../../data/pokemonHelpers.js';

const STAT_LABELS = {
  en: {
    'hp':              'HP',
    'attack':          'Attack',
    'defense':         'Defense',
    'special-attack':  'Sp. Atk',
    'special-defense': 'Sp. Def',
    'speed':           'Speed',
  },
  es: {
    'hp':              'PS',
    'attack':          'Ataque',
    'defense':         'Defensa',
    'special-attack':  'Atq. Esp.',
    'special-defense': 'Def. Esp.',
    'speed':           'Velocidad',
  },
};

const INSTRUCTIONS = {
  en: (name) => `What is ${name}'s highest stat?`,
  es: (name) => `Cuál es el stat más alto de ${name}?`,
};

registerGame({
  id: 'highest-stat',
  title:         { en: 'Highest Stat', es: 'Stat más alto' },
  category:      'stats',
  baseTimeMs:    6000,
  minDifficulty: 0,
  pokemonFilter: { excludeForms: true },

  build({ pokemon, lang }) {
    const finalStage = pokemon.filter((p) => {
    const chain = p.evolutionChain;
    return chain[chain.length - 1] === p.id;
    });
    const target = getRandom(finalStage);
    const displayName = lang === 'en' ? capitalize(target.name.en) : target.name.es;

    const statEntries = Object.entries(target.stats);
    const maxValue = Math.max(...statEntries.map(([, v]) => v));
    const correctStats = statEntries
      .filter(([, v]) => v === maxValue)
      .map(([k]) => k);

    const options = statEntries.map(([key]) => ({
      key,
      label: STAT_LABELS[lang][key],
      isCorrect: correctStats.includes(key),
    }));

    return {
      id: 'highest-stat',
      instruction: {
        en: INSTRUCTIONS.en(displayName),
        es: INSTRUCTIONS.es(displayName),
      },
      component: 'HighestStat',
      props: {
        spriteUrl: target.spriteUrl,
        options,
        correctStats,
      },
      validate: (selectedKey) => correctStats.includes(selectedKey),
    };
  },
});