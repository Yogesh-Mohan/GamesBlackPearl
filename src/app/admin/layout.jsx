"use client";

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminNavbar from '../../components/admin/AdminNavbar';
import Footer from '../../components/Footer';
import { ShieldAlert, LogIn, Lock, Mail } from 'lucide-react';
import '../../index.css';

export default function AdminLayout({ children }) {
  const { user, login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#050505] text-[#00e5ff]">Loading...</div>;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error);
    }
  };

  // If not authenticated, show standalone login screen
  if (!user) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg-primary)',
        backgroundImage: 'radial-gradient(circle at center, rgba(0,229,255,0.05) 0%, transparent 60%)',
        padding: '20px'
      }}>
        <div className="glass-panel" style={{ 
          maxWidth: '450px', 
          width: '100%', 
          padding: '40px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255,255,255,0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle glow effect top edge */}
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--color-accent-cyan), transparent)', opacity: 0.5 }}></div>

          <div style={{ textAlign: 'center', marginBottom: '35px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0,229,255,0.1)', marginBottom: '20px', border: '1px solid rgba(0,229,255,0.2)' }}>
              <ShieldAlert color="var(--color-accent-cyan)" size={40} />
            </div>
            <h1 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '8px', letterSpacing: '2px' }}>ADMIN PORTAL</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', letterSpacing: '0.5px' }}>Authorized personnel only. Please authenticate.</p>
          </div>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {error && (
              <div style={{ 
                backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                border: '1px solid rgba(239, 68, 68, 0.3)', 
                color: '#f87171', 
                padding: '12px', 
                borderRadius: '8px', 
                textAlign: 'center',
                fontSize: '0.9rem'
              }}>
                {error}
              </div>
            )}
            
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
                <Mail color="var(--color-text-secondary)" size={18} />
              </div>
              <input 
                type="email" 
                placeholder="Administrator Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ 
                  width: '100%', 
                  padding: '16px 16px 16px 48px', 
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent-cyan)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
              />
            </div>
            
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
                <Lock color="var(--color-text-secondary)" size={18} />
              </div>
              <input 
                type="password" 
                placeholder="Security Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ 
                  width: '100%', 
                  padding: '16px 16px 16px 48px', 
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent-cyan)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
              />
            </div>
            
            <button 
              type="submit"
              className="btn-primary"
              style={{ 
                width: '100%', 
                padding: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '10px',
                fontSize: '1rem',
                marginTop: '10px',
                letterSpacing: '1px'
              }}
            >
              <LogIn size={20} /> AUTHENTICATE
            </button>
          </form>
        </div>
      </div>
    );
  }

  // If authenticated, show full admin layout matching user UI
  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AdminNavbar />
      <main className="container" style={{ flex: 1, paddingTop: '120px', paddingBottom: '40px' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
