"use client";
import { motion } from 'framer-motion';

const News = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="page-container container"
      style={{ paddingTop: '120px', minHeight: '80vh' }}
    >
      <h1 className="text-gradient">News</h1>
      <p>This is the News page. The UI will be implemented here.</p>
    </motion.div>
  );
};

export default News;

