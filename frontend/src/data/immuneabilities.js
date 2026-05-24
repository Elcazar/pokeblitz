// data/immuneAbilities.js
// Pokemon IDs to exclude from the super-effective minigame.
// These have abilities that grant immunity to a type, which would make
// the correct answer ambiguous or wrong (e.g. Levitate makes Ground immune).
//
// Grouped by the immunity they grant for documentation purposes.

export const IMMUNE_POKEMON_IDS = new Set([
  // Levitate (immune to Ground)
  92, 93, 94,       // Gastly, Haunter, Gengar
  109, 110,         // Koffing, Weezing
  329, 330,         // Vibrava, Flygon
  337, 338,         // Lunatone, Solrock
  343, 344,         // Baltoy, Claydol
  355, 356,         // Duskull, Dusclops
  358,              // Chimecho
  375, 376,         // Beldum, Metang, Metagross
  380, 381,         // Latias, Latios
  425, 426,         // Drifloon, Drifblim
  429,              // Mismagius
  433,              // Chingling
  436, 437,         // Bronzor, Bronzong
  462,              // Magnezone
  478,              // Froslass
  479,              // Rotom
  484,              // Palkia
  487,              // Giratina
  488,              // Cresselia
  602, 603, 604,    // Tynamo, Eelektrik, Eelektross
  607, 608, 609,    // Litwick, Lampent, Chandelure
  615,              // Cryogonal

  // Water Absorb / Storm Drain (immune to Water)
  134,              // Vaporeon
  183, 184,         // Marill, Azumarill
  226,              // Mantine
  321,              // Wailord
  349, 350,         // Feebas, Milotic
  422, 423,         // Shellos, Gastrodon
  550,              // Basculin
  594,              // Alomomola

  // Volt Absorb / Lightning Rod / Motor Drive (immune to Electric)
  135,              // Jolteon
  180, 181,         // Flaaffy, Ampharos
  239, 125,         // Elekid, Electabuzz
  309, 310,         // Electrike, Manectric
  403, 404, 405,    // Shinx, Luxio, Luxray
  522, 523,         // Blitzle, Zebstrika
  642,              // Thundurus

  // Flash Fire (immune to Fire)
  136,              // Flareon
  37, 38,           // Vulpix, Ninetales
  58, 59,           // Growlithe, Arcanine
  218, 219,         // Slugma, Magcargo
  228, 229,         // Houndour, Houndoom
  244,              // Entei
  322, 323,         // Numel, Camerupt

  // Sap Sipper (immune to Grass)
  128,              // Tauros
  241,              // Miltank
  234,              // Stantler
  203,              // Girafarig
  585, 586,         // Deerling, Sawsbuck
  626,              // Bouffalant

  // Soundproof (immune to sound moves — not a type immunity, skip)

  // Wonder Guard (immune to non-super-effective)
  292,              // Shedinja
]);