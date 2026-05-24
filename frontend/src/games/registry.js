// games/registry.js
// Central registry for all microgames.
//
// MicrogameDefinition {
//   id             : string
//   title          : { en: string, es: string }
//   category       : string                         - free-form tag e.g. 'types', 'names', 'moves'
//   baseTimeMs     : number                         - base time limit for this game in ms
//   pokemonFilter  : { generations?: number[], types?: string[] }  - optional dataset filter
//   minDifficulty  : number                         - 0-1, minimum normalized difficulty to include
//   build          : (params: BuildParams) => MicrogameInstance
// }
//
// BuildParams {
//   pokemon    : object[]   - already filtered dataset
//   allPokemon : object[]   - full unfiltered dataset (for building wrong options)
//   lang       : 'en' | 'es'
//   difficulty : number     - normalized 0-1
// }
//
// MicrogameInstance {
//   id          : string
//   instruction : { en: string, es: string }
//   component   : string
//   props       : object
//   validate    : (answer: any) => boolean
//   baseTimeMs  : number    - passed through from definition for the engine to use
// }

import { filterPokemon } from '../data/pokemonHelpers.js';

const registry = new Map();

/**
 * Registers a microgame definition.
 *
 * @param {object} definition - MicrogameDefinition
 */
export function registerGame(definition) {
  if (registry.has(definition.id)) {
    console.warn(`Microgame "${definition.id}" is already registered and will be overwritten.`);
  }
  registry.set(definition.id, definition);
}

/**
 * Returns all registered microgame definitions.
 *
 * @returns {object[]}
 */
export function getAllGames() {
  return Array.from(registry.values());
}

/**
 * Returns a random microgame instance, filtered by difficulty.
 *
 * @param {{ pokemon: object[], lang: string, difficulty: number }} params
 * @returns {object} MicrogameInstance
 */
export function getRandomGame({ pokemon, lang, difficulty }) {
  const eligible = getAllGames().filter(
    (def) => (def.minDifficulty ?? 0) <= difficulty
  );

  if (eligible.length === 0) {
    throw new Error('No eligible microgames found for the current difficulty.');
  }

  const definition = eligible[Math.floor(Math.random() * eligible.length)];

  // Apply the game's own Pokemon filter, falling back to the full dataset for wrong options
  const filteredPokemon = filterPokemon(pokemon, definition.pokemonFilter ?? {});

  const instance = definition.build({
    pokemon: filteredPokemon,
    allPokemon: pokemon,
    lang,
    difficulty,
  });

  // Attach baseTimeMs to the instance so the engine can use it
  return {
    ...instance,
    baseTimeMs: definition.baseTimeMs,
  };
}

/**
 * Returns a specific microgame instance by id.
 * Useful for testing during development.
 *
 * @param {string} id
 * @param {{ pokemon: object[], lang: string, difficulty: number }} params
 * @returns {object} MicrogameInstance
 */
export function getGameById(id, { pokemon, lang, difficulty }) {
  const definition = registry.get(id);
  if (!definition) throw new Error(`Microgame "${id}" not found in registry.`);

  const filteredPokemon = filterPokemon(pokemon, definition.pokemonFilter ?? {});

  const instance = definition.build({
    pokemon: filteredPokemon,
    allPokemon: pokemon,
    lang,
    difficulty,
  });

  return { ...instance, baseTimeMs: definition.baseTimeMs };
}