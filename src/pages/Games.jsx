"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Download } from 'lucide-react';
import './Games.css';

const MOCK_GAMES = [
  { id: 1, title: 'Neon Protocol', category: 'RPG', status: 'Live', image: 'bg1' },
  { id: 2, title: 'Void Walkers', category: 'Shooter', status: 'Beta', image: 'bg2' },
  { id: 3, title: 'Stellar Front', category: 'Strategy', status: 'Live', image: 'bg3' },
  { id: 4, title: 'Cyber Drift', category: 'Racing', status: 'Alpha', image: 'bg4' },
  { id: 5, title: 'Shadow Syndicate', category: 'RPG', status: 'Live', image: 'bg5' },
  { id: 6, title: 'Apex Horizon', category: 'Shooter', status: 'Live', image: 'bg6' },
];

const CATEGORIES = ['All', 'RPG', 'Shooter', 'Strategy', 'Racing'];

const Games = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredGames = MOCK_GAMES.filter(game => {
    const matchesCategory = filter === 'All' || game.category === filter;
    const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="games-page"
    >
      <div className="games-header">
        <div className="container">
          <h1 className="text-gradient">Game Library</h1>
          <p>Discover our expansive universe of AAA titles.</p>
        </div>
      </div>

      <div className="container games-content">
        {/* Toolbar */}
        <div className="games-toolbar glass-panel">
          <div className="search-bar">
            <Search size={20} color="var(--color-text-secondary)" />
            <input 
              type="text" 
              placeholder="Search games..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="category-filters">
            <Filter size={20} color="var(--color-text-secondary)" />
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="games-grid">
          <AnimatePresence>
            {filteredGames.map((game) => (
              <motion.div 
                key={game.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="library-card glass-panel"
              >
                <div className="library-card-img-placeholder">
                  <span className="status-badge">{game.status}</span>
                </div>
                <div className="library-card-info">
                  <h3>{game.title}</h3>
                  <span className="game-category">{game.category}</span>
                  <button className="btn-primary btn-sm full-width">
                    <Download size={16} className="inline-icon" /> Download
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredGames.length === 0 && (
            <div className="no-results">
              <h3>No games found matching your criteria.</h3>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Games;

