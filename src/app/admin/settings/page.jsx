"use client";

import { Save, Settings, Shield, Globe, Bell } from 'lucide-react';
import { useState } from 'react';
import '../../../pages/Home.css';

export default function AdminSettingsPage() {
  const [toast, setToast] = useState('');
  const [platformName, setPlatformName] = useState('Black Pearl Games');
  const [contactEmail, setContactEmail] = useState('gamesblackpearl07@gmail.com');
  const [maintenanceMode, setMaintenanceMode] = useState('off');
  const [registrations, setRegistrations] = useState('open');

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSave = () => {
    showToast('Settings saved successfully!');
  };

  const handleChangeCredentials = () => {
    showToast('Credential change feature coming soon.');
  };

  return (
    <div className="admin-settings-page">
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed', top: '100px', right: '30px', zIndex: 9999,
          background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)',
          color: '#10b981', padding: '14px 24px', borderRadius: '10px',
          fontSize: '0.95rem', backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease'
        }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="section-header" style={{ paddingTop: '0', paddingBottom: '20px', borderBottom: '1px solid var(--glass-border)', marginBottom: '30px' }}>
        <div>
          <h2 style={{ fontSize: '2rem' }}>Platform Settings</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>Configure global platform preferences and security.</p>
        </div>
        <button onClick={handleSave} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
              <input type="text" value={platformName} onChange={(e) => setPlatformName(e.target.value)} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Contact Email</label>
              <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Maintenance Mode</label>
              <select value={maintenanceMode} onChange={(e) => setMaintenanceMode(e.target.value)} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', outline: 'none', boxSizing: 'border-box' }}>
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
              <button onClick={handleChangeCredentials} className="btn-secondary" style={{ width: '100%', textAlign: 'left', padding: '12px', display: 'block', cursor: 'pointer' }}>Change Admin Credentials</button>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>User Registrations</label>
              <select value={registrations} onChange={(e) => setRegistrations(e.target.value)} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', outline: 'none', boxSizing: 'border-box' }}>
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
