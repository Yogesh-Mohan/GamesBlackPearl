"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut } from 'lucide-react';
import '../Navbar.css';
import { useAuth } from '../../context/AuthContext';

const AdminNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Games', path: '/admin/games' },
    { name: 'Downloads', path: '/admin/downloads' },
    { name: 'Reviews', path: '/admin/reviews' },
    { name: 'Bugs', path: '/admin/bug-reports' },
    { name: 'News', path: '/admin/news' },
    { name: 'Settings', path: '/admin/settings' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container container">
        <Link href="/admin" className="navbar-logo text-gradient" style={{ fontSize: '1.2rem' }}>
          BLACK PEARL <span style={{ fontSize: '0.8rem', color: '#00e5ff', marginLeft: '5px' }}>ADMIN</span>
        </Link>

        <div className="navbar-links desktop-only">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              className={`nav-link ${pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          
          <button 
            onClick={logout}
            className="btn-secondary" 
            style={{ padding: '4px 12px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <LogOut size={14} /> Logout
          </button>
        </div>

        <button 
          className="mobile-menu-btn mobile-only"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} color="#fff" /> : <Menu size={28} color="#fff" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu glass-panel">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              className={`mobile-nav-link ${pathname === link.path ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          <button 
            onClick={() => {
              logout();
              setIsMobileMenuOpen(false);
            }}
            className="mobile-nav-link"
            style={{ color: '#ff4444', border: 'none', background: 'none', textAlign: 'left' }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
