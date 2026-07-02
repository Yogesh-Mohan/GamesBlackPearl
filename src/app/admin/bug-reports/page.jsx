"use client";

import { Bug, CheckCircle, Clock, Trash2 } from 'lucide-react';
import { useState } from 'react';
import '../../../pages/Home.css';

export default function AdminBugReportsPage() {
  const [bugs, setBugs] = useState([]);

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return '#ef4444';
      case 'High': return '#f97316';
      case 'Medium': return '#eab308';
      case 'Low': return '#10b981';
      default: return '#a0a0a0';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return '#ef4444';
      case 'In Progress': return '#3b82f6';
      case 'Resolved': return '#10b981';
      default: return '#a0a0a0';
    }
  };

  return (
    <div className="admin-bugs-page">
      {/* Header */}
      <div className="section-header" style={{ paddingTop: '0', paddingBottom: '20px', borderBottom: '1px solid var(--glass-border)', marginBottom: '30px' }}>
        <div>
          <h2 style={{ fontSize: '2rem' }}>Bug Reports Triage</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>Review and manage issues reported by players.</p>
        </div>
        <div className="glass-panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Bug className="text-red-400" size={20} />
          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
            {bugs.filter(b => b.status === 'Open').length} Open Reports
          </span>
        </div>
      </div>

      {/* Bugs List */}
      <div className="glass-panel" style={{ padding: '20px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Issue Title</th>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Game & User</th>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Priority</th>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bugs.map((bug) => (
              <tr key={bug.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>
                  {bug.title}
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>Reported on {bug.date}</div>
                </td>
                <td style={{ padding: '15px' }}>
                  <div style={{ color: 'var(--color-accent-cyan)' }}>{bug.game}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>by {bug.user}</div>
                </td>
                <td style={{ padding: '15px' }}>
                  <span style={{ 
                    color: getPriorityColor(bug.priority),
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}>
                    {bug.priority}
                  </span>
                </td>
                <td style={{ padding: '15px' }}>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    fontSize: '0.8rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: getStatusColor(bug.status),
                    border: `1px solid ${getStatusColor(bug.status)}33`
                  }}>
                    {bug.status}
                  </span>
                </td>
                <td style={{ padding: '15px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-secondary" style={{ padding: '6px', minWidth: 'auto', border: '1px solid var(--glass-border)' }} title="Mark as In Progress">
                      <Clock size={16} color="#3b82f6" />
                    </button>
                    <button className="btn-secondary" style={{ padding: '6px', minWidth: 'auto', border: '1px solid var(--glass-border)' }} title="Mark as Resolved">
                      <CheckCircle size={16} color="#10b981" />
                    </button>
                    <button className="btn-secondary" style={{ padding: '6px', minWidth: 'auto', border: '1px solid var(--glass-border)' }} title="Delete Report">
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
