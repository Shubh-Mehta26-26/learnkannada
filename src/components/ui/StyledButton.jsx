import React from 'react';
import { motion } from 'framer-motion';

const StyledButton = ({ children, className = "", ...props }) => (
  <motion.button
    whileHover={{ scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
      y: -2
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2, ease: "easeInOut" }}
    className={`px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

export default StyledButton;
