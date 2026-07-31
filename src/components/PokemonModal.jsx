import { getTypeColor } from '../utils/typeColors';

function PokemonModal({ pokemon, onClose }) {
  if (!pokemon) return null;

  const primaryType = pokemon.types[0].type.name;
  const accent = getTypeColor(primaryType);
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
        <img
          className="modal__sprite"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <h2 className="modal__name">{pokemon.name}</h2>

        <div className="pokemon-card__types" style={{ justifyContent: 'center' }}>
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

        <div className="modal__meta">
          <div>
            <span className="modal__meta-label">Height</span>
            <span>{pokemon.height / 10} m</span>
          </div>
          <div>
            <span className="modal__meta-label">Weight</span>
            <span>{pokemon.weight / 10} kg</span>
          </div>
        </div>

        <div className="modal__stats">
          {pokemon.stats.map((s) => (
            <div key={s.stat.name} className="stat-row">
              <span className="stat-row__label">{s.stat.name.replace('-', ' ')}</span>
              <div className="stat-row__track">
                <div
                  className="stat-row__fill"
                  style={{
                    width: `${Math.min(s.base_stat, 150) / 1.5}%`,
                    background: accent,
                  }}
                />
              </div>
              <span className="stat-row__value">{s.base_stat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonModal;
