import { getTypeColor } from '../utils/typeColors';
import TypeBadge from './TypeBadge';

function PokemonCard({ pokemon, onSelect }) {
  const accent = getTypeColor(pokemon.types[0]);
  const number = String(pokemon.id).padStart(3, '0');

  return (
    <button
      className="pokemon-card"
      style={{ '--accent': accent }}
      onClick={() => onSelect(pokemon)}
    >
      <span className="pokemon-card__number">#{number}</span>
      {pokemon.image ? (
        <img
          className="pokemon-card__sprite"
          src={pokemon.image}
          alt={pokemon.name}
          loading="lazy"
        />
      ) : (
        <div className="pokemon-card__sprite">?</div>
      )}
      <h3 className="pokemon-card__name">{pokemon.name}</h3>
      <div className="pokemon-card__types">
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>
    </button>
  );
}

export default PokemonCard;  