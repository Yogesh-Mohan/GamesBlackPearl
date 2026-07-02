"use client";

import { DownloadCloud, Edit2, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import '../../../pages/Home.css';

export default function AdminDownloadsPage() {
  const [downloads, setDownloads] = useState([]);

  return (
    <div className="admin-downloads-page">
      {/* Header */}
      <div className="section-header" style={{ paddingTop: '0', paddingBottom: '20px', borderBottom: '1px solid var(--glass-border)', marginBottom: '30px' }}>
        <div>
          <h2 style={{ fontSize: '2rem' }}>Downloads Management</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>Track and manage game distribution files.</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <DownloadCloud size={18} /> Upload New Build
        </button>
      </div>

      {/* Downloads List */}
      <div className="glass-panel" style={{ padding: '20px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Game Title</th>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Platform & Version</th>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Total Downloads</th>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {downloads.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>{item.game}</td>
                <td style={{ padding: '15px' }}>
                  <div style={{ color: 'var(--color-accent-cyan)' }}>{item.platform}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{item.version}</div>
                </td>
                <td style={{ padding: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{item.totalDownloads}</span>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      color: item.trend.startsWith('+') ? '#10b981' : '#ef4444',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      {item.trend.startsWith('+') ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {item.trend}
                    </span>
                  </div>
                </td>
                <td style={{ padding: '15px' }}>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    fontSize: '0.8rem',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: '15px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-secondary" style={{ padding: '6px', minWidth: 'auto', border: '1px solid var(--glass-border)' }} title="Edit Version">
                      <Edit2 size={16} color="var(--color-text-secondary)" />
                    </button>
                    <button className="btn-secondary" style={{ padding: '6px', minWidth: 'auto', border: '1px solid var(--glass-border)' }} title="Delete Build">
                      <Trash2 size={16} color="#ef4444" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {downloads.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                  No download builds uploaded yet. Click "Upload New Build" to add one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
