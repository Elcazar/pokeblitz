// context/PokemonContext.jsx
// Loads the static Pokemon dataset and makes it available to the entire app.
// The dataset is imported at build time from the generated JSON file.
// This context also exposes a ready flag so screens can wait for data.

import { createContext, useContext, useEffect, useState } from 'react';

const PokemonContext = createContext(null);

export function PokemonProvider({ children }) {
  const [pokemon, setPokemon] = useState([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Dynamic import so the large JSON is code-split and doesn't block
    // the initial render. Vite handles this automatically.
    import('../data/pokemon.json')
      .then((module) => {
        setPokemon(module.default);
        setReady(true);
      })
      .catch((err) => {
        console.error('Failed to load Pokemon data:', err);
        setError('Failed to load Pokemon data. Run the fetch script first.');
      });
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemon, ready, error }}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  const ctx = useContext(PokemonContext);
  if (!ctx) throw new Error('usePokemon must be used inside PokemonProvider');
  return ctx;
}