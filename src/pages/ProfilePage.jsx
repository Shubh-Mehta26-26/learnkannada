import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import EditProfileModal from '../components/ui/EditProfileModal';
import { useAppContext } from '../context/AppContext';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeInOut"
    },
  }),
};

const ProfilePage = () => {
  const { user } = useAppContext();
  const [isEditing, setIsEditing] = useState(false); // State to control modal

  const badges = [
    { icon: "🎓", name: "First Lesson" },
    { icon: "🗣️", name: "Speaker" },
    { icon: "🔥", name: "5-Day Streak" },
    { icon: "🧠", name: "Vocab Wiz" },
  ];

  return (
    <>
      <div className="container mx-auto py-16 px-6 text-white">
        <h1 className="text-5xl font-bold text-center mb-12">Your Profile</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <GlassCard className="md:col-span-1 flex flex-col items-center text-center">
            <img 
              src={user.avatar} 
              alt="Avatar" 
              className="w-32 h-32 rounded-full mb-4 border-4 border-white/50 object-cover"
              onError={(e) => { e.target.src = 'https://placehold.co/100x100/E2E8F0/A0AEC0?text=👤'; }} // Fallback
            />
            <h2 className="text-3xl font-semibold text-white">{user.name}</h2>
            <p className="text-lg text-gray-200">Level {user.level}</p>
            <motion.button
              onClick={() => setIsEditing(true)} // Open modal on click
              className="mt-4 px-4 py-2 text-sm bg-white/50 rounded-lg hover:bg-white/70 text-gray-900"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Edit Profile
            </motion.button>
          </GlassCard>

          {/* Stats */}
          <GlassCard className="md:col-span-2">
            <h3 className="text-2xl font-semibold text-white mb-6">Your Stats</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-black/20 rounded-lg">
                <p className="text-lg text-gray-200">Total XP</p>
                <p className="text-4xl font-bold text-white">{user.xp}</p>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-lg">
                <p className="text-lg text-gray-200">Current Streak</p>
                <p className="text-4xl font-bold text-white">{user.streak} 🔥</p>
              </div>
               <div className="text-center p-4 bg-black/20 rounded-lg">
                <p className="text-lg text-gray-200">Level</p>
                <p className="text-4xl font-bold text-white">{user.level}</p>
              </div>
               <div className="text-center p-4 bg-black/20 rounded-lg">
                <p className="text-lg text-gray-200">Games Played</p>
                <p className="text-4xl font-bold text-white">14</p> {/* Mock */}
              </div>
            </div>
          </GlassCard>

          {/* Badges */}
          <GlassCard className="md:col-span-3">
             <h3 className="text-2xl font-semibold text-white mb-6">Badges Earned 🏆</h3>
             <div className="flex flex-wrap gap-4">
              {badges.map((badge, i) => (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className="flex flex-col items-center p-4 bg-black/20 rounded-lg w-32"
                  title={badge.name}
                >
                  <span className="text-5xl mb-2">{badge.icon}</span>
                  <p className="text-sm text-white text-center">{badge.name}</p>
                </motion.div>
              ))}
             </div>
          </GlassCard>
        </div>
      </div>
      
      {/* Render the modal */}
      <EditProfileModal 
        show={isEditing}
        onClose={() => setIsEditing(false)}
      />
    </>
  );
};

export default ProfilePage;
