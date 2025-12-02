import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { useAppContext } from '../../context/AppContext';

const conversationList = [
  { english: "How are you?", kannada: "ನೀವು ಹೇಗಿದ್ದೀರಿ? (Neevu Heggiddiri?)" },
  { english: "What is your name?", kannada: "ನಿಮ್ಮ ಹೆಸರು ಏನು? (Nimma Hesaru Enu?)" },
  { english: "My name is...", kannada: "ನನ್ನ ಹೆಸರು... (Nanna Hesaru...)" },
  { english: "Nice to meet you.", kannada: "ನಿಮ್ಮನ್ನು ಭೇಟಿ ಮಾಡಿ ಸಂತೋಷವಾಯಿತು." },
  { english: "Where are you from?", kannada: "ನೀವು ಎಲ್ಲಿಂದ ಬಂದಿದ್ದೀರಿ?" },
  { english: "How much is this?", kannada: "ಇದರ ಬೆಲೆ ಎಷ್ಟು? (Idara Bele Eshtu?)" },
  { english: "I don't understand.", kannada: "ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ. (Nanage Arthavagalilla)" },
];

const SpeakAndLearn = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState(null); // { score: 85, message: "Great!" }
  const [phrase, setPhrase] = useState(conversationList[0]);
  const { addXp } = useAppContext();

  const handlePractice = () => {
    if (isRecording) return;
    setIsRecording(true);
    setFeedback(null);

    // SIMULATE RECORDING & AI ANALYSIS
    setTimeout(() => {
      const mockScore = Math.floor(Math.random() * 50) + 50; // Score between 50-100
      let message = "";
      let emoji = "";

      if (mockScore > 90) {
        message = "Excellent! Perfect pronunciation! 🌟";
        emoji = "🥳";
        addXp(50);
      } else if (mockScore > 75) {
        message = "Great job! Very close! 👍";
        emoji = "😊";
        addXp(25);
      } else {
        message = "Good try! Keep practicing! 💪";
        emoji = "🤔";
        addXp(10);
      }
      
      setFeedback({ score: mockScore, message, emoji });
      setIsRecording(false);
      
      // Load next phrase
      const currentIndex = conversationList.findIndex(p => p.kannada === phrase.kannada);
      const nextIndex = (currentIndex + 1) % conversationList.length;
      setPhrase(conversationList[nextIndex]);

    }, 2500); // Simulate 2.5 seconds of analysis
  };

  return (
    <GlassCard>
      <h2 className="text-3xl font-semibold mb-6 text-center text-white">Speak & Learn Practice</h2>
      <div className="text-center p-8 bg-black/20 rounded-xl">
        <p className="text-lg text-gray-200 mb-2">Practice this phrase:</p>
        <p className="text-3xl font-bold text-white mb-4">{phrase.kannada}</p>
        <p className="text-xl text-gray-300 mb-8">"{phrase.english}"</p>

        <motion.button
          onClick={handlePractice}
          disabled={isRecording}
          className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all duration-300
            ${isRecording ? 'bg-red-700 animate-pulse' : 'bg-red-500 hover:bg-red-600'}
          `}
          whileHover={{ scale: isRecording ? 1 : 1.1 }}
          whileTap={{ scale: isRecording ? 1 : 0.9 }}
        >
          <Mic className="w-12 h-12 text-white" />
        </motion.button>
        <p className="text-lg text-white mt-4">{isRecording ? "Listening..." : "Tap to Speak"}</p>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="mt-8 p-6 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl text-center"
          >
            <span className="text-6xl">{feedback.emoji}</span>
            <p className="text-4xl font-bold text-white mt-2">Score: {feedback.score}%</p>
            <p className="text-xl text-white mt-2">{feedback.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
};

export default SpeakAndLearn;
