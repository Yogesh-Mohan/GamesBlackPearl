"use client";

import { Save, Settings, Shield, Globe, Bell } from 'lucide-react';
import '../../../pages/Home.css';

export default function AdminSettingsPage() {
  return (
    <div className="admin-settings-page">
      {/* Header */}
      <div className="section-header" style={{ paddingTop: '0', paddingBottom: '20px', borderBottom: '1px solid var(--glass-border)', marginBottom: '30px' }}>
        <div>
          <h2 style={{ fontSize: '2rem' }}>Platform Settings</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>Configure global platform preferences and security.</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
        
        {/* General Settings */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Globe color="var(--color-accent-cyan)" size={24} />
            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>General Configuration</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Platform Name</label>
              <input type="text" defaultValue="Black Pearl Games" style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Contact Email</label>
              <input type="email" defaultValue="gamesblackpearl07@gmail.com" style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Maintenance Mode</label>
              <select style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', outline: 'none' }}>
                <option value="off">Off - Publicly Accessible</option>
                <option value="on">On - Admin Access Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Shield color="var(--color-accent-purple)" size={24} />
            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Security & Auth</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Admin Password Reset</label>
              <button className="btn-secondary" style={{ width: '100%', textAlign: 'left', padding: '12px', display: 'block' }}>Change Admin Credentials</button>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>User Registrations</label>
              <select style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', outline: 'none' }}>
                <option value="open">Open (Anyone can register)</option>
                <option value="invite">Invite Only</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
