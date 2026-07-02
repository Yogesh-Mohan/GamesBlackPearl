"use client";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Play, ChevronRight, Users, Trophy, Server, X } from 'lucide-react';
import './Home.css';

const Home = () => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const bgVideoRef = useRef(null);

  // Loop the background video from 30s to 45s (the action peak)
  const handleTimeUpdate = () => {
    if (bgVideoRef.current && bgVideoRef.current.currentTime >= 45) {
      bgVideoRef.current.currentTime = 30;
      bgVideoRef.current.play();
    }
  };

  const handleLoadedMetadata = () => {
    if (bgVideoRef.current) {
      bgVideoRef.current.currentTime = 30;
    }
  };

  return (
    <div className="home-page">
      {/* Trailer Modal */}
      <AnimatePresence>
        {isTrailerOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="trailer-modal"
          >
            <div className="trailer-modal-backdrop" onClick={() => setIsTrailerOpen(false)}></div>
            <div className="trailer-modal-content">
              <button className="close-modal-btn" onClick={() => setIsTrailerOpen(false)}>
                <X size={32} color="#fff" />
              </button>
              <video controls autoPlay className="full-trailer-video">
                <source src="/trailer.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="hero-section">
        <video 
          ref={bgVideoRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          className="hero-background-video" 
          autoPlay 
          muted 
          playsInline
        >
          <source src="/trailer.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text-container"
          >
            <h1 className="hero-title text-gradient">FORGE YOUR DESTINY</h1>
            <p className="hero-subtitle">
              Experience the next generation of AAA gaming. Immersive worlds, competitive multiplayer, and groundbreaking graphics await.
            </p>
            <div className="hero-actions">
              <button className="btn-primary">
                <Play size={20} className="inline-icon" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Play Now Free
              </button>
              <button className="btn-secondary" onClick={() => setIsTrailerOpen(true)}>View Trailer</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Game Features Showcase */}
      <section className="showcase-section container">
        <div className="section-header">
          <h2>Core Features</h2>
          <Link href="/media-gallery" className="view-all-link">View Media <ChevronRight size={16} /></Link>
        </div>
        <div className="showcase-grid">
          {[
            { title: 'Intense Combat', desc: 'Master a deep, rewarding combat system with thousands of possible loadouts.' },
            { title: 'Vast Open World', desc: 'Explore a sprawling sci-fi universe filled with hidden secrets and dynamic events.' },
            { title: 'Competitive PvP', desc: 'Test your skills against players worldwide in ranked matchmaking arenas.' }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              className="game-card glass-panel"
            >
              <div className="game-card-image placeholder-img">
                <div className="image-overlay">
                  <Play size={40} className="play-icon" />
                </div>
              </div>
              <div className="game-card-content">
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
                <div className="game-card-actions">
                  <button className="btn-secondary btn-sm" onClick={() => setIsTrailerOpen(true)}>Watch Video</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-card glass-panel">
            <Users size={40} className="stat-icon" color="var(--color-accent-cyan)" />
            <h3 className="text-gradient">25M+</h3>
            <p>Active Players</p>
          </div>
          <div className="stat-card glass-panel">
            <Server size={40} className="stat-icon" color="var(--color-accent-purple)" />
            <h3 className="text-gradient">99.9%</h3>
            <p>Server Uptime</p>
          </div>
          <div className="stat-card glass-panel">
            <Trophy size={40} className="stat-icon" color="var(--color-electric-blue)" />
            <h3 className="text-gradient">15+</h3>
            <p>Industry Awards</p>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="news-section container">
        <div className="section-header">
          <h2>Latest Transmissions</h2>
          <Link href="/news" className="view-all-link">All News <ChevronRight size={16} /></Link>
        </div>
        <div className="news-grid">
          {[1, 2].map((i) => (
            <div key={i} className="news-card glass-panel">
              <div className="news-content">
                <span className="news-date">June 30, 2026</span>
                <h3>Neon Protocol: Update v2.4 Patch Notes</h3>
                <p>New weapons, balance changes, and the introduction of the Cyber-Ninja class in this massive mid-season update.</p>
                <Link href="/news" className="read-more">Read More <ChevronRight size={14}/></Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
