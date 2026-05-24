// games/stat-compare/index.js
// Minigame: does Pokemon A have higher or lower [stat] than Pokemon B?
// The two Pokemon are chosen so their stat values are within a +-50 range
// to keep it challenging but fair.

import { registerGame } from '../registry.js';
import { getRandom, getRandomExcluding, capitalize } from '../../data/pokemonHelpers.js';

const STAT_LABELS = {
  'hp':              { en: 'HP',              es: 'PS'         },
  'attack':          { en: 'Attack',          es: 'Ataque'     },
  'defense':         { en: 'Defense',         es: 'Defensa'    },
  'special-attack':  { en: 'Sp. Attack',      es: 'Atq. Esp.'  },
  'special-defense': { en: 'Sp. Defense',     es: 'Def. Esp.'  },
  'speed':           { en: 'Speed',           es: 'Velocidad'  },
};

const STAT_KEYS = Object.keys(STAT_LABELS);

const INSTRUCTIONS = {
  en: (name, stat) => `Does ${name} have higher ${stat}?`,
  es: (name, stat) => `¿Tiene ${name} más ${stat}?`,
};

const MAX_DIFF = 50;
const MAX_ATTEMPTS = 100;

registerGame({
  id: 'stat-compare',
  title:         { en: 'Stat Compare', es: 'Compara stats' },
  category:      'stats',
  baseTimeMs:    7000,
  minDifficulty: 0,
  pokemonFilter: { excludeForms: true },

  build({ pokemon, lang }) {
    const stat = STAT_KEYS[Math.floor(Math.random() * STAT_KEYS.length)];
    const statLabel = STAT_LABELS[stat][lang];

    // Pick pokemon A, then find a pokemon B whose stat is within +-50
    let pokemonA, pokemonB;
    let attempts = 0;

    do {
      pokemonA = getRandom(pokemon);
      const statA = pokemonA.stats[stat];
      const candidates = pokemon.filter((p) => {
        if (p.id === pokemonA.id) return false;
        const diff = Math.abs(p.stats[stat] - statA);
        return diff > 0 && diff <= MAX_DIFF;
      });

      if (candidates.length > 0) {
        pokemonB = candidates[Math.floor(Math.random() * candidates.length)];
      }

      attempts++;
    } while (!pokemonB && attempts < MAX_ATTEMPTS);

    if (!pokemonB) {
      // Fallback without range constraint
      pokemonB = getRandomExcluding(pokemon, pokemonA.id, 1)[0];
    }

    const nameA = lang === 'en' ? capitalize(pokemonA.name.en) : pokemonA.name.es;
    const nameB = lang === 'en' ? capitalize(pokemonB.name.en) : pokemonB.name.es;
    const statA = pokemonA.stats[stat];
    const statB = pokemonB.stats[stat];
    const correctAnswer = statA > statB; // true = higher, false = lower or equal

    const OPTIONS = {
      en: { higher: 'Higher', lower: 'Lower or equal' },
      es: { higher: 'Mayor',  lower: 'Menor o igual'  },
    };

    return {
      id: 'stat-compare',
      instruction: {
        en: INSTRUCTIONS.en(nameA, statLabel),
        es: INSTRUCTIONS.es(nameA, statLabel),
      },
      component: 'StatCompare',
      props: {
        pokemonA: { name: nameA, spriteUrl: pokemonA.spriteUrl },
        pokemonB: { name: nameB, spriteUrl: pokemonB.spriteUrl },
        statLabel,
        options: OPTIONS[lang],
      },
      validate: (answer) => answer === correctAnswer,
    };
  },
});