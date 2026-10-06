import { useState } from 'react';
import { MAX_SEARCH_LENGTH } from '../config';

function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(query);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search a Pokemon by name..."
        value={query}
        maxLength={MAX_SEARCH_LENGTH}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}

export default SearchBar;