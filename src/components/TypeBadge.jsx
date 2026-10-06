import { getTypeColor } from '../utils/typeColors';

function TypeBadge({ type }) {
  return (
    <span className="type-badge" style={{ background: getTypeColor(type) }}>
      {type}
    </span>
  );
}

export default TypeBadge;