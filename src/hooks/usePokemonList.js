import { useState, useEffect } from 'react';
import { fetchPokemonPage } from '../api/pokeapi';
import { PAGE_SIZE } from '../config';

// Owns the list of Pokemon, loading flags and errors
export function usePokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false; // ignore results if the component went away

    fetchPokemonPage(PAGE_SIZE, 0)
      .then((data) => {
        if (!cancelled) setPokemon(data);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setError('Could not load Pokemon. Please try again later.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function loadMore() {
    const nextOffset = offset + PAGE_SIZE;
    setLoadingMore(true);
    setError('');
    try {
      const data = await fetchPokemonPage(PAGE_SIZE, nextOffset);
      setPokemon((prev) => [...prev, ...data]);
      setOffset(nextOffset);
    } catch (err) {
      console.error(err);
      setError('Could not load more Pokemon. Please try again.');
    } finally {
      setLoadingMore(false);
    }
  }

  return { pokemon, loading, loadingMore, error, loadMore };
}