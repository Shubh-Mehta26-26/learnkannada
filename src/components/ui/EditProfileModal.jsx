import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const EditProfileModal = ({ show, onClose }) => {
  const { user, setUser } = useAppContext();
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);

  // Update local state if user prop changes (e.g., reset on open)
  useEffect(() => {
    if (show) {
      setName(user.name);
      setAvatar(user.avatar);
    }
  }, [show, user.name, user.avatar]);

  const handleSave = () => {
    setUser(prevUser => ({
      ...prevUser,
      name: name || "Learner", // Add fallback
      avatar: avatar || "https://placehold.co/100x100/E2E8F0/A0AEC0?text=👤" // Add fallback
    }));
    onClose();
  };

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
            className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6 border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-white">
                Edit Your Profile
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Avatar URL</label>
                <input
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://placehold.co/..."
                />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <motion.button
                onClick={handleSave}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save Changes
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;
