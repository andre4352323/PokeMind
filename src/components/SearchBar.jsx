import { MAX_SEARCH_LENGTH } from '../config';

function SearchBar({ query, onQueryChange }) {
  return (
    <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search a Pokemon by name..."
        value={query}
        maxLength={MAX_SEARCH_LENGTH}
        onChange={(e) => onQueryChange(e.target.value)}
      />
    </form>
  );
}

export default SearchBar;