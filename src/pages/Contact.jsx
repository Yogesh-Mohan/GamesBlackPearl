"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MessageSquare, User, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="contact-page-wrapper">
      {/* Background ambient glow */}
      <div className="ambient-glow top-glow"></div>
      <div className="ambient-glow bottom-glow"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="container mx-auto px-6"
        style={{ paddingTop: '140px', paddingBottom: '100px', minHeight: '100vh', position: 'relative', zIndex: 10 }}
      >
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-1 rounded-full border border-[#00e5ff]/30 bg-[#00e5ff]/5 text-[#00e5ff] text-sm font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
          >
            Direct Uplink
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00e5ff] to-white tracking-tight font-heading drop-shadow-lg">
            TRANSMISSION LINK
          </h1>
          <p className="text-[#a0a0b0] mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            Need to report a critical server fault, discuss a partnership, or just chat with the developers? Establish a direct link to the Black Pearl Games network below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          
          {/* Info Panel (Left side) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="premium-panel p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00e5ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex items-start gap-6 mb-12 relative z-10">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#0f0f15] border border-[#1f1f2e] flex items-center justify-center text-[#00e5ff] shadow-[0_0_20px_rgba(0,229,255,0.15)] group-hover:scale-110 group-hover:border-[#00e5ff]/50 transition-all duration-300 mt-1">
                  <Mail size={24} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold text-white font-heading tracking-wider mb-2">DIRECT EMAIL</h3>
                  <a href="mailto:gamesblackpearl07@gmail.com" className="text-[#a0a0b0] hover:text-[#00e5ff] transition-colors duration-300 text-lg">
                    gamesblackpearl07@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 relative z-10">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#0f0f15] border border-[#1f1f2e] flex items-center justify-center text-[#b500ff] shadow-[0_0_20px_rgba(181,0,255,0.15)] group-hover:scale-110 group-hover:border-[#b500ff]/50 transition-all duration-300 mt-1">
                  <MessageSquare size={24} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold text-white font-heading tracking-wider mb-2">SUPPORT WAIT TIMES</h3>
                  <p className="text-[#a0a0b0] leading-relaxed text-lg">
                    Our support operatives typically respond within <br/><span className="text-white font-medium">24-48 standard cycles</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="hidden lg:block premium-panel p-6 rounded-2xl flex-grow opacity-50 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00e5ff]/30 to-transparent"></div>
               <div className="font-mono text-xs text-[#4a4a5e] leading-loose space-y-1">
                 <p>{'>'} INITIATING SECURE HANDSHAKE...</p>
                 <p>{'>'} BYPASSING FIREWALL [OK]</p>
                 <p>{'>'} ENCRYPTING PACKETS...</p>
                 <p className="text-[#00e5ff]/50 animate-pulse">{'>'} LINK ESTABLISHED</p>
               </div>
            </div>
          </motion.div>

          {/* Form Panel (Right side) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-3 premium-panel p-8 md:p-10 rounded-2xl relative"
          >
            {status === 'success' ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                  <CheckCircle size={40} className="text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-white font-heading mb-3">Transmission Sent</h2>
                <p className="text-[#8a8a9e] max-w-md">Your encrypted message has been successfully routed to our mainframe. Operatives will review it shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5a5a6e] group-focus-within:text-[#00e5ff] transition-colors">
                      <User size={18} />
                    </div>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Operative Name" 
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="premium-input"
                    />
                  </div>

                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5a5a6e] group-focus-within:text-[#00e5ff] transition-colors">
                      <Mail size={18} />
                    </div>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Comms Email" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="premium-input"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5a5a6e] group-focus-within:text-[#00e5ff] transition-colors">
                    <MessageSquare size={18} />
                  </div>
                  <input 
                    type="text" 
                    name="subject"
                    placeholder="Subject Directive" 
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="premium-input"
                  />
                </div>

                <div className="relative group">
                  <textarea 
                    name="message"
                    placeholder="Enter transmission log..." 
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="premium-input px-5 py-4 resize-none"
                  ></textarea>
                </div>

                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-red-400 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                    <AlertCircle size={18} className="flex-shrink-0" />
                    <span className="text-sm">{errorMessage}</span>
                  </motion.div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="premium-submit-btn mt-2"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === 'loading' ? 'ENCRYPTING PACKETS...' : 'SEND TRANSMISSION'}
                    {!status && <Send size={18} />}
                  </span>
                  <div className="btn-glow"></div>
                </button>

              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
