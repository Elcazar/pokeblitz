// games/count-type/index.js
// Minigame: shown 6 Pokemon, tap all that match the given type.
// At least 1 Pokemon of the type is guaranteed.
// Validated by pressing OK — not auto-submitted.

import { registerGame } from '../registry.js';
import { getRandom, getRandomN, shuffle, capitalize } from '../../data/pokemonHelpers.js';

const TYPE_NAME_ES = {
  normal: 'Normal', fire: 'Fuego', water: 'Agua', electric: 'Electrico',
  grass: 'Planta', ice: 'Hielo', fighting: 'Lucha', poison: 'Veneno',
  ground: 'Tierra', flying: 'Volador', psychic: 'Psiquico', bug: 'Bicho',
  rock: 'Roca', ghost: 'Fantasma', dragon: 'Dragon', dark: 'Siniestro',
  steel: 'Acero', fairy: 'Hada',
};

const INSTRUCTIONS = {
  en: (type) => `Tap all ${type} type Pokemon!`,
  es: (type) => `Toca todos los Pokemon de tipo ${type}!`,
};

registerGame({
  id: 'count-type',
  title:         { en: 'Count the Type', es: 'Cuenta el tipo' },
  category:      'types',
  baseTimeMs:    9000,
  minDifficulty: 0,
  pokemonFilter: { excludeForms: true },

  build({ pokemon, lang }) {
    // Pick a random type
    const allTypes = [...new Set(pokemon.flatMap((p) => p.types.en))];
    const targetType = allTypes[Math.floor(Math.random() * allTypes.length)];

    const withType    = pokemon.filter((p) => p.types.en.includes(targetType));
    const withoutType = pokemon.filter((p) => !p.types.en.includes(targetType));

    // Pick 1-3 Pokemon of the target type, rest are fillers
    const matchCount = Math.floor(Math.random() * 3) + 1; // 1, 2 or 3
    const matches    = getRandomN(withType, matchCount);
    const fillers    = getRandomN(withoutType, 6 - matchCount);

    const cards = shuffle([...matches, ...fillers]).map((p) => ({
      id: p.id,
      spriteUrl: p.spriteUrl,
      isMatch: p.types.en.includes(targetType),
    }));

    const typeName = lang === 'en'
      ? targetType.charAt(0).toUpperCase() + targetType.slice(1)
      : (TYPE_NAME_ES[targetType] ?? targetType);

    return {
      id: 'count-type',
      instruction: {
        en: INSTRUCTIONS.en(typeName),
        es: INSTRUCTIONS.es(typeName),
      },
      component: 'CountType',
      props: {
        cards,
        targetType,
      },
      validate: (selectedIds) => {
        const correctIds = cards.filter((c) => c.isMatch).map((c) => c.id);
        return (
          selectedIds.length === correctIds.length &&
          correctIds.every((id) => selectedIds.includes(id))
        );
      },
    };
  },
});