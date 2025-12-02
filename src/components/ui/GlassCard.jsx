import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "", ...props }) => (
  <motion.div
    className={`bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

export default GlassCard;
