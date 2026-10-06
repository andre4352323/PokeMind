import { getTypeColor } from '../utils/typeColors';
import TypeBadge from './TypeBadge';

function PokemonModal({ pokemon, onClose }) {
  if (!pokemon) return null;

  const accent = getTypeColor(pokemon.types[0]);
  const number = String(pokemon.id).padStart(3, '0');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        style={{ '--accent': accent }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <span className="modal__number">#{number}</span>
        {pokemon.image ? (
          <img className="modal__sprite" src={pokemon.image} alt={pokemon.name} />
        ) : (
          <div className="modal__sprite">?</div>
        )}
        <h2 className="modal__name">{pokemon.name}</h2>

        <div className="pokemon-card__types" style={{ justifyContent: 'center' }}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>

        <div className="modal__meta">
          <div>
            <span className="modal__meta-label">Height</span>
            <span>{pokemon.height} m</span>
          </div>
          <div>
            <span className="modal__meta-label">Weight</span>
            <span>{pokemon.weight} kg</span>
          </div>
        </div>

        <div className="modal__stats">
          {pokemon.stats.map((stat) => (
            <div key={stat.name} className="stat-row">
              <span className="stat-row__label">{stat.name.replace('-', ' ')}</span>
              <div className="stat-row__track">
                <div
                  className="stat-row__fill"
                  style={{
                    width: `${Math.min(stat.value, 150) / 1.5}%`,
                    background: accent,
                  }}
                />
              </div>
              <span className="stat-row__value">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonModal;