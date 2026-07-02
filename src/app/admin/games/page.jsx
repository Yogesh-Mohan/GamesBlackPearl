"use client";

import { Gamepad2, Plus, Edit2, Trash2, EyeOff } from 'lucide-react';
import { useState } from 'react';
import '../../../pages/Home.css';

export default function AdminGamesPage() {
  const [games, setGames] = useState([]);

  return (
    <div className="admin-games-page">
      {/* Header */}
      <div className="section-header" style={{ paddingTop: '0', paddingBottom: '20px', borderBottom: '1px solid var(--glass-border)', marginBottom: '30px' }}>
        <div>
          <h2 style={{ fontSize: '2rem' }}>Games Management</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>Publish and manage your game library.</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} /> Add New Game
        </button>
      </div>

      {/* Games List */}
      <div className="glass-panel" style={{ padding: '20px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Game Title</th>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Genre</th>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Downloads</th>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'var(--color-bg-tertiary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Gamepad2 size={20} color="var(--color-accent-cyan)" />
                    </div>
                    {game.title}
                  </div>
                </td>
                <td style={{ padding: '15px', color: 'var(--color-text-secondary)' }}>{game.genre}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    fontSize: '0.8rem',
                    backgroundColor: game.status === 'Live' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    color: game.status === 'Live' ? '#10b981' : '#f59e0b',
                    border: `1px solid ${game.status === 'Live' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                  }}>
                    {game.status}
                  </span>
                </td>
                <td style={{ padding: '15px', color: 'var(--color-text-secondary)' }}>{game.downloads}</td>
                <td style={{ padding: '15px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-secondary" style={{ padding: '6px', minWidth: 'auto', border: '1px solid var(--glass-border)' }} title="Edit Game">
                      <Edit2 size={16} color="var(--color-text-secondary)" />
                    </button>
                    <button className="btn-secondary" style={{ padding: '6px', minWidth: 'auto', border: '1px solid var(--glass-border)' }} title="Hide Game">
                      <EyeOff size={16} color="var(--color-text-secondary)" />
                    </button>
                    <button className="btn-secondary" style={{ padding: '6px', minWidth: 'auto', border: '1px solid var(--glass-border)' }} title="Delete Game">
                      <Trash2 size={16} color="#ef4444" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
