import { useState } from 'react';
import { usePokemonList } from './hooks/usePokemonList';
import { usePokemonNames } from './hooks/usePokemonNames';
import { usePokemonFilter } from './hooks/usePokemonFilter';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';
import SearchBar from './components/SearchBar';
import ChatbotPlaceholder from './components/ChatbotPlaceholder';

function App() {
  const { pokemon, loading, loadingMore, error, loadMore } = usePokemonList();
  const names = usePokemonNames();
  const [query, setQuery] = useState('');
  const { results, filtering, error: filterError, noMatches } = usePokemonFilter(names, query);
  const [selected, setSelected] = useState(null);

  const isFiltering = query.trim() !== '';
  const cards = isFiltering ? results : pokemon;

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          Poke<span className="app-header__accent">Mind</span>
        </h1>
        <p className="app-header__subtitle">Browse the Pokedex. Team advisor coming soon.</p>
        <SearchBar query={query} onQueryChange={setQuery} />
      </header>

      <main>
        {loading ? (
          <p className="status-text">Loading Pokemon...</p>
        ) : (
          <>
            {isFiltering && filtering && <p className="status-text">Searching...</p>}
            {noMatches && <p className="status-text">No Pokemon match "{query}".</p>}
            {isFiltering && filterError && <p className="search-error">{filterError}</p>}

            <div className="pokemon-grid">
              {cards.map((p) => (
                <PokemonCard key={p.id} pokemon={p} onSelect={setSelected} />
              ))}
            </div>

            {!isFiltering && error && <p className="search-error">{error}</p>}
            {!isFiltering && pokemon.length > 0 && (
              <button className="load-more" onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? 'Loading...' : 'Load more'}
              </button>
            )}
          </>
        )}

        <ChatbotPlaceholder />
      </main>

      <PokemonModal pokemon={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default App;