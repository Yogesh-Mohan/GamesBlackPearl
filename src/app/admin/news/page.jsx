"use client";

import { Newspaper, Edit2, Trash2, CheckCircle, Clock, Plus } from 'lucide-react';
import { useState } from 'react';
import '../../../pages/Home.css';

export default function AdminNewsPage() {
  const [news, setNews] = useState([]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Published': return '#10b981';
      case 'Scheduled': return '#3b82f6';
      case 'Draft': return '#f59e0b';
      default: return '#a0a0a0';
    }
  };

  return (
    <div className="admin-news-page">
      {/* Header */}
      <div className="section-header" style={{ paddingTop: '0', paddingBottom: '20px', borderBottom: '1px solid var(--glass-border)', marginBottom: '30px' }}>
        <div>
          <h2 style={{ fontSize: '2rem' }}>News & Updates</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>Create and manage community announcements.</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} /> Compose Article
        </button>
      </div>

      {/* News List */}
      <div className="glass-panel" style={{ padding: '20px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Article Title</th>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Publish Date</th>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Views</th>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '15px' }}>
                  <div style={{ fontWeight: 'bold' }}>{item.title}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>by {item.author}</div>
                </td>
                <td style={{ padding: '15px' }}>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    fontSize: '0.8rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: getStatusColor(item.status),
                    border: `1px solid ${getStatusColor(item.status)}33`
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: '15px', color: 'var(--color-text-secondary)' }}>{item.date}</td>
                <td style={{ padding: '15px', color: 'var(--color-text-secondary)' }}>{item.views}</td>
                <td style={{ padding: '15px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-secondary" style={{ padding: '6px', minWidth: 'auto', border: '1px solid var(--glass-border)' }} title="Edit Article">
                      <Edit2 size={16} color="var(--color-text-secondary)" />
                    </button>
                    <button className="btn-secondary" style={{ padding: '6px', minWidth: 'auto', border: '1px solid var(--glass-border)' }} title="Delete Article">
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
