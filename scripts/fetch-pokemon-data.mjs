// scripts/fetch-pokemon-data.mjs
// Run with: node scripts/fetch-pokemon-data.mjs
// Downloads Pokemon data from PokeAPI and saves it as a static JSON file.
// User-specific data (favorite Pokemon, etc.) is handled by the backend.

import fs from 'fs/promises';
import path from 'path';

const TOTAL_POKEMON = 1025;
const OUTPUT_PATH = './frontend/src/data/pokemon.json';
const DELAY_MS = 0.1;

const TYPE_TRANSLATIONS = {
  normal: 'normal', fire: 'fuego', water: 'agua', electric: 'electrico',
  grass: 'planta', ice: 'hielo', fighting: 'lucha', poison: 'veneno',
  ground: 'tierra', flying: 'volador', psychic: 'psiquico', bug: 'bicho',
  rock: 'roca', ghost: 'fantasma', dragon: 'dragon', dark: 'siniestro',
  steel: 'acero', fairy: 'hada',
};

const STAT_NAMES = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json();
}

function getSpanishName(names) {
  return names.find((n) => n.language.name === 'es')?.name ?? null;
}

function cleanText(text) {
  return text?.replace(/\n|\f/g, ' ') ?? '';
}

function getPokedexEntry(entries, lang) {
  return cleanText(entries.find((e) => e.language.name === lang)?.flavor_text);
}

async function getEvolutionChain(chainUrl) {
  const data = await fetchJSON(chainUrl);
  const ids = [];
  let current = data.chain;
  while (current) {
    const id = parseInt(current.species.url.split('/').filter(Boolean).pop());
    ids.push(id);
    current = current.evolves_to[0] ?? null;
  }
  return ids;
}

function extractIdFromUrl(url) {
  return parseInt(url.split('/').filter(Boolean).pop());
}

function extractStats(statsArray) {
  return Object.fromEntries(
    STAT_NAMES.map((name) => {
      const stat = statsArray.find((s) => s.stat.name === name);
      return [name, stat?.base_stat ?? 0];
    })
  );
}

// Cache ability translations to avoid refetching the same ability multiple times
const abilityCache = new Map();

async function getAbilityNames(abilityName) {
  if (abilityCache.has(abilityName)) {
    return abilityCache.get(abilityName);
  }

  try {
    const data = await fetchJSON(`https://pokeapi.co/api/v2/ability/${abilityName}`);
    const nameEs = data.names.find((n) => n.language.name === 'es')?.name ?? abilityName;
    const nameEn = data.names.find((n) => n.language.name === 'en')?.name ?? abilityName;
    const result = { en: nameEn, es: nameEs };
    abilityCache.set(abilityName, result);
    return result;
  } catch {
    const result = { en: abilityName, es: abilityName };
    abilityCache.set(abilityName, result);
    return result;
  }
}

async function fetchPokemon(id) {
  try {
    const [pokemon, species] = await Promise.all([
      fetchJSON(`https://pokeapi.co/api/v2/pokemon/${id}`),
      fetchJSON(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);

    const evolutionChain = await getEvolutionChain(species.evolution_chain.url);
    const typesEn = pokemon.types.map((t) => t.type.name);
    const typesEs = typesEn.map((t) => TYPE_TRANSLATIONS[t] ?? t);
    const eggGroups = species.egg_groups.map((g) => g.name);

    // Fetch ability names in both languages
    const abilities = await Promise.all(
      pokemon.abilities.map(async (a) => ({
        name: await getAbilityNames(a.ability.name),
        isHidden: a.is_hidden,
      }))
    );

    return {
      id,
      name: {
        en: pokemon.name,
        es: getSpanishName(species.names) ?? pokemon.name,
      },
      types: { en: typesEn, es: typesEs },
      generation: extractIdFromUrl(species.generation.url),
      evolutionChain,
      isLegendary: species.is_legendary,
      isMythical: species.is_mythical,
      eggGroups,
      stats: extractStats(pokemon.stats),
      abilities,
      pokedexEntry: {
        en: getPokedexEntry(species.flavor_text_entries, 'en'),
        es: getPokedexEntry(species.flavor_text_entries, 'es'),
      },
      spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      spriteShinyUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`,
    };
  } catch (err) {
    console.error(`Error on Pokemon #${id}:`, err.message);
    return null;
  }
}

async function main() {
  console.log(`Downloading data for ${TOTAL_POKEMON} Pokemon...`);
  const results = [];

  for (let id = 1; id <= TOTAL_POKEMON; id++) {
    process.stdout.write(`\r  Pokemon ${id}/${TOTAL_POKEMON}`);
    const data = await fetchPokemon(id);
    if (data) results.push(data);
    await sleep(DELAY_MS);
  }

  console.log(`\nDone: ${results.length} Pokemon downloaded`);
  console.log(`Ability cache size: ${abilityCache.size} unique abilities fetched`);
  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(results, null, 2));
  console.log(`Saved to ${OUTPUT_PATH}`);
}

main();
