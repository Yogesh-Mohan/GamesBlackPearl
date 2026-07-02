"use client";
import { motion } from 'framer-motion';

const Reviews = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="page-container container"
      style={{ paddingTop: '120px', minHeight: '80vh' }}
    >
      <h1 className="text-gradient">Reviews</h1>
      <p>This is the Reviews page. The UI will be implemented here.</p>
    </motion.div>
  );
};

export default Reviews;

