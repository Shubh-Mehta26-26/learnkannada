import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, Sparkles } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { useAppContext } from '../../context/AppContext';

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

const conversationList = [
  { english: "How are you?", kannada: "ನೀವು ಹೇಗಿದ್ದೀರಿ? (Neevu Heggiddiri?)" },
  { english: "What is your name?", kannada: "ನಿಮ್ಮ ಹೆಸರು ಏನು? (Nimma Hesaru Enu?)" },
  { english: "My name is...", kannada: "ನನ್ನ ಹೆಸರು... (Nanna Hesaru...)" },
  { english: "Nice to meet you.", kannada: "ನಿಮ್ಮನ್ನು ಭೇಟಿ ಮಾಡಿ ಸಂತೋಷವಾಯಿತು." },
  { english: "Where are you from?", kannada: "ನೀವು ಎಲ್ಲಿಂದ ಬಂದಿದ್ದೀರಿ?" },
  { english: "How much is this?", kannada: "ಇದರ ಬೆಲೆ ಎಷ್ಟು? (Idara Bele Eshtu?)" },
  { english: "I don't understand.", kannada: "ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ. (Nanage Arthavagalilla)" },
];

const speak = (text, lang = 'kn-IN') => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser doesn't support Text-to-Speech.");
  }
};

const ConversationCards = ({ onExplain }) => {
  const { addXp } = useAppContext();

  const handlePractice = () => {
    // In a real app, this would navigate to the Speak & Learn
    // tab with the selected phrase.
    alert("Practice feature coming soon! Click the audio icon for now.");
  };

  return (
    <GlassCard>
      <h2 className="text-3xl font-semibold mb-6 text-center text-white">Daily Conversation Cards</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {conversationList.map((convo, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={i}
            className="p-5 bg-black/20 rounded-xl flex flex-col justify-between"
          >
            <div>
              <p className="text-lg text-gray-200 mb-2">{convo.english}</p>
              <p className="text-2xl font-bold text-white">{convo.kannada}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-2">
                 <motion.button
                  onClick={() => onExplain(convo.kannada, convo.english)}
                  className="p-2 bg-purple-500 rounded-full hover:bg-purple-600"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Get AI Explanation"
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </motion.button>
                <motion.button
                  onClick={() => { speak(convo.kannada); addXp(1); }}
                  className="p-2 bg-blue-500 rounded-full hover:bg-blue-600"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Listen"
                >
                  <Volume2 className="w-5 h-5 text-white" />
                </motion.button>
              </div>
              <motion.button
                onClick={handlePractice}
                className="px-4 py-2 text-sm bg-green-600 rounded-lg hover:bg-green-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Practice Speaking
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
};

export default ConversationCards;
