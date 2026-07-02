"use client";

import { MessageSquare, Trash2, EyeOff, Star, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

export default function AdminReviewsPage() {
  // Mock data for reviews
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Reviews Management</h1>
          <p className="text-gray-400">Monitor and moderate community feedback.</p>
        </div>
        <div className="bg-[#0f0f15] border border-[#1f1f2e] px-4 py-2 rounded-lg flex items-center gap-3">
          <MessageSquare className="text-[#00e5ff]" size={20} />
          <span className="text-sm text-gray-300">{reviews.length} Total Reviews</span>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-[#0a0a0f] border border-[#1f1f2e] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0f0f15] border-b border-[#1f1f2e]">
                <th className="p-4 text-gray-400 font-semibold text-sm">User & Game</th>
                <th className="p-4 text-gray-400 font-semibold text-sm">Rating</th>
                <th className="p-4 text-gray-400 font-semibold text-sm">Review Content</th>
                <th className="p-4 text-gray-400 font-semibold text-sm">Date</th>
                <th className="p-4 text-gray-400 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f2e]">
              {reviews.map((review) => (
                <tr key={review.id} className={`hover:bg-[#151520] transition-colors ${review.status === 'hidden' ? 'opacity-50' : ''}`}>
                  <td className="p-4">
                    <p className="text-white font-bold">{review.user}</p>
                    <p className="text-xs text-[#00e5ff] mt-1">{review.game}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} 
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-4 max-w-xs">
                    <p className="text-gray-300 text-sm truncate" title={review.content}>
                      {review.content}
                    </p>
                  </td>
                  <td className="p-4 text-sm text-gray-400">
                    {review.date}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleFeature(review.id)}
                        className={`p-2 rounded-lg border transition-colors ${
                          review.featured 
                            ? 'bg-yellow-400/10 border-yellow-400/50 text-yellow-400' 
                            : 'bg-[#151520] border-[#1f1f2e] text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50'
                        }`}
                        title={review.featured ? "Unfeature Review" : "Feature Review"}
                      >
                        <Star size={16} className={review.featured ? "fill-yellow-400" : ""} />
                      </button>
                      <button 
                        onClick={() => handleHide(review.id)}
                        className="p-2 bg-[#151520] border border-[#1f1f2e] rounded-lg text-gray-400 hover:text-white transition-colors"
                        title={review.status === 'hidden' ? "Unhide Review" : "Hide Review"}
                      >
                        <EyeOff size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(review.id)}
                        className="p-2 bg-[#151520] border border-[#1f1f2e] rounded-lg text-gray-400 hover:text-red-400 hover:border-red-400/50 transition-colors"
                        title="Delete Review"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button 
                        className="p-2 bg-[#151520] border border-[#1f1f2e] rounded-lg text-gray-400 hover:text-orange-400 hover:border-orange-400/50 transition-colors"
                        title="Mark as Spam"
                      >
                        <ShieldAlert size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {reviews.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-400">
                    No reviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
