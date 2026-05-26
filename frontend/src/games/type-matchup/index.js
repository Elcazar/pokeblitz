// games/type-matchup/index.js
// Minigame: given an attacking type vs a defending type, pick the effectiveness.
// Always shows all 4 options: super effective, normal, not very effective, no effect.

import { registerGame } from '../registry.js';
import { getEffectiveness, getEffectivenessKey, ALL_TYPES } from '../../data/typeChart.js';
import { getTypeColor, getTypeTextColor } from '../../data/typeColors.js';
import { shuffle } from '../../data/pokemonHelpers.js';

const EFFECTIVENESS_LABELS = {
  super:    { en: 'Super effective!', es: 'Super eficaz!' },
  normal:   { en: 'Normal',           es: 'Normal' },
  not_very: { en: 'Not very effective', es: 'Poco eficaz' },
  immune:   { en: 'No effect',        es: 'No afecta' },
};

const ALL_KEYS = ['super', 'normal', 'not_very', 'immune'];

const INSTRUCTIONS = {
  en: (atk, def) => `${atk} attacks ${def}...`,
  es: (atk, def) => `${atk} ataca a ${def}...`,
};

// Spanish type name translations (for display only)
const TYPE_NAME_ES = {
  normal: 'Normal', fire: 'Fuego', water: 'Agua', electric: 'Electrico',
  grass: 'Planta', ice: 'Hielo', fighting: 'Lucha', poison: 'Veneno',
  ground: 'Tierra', flying: 'Volador', psychic: 'Psiquico', bug: 'Bicho',
  rock: 'Roca', ghost: 'Fantasma', dragon: 'Dragon', dark: 'Siniestro',
  steel: 'Acero', fairy: 'Hada',
};

function getTypeName(type, lang) {
  return lang === 'es' ? (TYPE_NAME_ES[type] ?? type) : type.charAt(0).toUpperCase() + type.slice(1);
}

registerGame({
  id: 'type-matchup',
  title:         { en: 'Type Matchup', es: 'Efectividad de tipos' },
  category:      'types',
  baseTimeMs:    6000,
  minDifficulty: 0,
  pokemonFilter: {},

  build({ lang }) {
    const attacking = ALL_TYPES[Math.floor(Math.random() * ALL_TYPES.length)];
    const defending = ALL_TYPES[Math.floor(Math.random() * ALL_TYPES.length)];

    const multiplier = getEffectiveness(attacking, defending);
    const correctKey = getEffectivenessKey(multiplier);

    const options = shuffle(ALL_KEYS).map((key) => ({
      key,
      label: EFFECTIVENESS_LABELS[key][lang],
    }));

    const atkName = getTypeName(attacking, lang);
    const defName = getTypeName(defending, lang);

    return {
      id: 'type-matchup',
      instruction: {
        en: INSTRUCTIONS.en(atkName, defName),
        es: INSTRUCTIONS.es(atkName, defName),
      },
      component: 'TypeMatchup',
      props: {
        attacking,
        defending,
        options,
        correctKey,
        lang,
      },
      validate: (selectedKey) => selectedKey === correctKey,
    };
  },
});