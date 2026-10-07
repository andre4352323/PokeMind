import { useState, useEffect } from 'react';
import { fetchAllPokemonNames } from '../api/pokeapi';

// loads every Pokemon name once, if it fails, the grid still works, just without filtering
export function usePokemonNames() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    let cancelled = false;

    fetchAllPokemonNames()
      .then((data) => {
        if (!cancelled) setNames(data);
      })
      .catch((err) => console.error(err));

    return () => {
      cancelled = true;
    };
  }, []);

  return names;
}