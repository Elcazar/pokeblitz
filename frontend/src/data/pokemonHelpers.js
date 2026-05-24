// data/pokemonHelpers.js
// Utility functions for querying the static Pokemon dataset.
// Import pokemon.json and pass it into these functions.

/**
 * Returns a random Pokemon from the dataset.
 *
 * @param {object[]} pokemon
 * @returns {object}
 */
export function getRandom(pokemon) {
  return pokemon[Math.floor(Math.random() * pokemon.length)];
}

/**
 * Returns n unique random Pokemon from the dataset.
 *
 * @param {object[]} pokemon
 * @param {number} n
 * @returns {object[]}
 */
export function getRandomN(pokemon, n) {
  const shuffled = [...pokemon].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

/**
 * Returns n unique random Pokemon excluding a specific id.
 *
 * @param {object[]} pokemon
 * @param {number} excludeId
 * @param {number} n
 * @returns {object[]}
 */
export function getRandomExcluding(pokemon, excludeId, n) {
  const pool = pokemon.filter((p) => p.id !== excludeId);
  return getRandomN(pool, n);
}

/**
 * Returns all unique types present in the dataset for a given language.
 *
 * @param {object[]} pokemon
 * @param {'en' | 'es'} lang
 * @returns {string[]}
 */
export function getAllTypes(pokemon, lang) {
  const types = new Set();
  pokemon.forEach((p) => p.types[lang].forEach((t) => types.add(t)));
  return Array.from(types);
}

/**
 * Returns all Pokemon that share at least one type with the given type list.
 *
 * @param {object[]} pokemon
 * @param {string[]} types - types in the current language
 * @param {'en' | 'es'} lang
 * @returns {object[]}
 */
export function getByType(pokemon, types, lang) {
  return pokemon.filter((p) =>
    p.types[lang].some((t) => types.includes(t))
  );
}

/**
 * Returns all legendary Pokemon.
 *
 * @param {object[]} pokemon
 * @returns {object[]}
 */
export function getLegendaries(pokemon) {
  return pokemon.filter((p) => p.isLegendary || p.isMythical);
}

/**
 * Returns all non-legendary, non-mythical Pokemon.
 *
 * @param {object[]} pokemon
 * @returns {object[]}
 */
export function getRegular(pokemon) {
  return pokemon.filter((p) => !p.isLegendary && !p.isMythical);
}

/**
 * Returns Pokemon filtered by generation.
 *
 * @param {object[]} pokemon
 * @param {number} gen
 * @returns {object[]}
 */
export function getByGeneration(pokemon, gen) {
  return pokemon.filter((p) => p.generation === gen);
}

/**
 * Shuffles an array of options and returns them.
 * Used by microgames to randomize answer order.
 *
 * @param {any[]} arr
 * @returns {any[]}
 */
export function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

/**
 * Builds a multiple choice option list with one correct answer
 * and n-1 random wrong answers from a pool.
 *
 * @param {any} correct - the correct answer
 * @param {any[]} pool  - pool of possible wrong answers (will be filtered)
 * @param {number} total - total number of options (default 4)
 * @returns {any[]} shuffled options including the correct answer
 */
export function buildOptions(correct, pool, total = 4) {
  const wrong = pool
    .filter((item) => String(item) !== String(correct))
    .sort(() => Math.random() - 0.5)
    .slice(0, total - 1);

  return shuffle([correct, ...wrong]);
}

/**
 * Filters a Pokemon dataset based on a filter definition.
 * All filter fields are optional — omitting a field means no filtering on that axis.
 *
 * Filter shape:
 * {
 *   generations?: number[]   - only include these generations
 *   types?: string[]         - only include Pokemon with at least one matching type (English names)
 * }
 *
 * @param {object[]} pokemon
 * @param {object} filter
 * @returns {object[]}
 */
export function filterPokemon(pokemon, filter = {}) {
  let pool = pokemon;

  if (filter.generations?.length) {
    pool = pool.filter((p) => filter.generations.includes(p.generation));
  }

  if (filter.types?.length) {
    pool = pool.filter((p) =>
      p.types.en.some((t) => filter.types.includes(t))
    );
  }

  // Exclude alternate forms (names containing a dash, e.g. rotom-wash)
  if (filter.excludeForms) {
    pool = pool.filter((p) => !p.name.en.includes('-'));
  }

  if (pool.length === 0) {
    console.warn('filterPokemon: filter returned 0 results, falling back to full dataset.', filter);
    return pokemon;
  }

  return pool;
}

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str
 * @returns {string}
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}