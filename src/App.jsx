import { useState } from 'react';
import { usePokemonList } from './hooks/usePokemonList';
import { usePokemonSearch } from './hooks/usePokemonSearch';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';
import SearchBar from './components/SearchBar';
import ChatbotPlaceholder from './components/ChatbotPlaceholder';

function App() {
  const { pokemon, loading, loadingMore, error, loadMore } = usePokemonList();
  const { search, searching, error: searchError } = usePokemonSearch();
  const [selected, setSelected] = useState(null);

  async function handleSearch(name) {
    const found = await search(name);
    if (found) setSelected(found);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          Poke<span className="app-header__accent">Mind</span>
        </h1>
        <p className="app-header__subtitle">Browse the Pokedex. Team advisor coming soon.</p>
        <SearchBar onSearch={handleSearch} loading={searching} />
        {searchError && <p className="search-error">{searchError}</p>}
      </header>

      <main>
        {loading ? (
          <p className="status-text">Loading Pokemon...</p>
        ) : (
          <>
            <div className="pokemon-grid">
              {pokemon.map((p) => (
                <PokemonCard key={p.id} pokemon={p} onSelect={setSelected} />
              ))}
            </div>
            {error && <p className="search-error">{error}</p>}
            {pokemon.length > 0 && (
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