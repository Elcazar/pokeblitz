// data/moves.js
// Curated list of damage-dealing moves, 3 per type.
// Used by the super-effective minigame.

export const MOVES = [
  // Normal
  { name: { en: 'Body Slam',     es: 'Golpe Cuerpo'  }, type: 'normal'   },
  { name: { en: 'Hyper Beam',    es: 'Hiperrayo'     }, type: 'normal'   },
  { name: { en: 'Slash',         es: 'Cuchillada'    }, type: 'normal'   },
  // Fire
  { name: { en: 'Flamethrower',  es: 'Lanzallamas'   }, type: 'fire'     },
  { name: { en: 'Fire Blast',    es: 'Llamarada'     }, type: 'fire'     },
  { name: { en: 'Ember',         es: 'Ascuas'        }, type: 'fire'     },
  // Water
  { name: { en: 'Surf',          es: 'Surf'          }, type: 'water'    },
  { name: { en: 'Hydro Pump',    es: 'Hidrobomba'    }, type: 'water'    },
  { name: { en: 'Waterfall',     es: 'Cascada'       }, type: 'water'    },
  // Electric
  { name: { en: 'Thunderbolt',   es: 'Rayo'          }, type: 'electric' },
  { name: { en: 'Thunder',       es: 'Trueno'        }, type: 'electric' },
  { name: { en: 'Spark',         es: 'Chispazo'        }, type: 'electric' },
  // Grass
  { name: { en: 'Solar Beam',    es: 'Rayo Solar'    }, type: 'grass'    },
  { name: { en: 'Leaf Blade',    es: 'Hoja Aguda'    }, type: 'grass'    },
  { name: { en: 'Razor Leaf',    es: 'Hoja Afilada'  }, type: 'grass'    },
  // Ice
  { name: { en: 'Blizzard',      es: 'Ventisca'      }, type: 'ice'      },
  { name: { en: 'Ice Beam',      es: 'Rayo Hielo'    }, type: 'ice'      },
  { name: { en: 'Ice Punch',     es: 'Puño Hielo'    }, type: 'ice'      },
  // Fighting
  { name: { en: 'Close Combat',  es: 'A bocajarro'       }, type: 'fighting' },
  { name: { en: 'Superpower',    es: 'Fuerza bruta'  }, type: 'fighting' },
  { name: { en: 'Brick Break',   es: 'Demolición'   }, type: 'fighting' },
  // Poison
  { name: { en: 'Sludge Bomb',   es: 'Bomba Lodo'    }, type: 'poison'   },
  { name: { en: 'Poison Jab',    es: 'Puya Nociva'        }, type: 'poison'   },
  { name: { en: 'Gunk Shot',     es: 'Lanzamugre'  }, type: 'poison'   },
  // Ground
  { name: { en: 'Earthquake',    es: 'Terremoto'     }, type: 'ground'   },
  { name: { en: 'Earth Power',   es: 'Tierra Viva'  }, type: 'ground'   },
  { name: { en: 'Dig',           es: 'Excavar'       }, type: 'ground'   },
  // Flying
  { name: { en: 'Brave Bird',    es: 'Pájaro Osado'  }, type: 'flying'   },
  { name: { en: 'Air Slash',     es: 'Tajo Aéreo'    }, type: 'flying'   },
  { name: { en: 'Hurricane',     es: 'Vendaval'       }, type: 'flying'   },
  // Psychic
  { name: { en: 'Psychic',       es: 'Psíquico'      }, type: 'psychic'  },
  { name: { en: 'Psybeam',       es: 'Psicorrayo'    }, type: 'psychic'  },
  { name: { en: 'Zen Headbutt',  es: 'Cabezazo Zen'  }, type: 'psychic'  },
  // Bug
  { name: { en: 'X-Scissor',     es: 'Tijera X'      }, type: 'bug'      },
  { name: { en: 'Bug Buzz',      es: 'Zumbido'       }, type: 'bug'      },
  { name: { en: 'U-turn',        es: 'Ida y Vuelta'  }, type: 'bug'      },
  // Rock
  { name: { en: 'Rock Slide',    es: 'Avalancha'     }, type: 'rock'     },
  { name: { en: 'Stone Edge',    es: 'Roca Afilada'  }, type: 'rock'     },
  { name: { en: 'Rock Blast',    es: 'Pedrada'    }, type: 'rock'     },
  // Ghost
  { name: { en: 'Shadow Ball',   es: 'Bola Sombra'   }, type: 'ghost'    },
  { name: { en: 'Shadow Claw',   es: 'Garra Umbría' }, type: 'ghost'    },
  { name: { en: 'Hex',           es: 'Infortunio'     }, type: 'ghost'    },
  // Dragon
  { name: { en: 'Dragon Claw',   es: 'Garra Dragón'  }, type: 'dragon'   },
  { name: { en: 'Outrage',       es: 'Enfado'        }, type: 'dragon'   },
  { name: { en: 'Draco Meteor',  es: 'Cometa Draco'  }, type: 'dragon'   },
  // Dark
  { name: { en: 'Crunch',        es: 'Triturar'      }, type: 'dark'     },
  { name: { en: 'Dark Pulse',    es: 'Pulso Umbrío'  }, type: 'dark'     },
  { name: { en: 'Night Slash',   es: 'Tajo Nocturno' }, type: 'dark'     },
  // Steel
  { name: { en: 'Iron Head',     es: 'Cabeza de Hierro'}, type: 'steel'  },
  { name: { en: 'Flash Cannon',  es: 'Foco resplandor'  }, type: 'steel'    },
  { name: { en: 'Meteor Mash',   es: 'Golpe Meteoro' }, type: 'steel'    },
  // Fairy
  { name: { en: 'Moonblast',     es: 'Fuerza Lunar'     }, type: 'fairy'    },
  { name: { en: 'Dazzling Gleam',es: 'Brillo Mágico'        }, type: 'fairy'    },
  { name: { en: 'Play Rough',    es: 'Carantoña'  }, type: 'fairy'    },
];

// Indexed by type for fast lookup
export const MOVES_BY_TYPE = MOVES.reduce((acc, move) => {
  if (!acc[move.type]) acc[move.type] = [];
  acc[move.type].push(move);
  return acc;
}, {});