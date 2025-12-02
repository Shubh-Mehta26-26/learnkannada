import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Loader2, LayoutDashboard } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { useAppContext } from '../context/AppContext';
import { callGeminiApi } from '../services/gemini';

const DashboardPage = () => {
  const { user } = useAppContext();
  const xpForNextLevel = (user.level * 100);
  const xpProgress = (user.xp % 100); // XP within the current level
  
  const [studyPlan, setStudyPlan] = useState("");
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);

  const handleGetStudyPlan = async () => {
    setIsLoadingPlan(true);
    setStudyPlan("");

    const prompt = `You are an encouraging AI language coach for a student learning Kannada. 
    Their current stats are: Level ${user.level}, XP ${user.xp}, Streak ${user.streak} days. 
    Based on this, give them a short (1-paragraph) motivational message and suggest ONE specific, 
    simple thing they should practice next (e.g., "practice 5 new vocabulary words," "try the 'Speak & Win' game").
    Start with a friendly greeting! Respond in English.`;

    const plan = await callGeminiApi(prompt);
    setStudyPlan(plan);
    setIsLoadingPlan(false);
  };

  return (
    <div className="container mx-auto py-16 px-6 text-white">
      <h1 className="text-5xl font-bold text-center mb-12">Your Dashboard</h1>
      
      <GlassCard className="mb-8 text-center">
        <h2 className="text-3xl font-semibold text-white">Welcome back, {user.name}!</h2>
        <p className="text-lg text-gray-200">You are on a {user.streak}-day streak! 🔥</p>
      </GlassCard>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Progress Card */}
        <GlassCard className="md:col-span-2">
          <h3 className="text-2xl font-semibold text-white mb-4">Your Progress</h3>
          <div className="mb-4">
            <div className="flex justify-between text-lg text-white mb-1">
              <span>Level {user.level}</span>
              <span>Level {user.level + 1}</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-4">
              <motion.div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>
            <p className="text-center text-white mt-2">{user.xp % 100} / 100 XP</p>
          </div>
          <p className="text-gray-200">Total XP: <span className="font-bold text-white">{user.xp}</span></p>
        </GlassCard>

        {/* Stats Card */}
        <GlassCard className="flex flex-col items-center justify-center">
           <Zap className="w-16 h-16 text-yellow-300 mb-4" />
           <h3 className="text-2xl font-semibold text-white">Daily Streak</h3>
           <p className="text-6xl font-bold text-white">{user.streak}</p>
           <p className="text-lg text-gray-200">days</p>
        </GlassCard>
        
        {/* Other stats */}
        <GlassCard>
           <h3 className="text-2xl font-semibold text-white mb-4">Completed Lessons</h3>
           <p className="text-6xl font-bold text-white">12</p> {/* Mock data */}
        </GlassCard>
        <GlassCard>
           <h3 className="text-2xl font-semibold text-white mb-4">Avg. Pronunciation</h3>
           <p className="text-6xl font-bold text-white">82%</p> {/* Mock data */}
        </GlassCard>

        {/* AI Recommendation Card (Now with Gemini) */}
        <GlassCard>
           <h3 className="text-2xl font-semibold text-white mb-4">✨ AI Study Plan</h3>
           {isLoadingPlan ? (
             <div className="flex items-center justify-center h-24">
                <Loader2 className="w-6 h-6 animate-spin text-white" />
                <p className="ml-3 text-gray-200">Generating plan...</p>
             </div>
           ) : studyPlan ? (
             <p className="text-gray-100">{studyPlan}</p>
           ) : (
             <motion.button
                onClick={handleGetStudyPlan}
                disabled={isLoadingPlan}
                className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg disabled:opacity-50 flex items-center justify-center"
                whileHover={{ scale: isLoadingPlan ? 1 : 1.05 }}
                whileTap={{ scale: isLoadingPlan ? 1 : 0.95 }}
              >
                Get My AI Study Plan
             </motion.button>
           )}
        </GlassCard>
      </div>
    </div>
  );
};

export default DashboardPage;
