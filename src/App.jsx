import { useState, useEffect } from 'react';
import { fetchPokemonPage, fetchPokemonByName } from './api/pokeapi';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';
import SearchBar from './components/SearchBar';
import ChatbotPlaceholder from './components/ChatbotPlaceholder';

const PAGE_SIZE = 20;

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [selected, setSelected] = useState(null);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    fetchPokemonPage(PAGE_SIZE, 0).then((data) => {
      setPokemonList(data);
      setLoading(false);
    });
  }, []);

  function handleLoadMore() {
    const nextOffset = offset + PAGE_SIZE;
    setLoadingMore(true);
    fetchPokemonPage(PAGE_SIZE, nextOffset).then((data) => {
      setPokemonList((prev) => [...prev, ...data]);
      setOffset(nextOffset);
      setLoadingMore(false);
    });
  }

  function handleSearch(name) {
    setSearchError('');
    fetchPokemonByName(name)
      .then((data) => setSelected(data))
      .catch(() => setSearchError(`Couldn't find "${name}". Check the spelling.`));
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          Poke<span className="app-header__accent">Mind</span>
        </h1>
        <p className="app-header__subtitle">Browse the Pokedex. Team advisor coming soon.</p>
        <SearchBar onSearch={handleSearch} loading={false} />
        {searchError && <p className="search-error">{searchError}</p>}
      </header>

      <main>
        {loading ? (
          <p className="status-text">Loading Pokemon...</p>
        ) : (
          <>
            <div className="pokemon-grid">
              {pokemonList.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} onSelect={setSelected} />
              ))}
            </div>
            <button className="load-more" onClick={handleLoadMore} disabled={loadingMore}>
              {loadingMore ? 'Loading...' : 'Load more'}
            </button>
          </>
        )}

        <ChatbotPlaceholder />
      </main>

      <PokemonModal pokemon={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default App;
