// data/typeColors.js
// Official type colors based on the main series games.
// Keyed by both English and Spanish type names.

export const TYPE_COLORS = {
  // English
  normal:   '#A8A878',
  fire:     '#F08030',
  water:    '#6890F0',
  electric: '#F8D030',
  grass:    '#78C850',
  ice:      '#98D8D8',
  fighting: '#C03028',
  poison:   '#A040A0',
  ground:   '#E0C068',
  flying:   '#A890F0',
  psychic:  '#F85888',
  bug:      '#A8B820',
  rock:     '#B8A038',
  ghost:    '#705898',
  dragon:   '#7038F8',
  dark:     '#705848',
  steel:    '#B8B8D0',
  fairy:    '#EE99AC',

  // Spanish
  normal:    '#A8A878',
  fuego:     '#F08030',
  agua:      '#6890F0',
  electrico: '#F8D030',
  planta:    '#78C850',
  hielo:     '#98D8D8',
  lucha:     '#C03028',
  veneno:    '#A040A0',
  tierra:    '#E0C068',
  volador:   '#A890F0',
  psiquico:  '#F85888',
  bicho:     '#A8B820',
  roca:      '#B8A038',
  fantasma:  '#705898',
  dragon:    '#7038F8',
  siniestro: '#705848',
  acero:     '#B8B8D0',
  hada:      '#EE99AC',
};

/**
 * Returns the background color for a given type name.
 * Falls back to a neutral color if the type is not found.
 *
 * @param {string} type
 * @returns {string} hex color
 */
export function getTypeColor(type) {
  return TYPE_COLORS[type?.toLowerCase()] ?? '#6b6b8a';
}

/**
 * Returns a readable text color (black or white) based on the type background.
 *
 * @param {string} type
 * @returns {string}
 */
export function getTypeTextColor(type) {
  const lightTypes = ['electric', 'electrico', 'ground', 'tierra', 'ice', 'hielo', 'normal', 'steel', 'acero'];
  return lightTypes.includes(type?.toLowerCase()) ? '#1a1a1a' : '#ffffff';
}