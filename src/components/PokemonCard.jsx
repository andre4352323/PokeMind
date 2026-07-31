import { getTypeColor } from '../utils/typeColors';

function PokemonCard({ pokemon, onSelect }) {
  const primaryType = pokemon.types[0].type.name;
  const accent = getTypeColor(primaryType);
  const number = String(pokemon.id).padStart(3, '0');

  return (
    <button
      className="pokemon-card"
      style={{ '--accent': accent }}
      onClick={() => onSelect(pokemon)}
    >
      <span className="pokemon-card__number">#{number}</span>
      <img
        className="pokemon-card__sprite"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        loading="lazy"
      />
      <h3 className="pokemon-card__name">{pokemon.name}</h3>
      <div className="pokemon-card__types">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className="type-badge"
            style={{ background: getTypeColor(t.type.name) }}
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </button>
  );
}

export default PokemonCard;
