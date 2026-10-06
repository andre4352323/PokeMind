import { useState } from 'react';
import { fetchPokemonByName } from '../api/pokeapi';
import { validateSearch } from '../utils/validateSearch';

export function usePokemonSearch() {
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');

  async function search(input) {
    setError('');

    const check = validateSearch(input);
    if (!check.ok) {
      setError(check.message);
      return null;
    }

    setSearching(true);
    try {
      return await fetchPokemonByName(check.value);
    } catch (err) {
      console.error(err);
      setError("Couldn't find that Pokemon. Check the spelling.");
      return null;
    } finally {
      setSearching(false);
    }
  }

  return { search, searching, error };
}