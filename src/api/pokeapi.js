const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonPage(limit = 20, offset = 0) {
  const listRes = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  const listData = await listRes.json();

  const detailRequests = listData.results.map((entry) =>
    fetch(entry.url).then((res) => res.json())
  );

  const fullDetails = await Promise.all(detailRequests);
  return fullDetails;
}

export async function fetchPokemonByName(name) {
  const res = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase().trim()}`);
  if (!res.ok) {
    throw new Error('Pokemon not found');
  }
  return res.json();
}
