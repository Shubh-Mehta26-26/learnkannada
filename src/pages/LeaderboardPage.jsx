import React from 'react';
import { motion } from 'framer-motion';
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

const LeaderboardPage = () => {
  const { user } = useAppContext();
  
  const leaders = [
    { rank: 1, name: "Shubham Mehta", xp: 1250, badge: "🥇" },
    { rank: 2, name: "Jay Singh", xp: 1120, badge: "🥈" },
    { rank: 3, name:"Learner (You)", xp: user.xp, badge: "🥉" },
    { rank: 4, name: "Priyanshu", xp: 950, badge: "⭐" },
    { rank: 5, name: "Sharwan Gautam", xp: 820, badge: "⭐" },
  ].sort((a, b) => b.xp - a.xp);

  return (
    <div className="container mx-auto py-16 px-6 text-white">
      <h1 className="text-5xl font-bold text-center mb-12">Leaderboard</h1>
      <div className="max-w-3xl mx-auto">
        {leaders.map((leader, i) => (
          <motion.div
            key={leader.name}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={i}
            className={`flex items-center p-5 rounded-xl mb-4
              ${leader.name.includes("You") ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-white/30"}
            `}
          >
            <span className="text-3xl font-bold w-12">{leader.badge}</span>
            <img src={`https://placehold.co/50x50/E2E8F0/A0AEC0?text=${leader.name[0]}`} alt={leader.name} className="w-12 h-12 rounded-full mr-4 border-2 border-white/50" />
            <div className="flex-grow">
              <p className="text-xl font-semibold text-white">{leader.name}</p>
            </div>
            <p className="text-2xl font-bold text-white">{leader.xp} XP</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardPage;
