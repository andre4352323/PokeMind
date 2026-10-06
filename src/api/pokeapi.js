import { BASE_URL } from '../config';
import { mapPokemon } from './pokemonMapper';

// fetch json and throw a clear error if the request failed
async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  return res.json();
}

export async function fetchPokemonPage(limit, offset) {
  const list = await getJson(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);

  const details = await Promise.all(
    list.results.map((entry) => {
      
      if (!entry.url.startsWith(BASE_URL)) {
        throw new Error('Unexpected URL in API response');
      }
      return getJson(entry.url);
    })
  );

  return details.map(mapPokemon);
}

export async function fetchPokemonByName(name) {
  const raw = await getJson(`${BASE_URL}/pokemon/${encodeURIComponent(name)}`);
  return mapPokemon(raw);
}