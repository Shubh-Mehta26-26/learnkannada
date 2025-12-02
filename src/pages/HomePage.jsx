import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gamepad2, Mic } from 'lucide-react';

const StyledButton = ({ children, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
      y: -2
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2, ease: "easeInOut" }}
    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg"
    {...props}
  >
    {children}
  </motion.button>
);

const HomePage = ({ onStartLearning }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 text-white overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-2xl md:text-3xl font-light text-purple-300 tracking-wider mb-4 uppercase"
      >
        Namaskara! 🙏 Welcome to
      </motion.h2>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-6xl md:text-8xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200"
      >
        LearnKannada
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
      >
        Master the language of Karnataka with our <span className="text-purple-400 font-semibold">AI-powered</span>, gamified platform. Start your journey from zero to fluency today! 🚀
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8, type: "spring", stiffness: 150 }}
      >
        <StyledButton onClick={onStartLearning}>
          Start Learning Now
        </StyledButton>
      </motion.div>

      {/* Feature Highlights */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
      >
        {[
          { icon: <Sparkles className="w-5 h-5 text-yellow-400" />, text: "AI Tutor" },
          { icon: <Gamepad2 className="w-5 h-5 text-green-400" />, text: "Fun Games" },
          { icon: <Mic className="w-5 h-5 text-red-400" />, text: "Voice Practice" },
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-center space-x-3 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-lg hover:bg-white/10 transition-colors">
            {item.icon}
            <span className="font-medium text-white/90">{item.text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HomePage;
