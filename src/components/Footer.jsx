import Link from 'next/link';
import { Globe, MessageCircle, Share2, Video, Tv } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <h2 className="text-gradient">BLACK PEARL</h2>
          <p className="footer-tagline">Forging Next-Gen Gaming Experiences.</p>
          <div className="social-links">
            <a href="#" className="social-icon"><MessageCircle size={20} /></a>
            <a href="#" className="social-icon"><Video size={20} /></a>
            <a href="#" className="social-icon"><Tv size={20} /></a>
            <a href="#" className="social-icon"><Share2 size={20} /></a>
            <a href="#" className="social-icon"><Globe size={20} /></a>
          </div>
        </div>

        <div className="footer-links-group">
          <h3>The Game</h3>
          <Link href="/downloads">Download</Link>
          <Link href="/news">Patch Notes</Link>
        </div>

        <div className="footer-links-group">
          <h3>Community</h3>
          <Link href="/community-voting">Voting</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/media-gallery">Media</Link>
        </div>

        <div className="footer-links-group">
          <h3>Support</h3>
          <Link href="/bug-reports">Report a Bug</Link>
          <Link href="/contact">Contact Us</Link>
          <a href="#">FAQ</a>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} Black Pearl Games. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
