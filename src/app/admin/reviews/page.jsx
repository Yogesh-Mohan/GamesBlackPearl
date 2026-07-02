"use client";

import { MessageSquare, Trash2, EyeOff, Eye, Star, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import '../../../pages/Home.css';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);

  const handleDelete = (id) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  const handleHide = (id) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status: review.status === 'hidden' ? 'active' : 'hidden' } : review
    ));
  };

  const handleFeature = (id) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, featured: !review.featured } : review
    ));
  };

  return (
    <div className="admin-reviews-page">
      {/* Header */}
      <div className="section-header" style={{ paddingTop: '0', paddingBottom: '20px', borderBottom: '1px solid var(--glass-border)', marginBottom: '30px' }}>
        <div>
          <h2 style={{ fontSize: '2rem' }}>Reviews Management</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>Monitor and moderate community feedback.</p>
        </div>
        <div className="glass-panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <MessageSquare color="var(--color-accent-cyan)" size={20} />
          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{reviews.length} Total Reviews</span>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="glass-panel" style={{ padding: '20px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>User & Game</th>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Rating</th>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Review Content</th>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Date</th>
              <th style={{ padding: '15px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', opacity: review.status === 'hidden' ? 0.5 : 1 }}>
                <td style={{ padding: '15px' }}>
                  <div style={{ fontWeight: 'bold' }}>{review.user}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-accent-cyan)', marginTop: '4px' }}>{review.game}</div>
                </td>
                <td style={{ padding: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        color={i < review.rating ? '#facc15' : '#374151'}
                        fill={i < review.rating ? '#facc15' : 'none'}
                      />
                    ))}
                  </div>
                </td>
                <td style={{ padding: '15px', maxWidth: '250px' }}>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0 }} title={review.content}>
                    {review.content}
                  </p>
                </td>
                <td style={{ padding: '15px', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                  {review.date}
                </td>
                <td style={{ padding: '15px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleFeature(review.id)}
                      className="btn-secondary" 
                      style={{ 
                        padding: '6px', minWidth: 'auto', 
                        border: `1px solid ${review.featured ? 'rgba(250,204,21,0.5)' : 'var(--glass-border)'}`,
                        background: review.featured ? 'rgba(250,204,21,0.1)' : 'transparent'
                      }} 
                      title={review.featured ? "Unfeature Review" : "Feature Review"}
                    >
                      <Star size={16} color={review.featured ? '#facc15' : 'var(--color-text-secondary)'} fill={review.featured ? '#facc15' : 'none'} />
                    </button>
                    <button 
                      onClick={() => handleHide(review.id)}
                      className="btn-secondary" 
                      style={{ padding: '6px', minWidth: 'auto', border: '1px solid var(--glass-border)' }} 
                      title={review.status === 'hidden' ? "Unhide Review" : "Hide Review"}
                    >
                      {review.status === 'hidden' ? <Eye size={16} color="var(--color-text-secondary)" /> : <EyeOff size={16} color="var(--color-text-secondary)" />}
                    </button>
                    <button 
                      onClick={() => handleDelete(review.id)}
                      className="btn-secondary" 
                      style={{ padding: '6px', minWidth: 'auto', border: '1px solid var(--glass-border)' }} 
                      title="Delete Review"
                    >
                      <Trash2 size={16} color="#ef4444" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {reviews.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
