import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const floatingVariant = {
  animate: {
    y: ["-5px", "5px"],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

const WorkingAboutPageAnimation = () => {
  return (
    <motion.div
      className="relative w-full h-64 flex items-center justify-center overflow-hidden bg-gray-800/50 rounded-2xl border border-gray-700 p-6"
    >
      <motion.div
        className="relative w-48 h-48 flex items-center justify-center"
        variants={floatingVariant}
        animate="animate"
      >
        {/* Pulsing circles */}
        {[0, 0.5, 1].map((delay, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.2, opacity: [0, 0.1, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut",
            }}
            style={{ width: 100 + i * 40, height: 100 + i * 40 }}
          />
        ))}
        {/* Central Icon */}
        <motion.div
          className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center shadow-lg border border-white/20 backdrop-blur-md"
        >
          <BookOpen className="w-12 h-12 text-white" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WorkingAboutPageAnimation;
