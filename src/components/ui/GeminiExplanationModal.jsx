import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';

const GeminiExplanationModal = ({ show, onClose, title, content, isLoading }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg p-6 border border-gray-700"
            onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-white">
                ✨ AI Explanation for <span className="text-purple-400">{title}</span>
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="text-gray-200">
              {isLoading ? (
                <div className="flex items-center justify-center h-24">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
                  <p className="ml-3 text-lg">Gemini is thinking...</p>
                </div>
              ) : (
                <p>{content}</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GeminiExplanationModal;
