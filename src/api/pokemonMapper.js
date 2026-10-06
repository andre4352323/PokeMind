export function mapPokemon(raw) {
  return {
    id: raw.id,
    name: raw.name,
    image: raw.sprites?.front_default ?? null,
    types: (raw.types ?? []).map((t) => t.type.name),
    height: raw.height / 10,
    weight: raw.weight / 10, 
    stats: (raw.stats ?? []).map((s) => ({ name: s.stat.name, value: s.base_stat })),
  };
}