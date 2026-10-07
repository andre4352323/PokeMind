import { useState, useEffect } from 'react';
import { fetchPokemonByNames } from '../api/pokeapi';
import { filterNames } from '../utils/filterNames';
import { SEARCH_DELAY_MS } from '../config';

// given all names and what the user typed, returns the matching pokemon
export function usePokemonFilter(names, query) {
  const [results, setResults] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const matches = filterNames(names, query);

    if (matches.length === 0) {
      setResults([]);
      setFiltering(false);
      setError('');
      return;
    }

    let cancelled = false;
    setFiltering(true);

    // wait until the user stops typing, then fetch
    const timer = setTimeout(() => {
      fetchPokemonByNames(matches)
        .then((data) => {
          if (!cancelled) {
            setResults(data);
            setError('');
          }
        })
        .catch((err) => {
          console.error(err);
          if (!cancelled) setError('Could not load matching Pokemon.');
        })
        .finally(() => {
          if (!cancelled) setFiltering(false);
        });
    }, SEARCH_DELAY_MS);

    // if the user types again, throw this attempt away
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [names, query]);

  const noMatches =
    query.trim() !== '' && names.length > 0 && filterNames(names, query).length === 0;

  return { results, filtering, error, noMatches };
}