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

const vocabList = [
  { kannada: "ನಮಸ್ಕಾರ", english: "Hello", emoji: "👋", example: "ನಮಸ್ಕಾರ, ನೀವು ಹೇಗಿದ್ದೀರಿ?", pairId: "hello" },
  { kannada: "ಧನ್ಯವಾದ", english: "Thank you", emoji: "🙏", example: "ನಿಮ್ಮ ಸಹಾಯಕ್ಕೆ ಧನ್ಯವಾದ.", pairId: "thanks" },
  { kannada: "ಹೌದು", english: "Yes", emoji: "👍", example: "ಹೌದು, ನನಗೆ ಬೇಕು.", pairId: "yes" },
  { kannada: "ಇಲ್ಲ", english: "No", emoji: "👎", example: "ಇಲ್ಲ, ನನಗೆ ಬೇಡ.", pairId: "no" },
  { kannada: "ನೀರು", english: "Water", emoji: "💧", example: "ದಯವಿಟ್ಟು ನೀರು ಕೊಡಿ.", pairId: "water" },
  { kannada: "ಊಟ", english: "Food/Meal", emoji: "🍲", example: "ಊಟ ಆಯಿತಾ?", pairId: "food" },
  // New Words
  { kannada: "ಮನೆ", english: "House", emoji: "🏠", example: "ಇದು ನನ್ನ ಮನೆ. (Idu nanna mane)", pairId: "house" },
  { kannada: "ಹೆಸರು", english: "Name", emoji: "📛", example: "ನಿಮ್ಮ ಹೆಸರು ಏನು? (Nimma hesaru enu?)", pairId: "name" },
  { kannada: "ಸ್ನೇಹಿತ", english: "Friend", emoji: "🤝", example: "ಅವನು ನನ್ನ ಸ್ನೇಹಿತ. (Avanu nanna snehitha)", pairId: "friend" },
  { kannada: "ಹಣ", english: "Money", emoji: "💰", example: "ಹಣ ಇಲ್ಲ. (Hana illa)", pairId: "money" },
  { kannada: "ಅಂಗಡಿ", english: "Shop", emoji: "🏪", example: "ಅಂಗಡಿ ಎಲ್ಲಿದೆ? (Angadi ellide?)", pairId: "shop" },
  { kannada: "ಬನ್ನಿ", english: "Come", emoji: "👋", example: "ಒಳಗೆ ಬನ್ನಿ. (Olage banni)", pairId: "come" },
  { kannada: "ಹೋಗಿ", english: "Go", emoji: "🚶", example: "ನಾಳೆ ಹೋಗಿ. (Naale hogi)", pairId: "go" },
  { kannada: "ಬಸ್ಸು", english: "Bus", emoji: "🚌", example: "ಬಸ್ಸು ಬಂತು. (Bassu bantu)", pairId: "bus" },
  { kannada: "ಸಮಯ", english: "Time", emoji: "⏰", example: "ಸಮಯ ಎಷ್ಟು? (Samaya eshtu?)", pairId: "time" },
  { kannada: "ಊರು", english: "Hometown/City", emoji: "🏙️", example: "ನಿಮ್ಮ ಊರು ಯಾವುದು? (Nimma ooru yaavudu?)", pairId: "city" },
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

const VocabularyBuilder = ({ onExplain }) => {
  const { addXp } = useAppContext();
  
  const handleSpeak = (word) => {
    speak(word);
    addXp(1); // 1 XP for listening
  };

  return (
    <GlassCard>
      <h2 className="text-3xl font-semibold mb-6 text-center text-white">Vocabulary Builder</h2>
      <div className="space-y-4">
        {vocabList.map((item, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={i}
            className="flex items-center justify-between p-4 bg-black/20 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <span className="text-3xl">{item.emoji}</span>
              <div>
                <p className="text-2xl font-semibold text-white">{item.kannada}</p>
                <p className="text-lg text-gray-200">{item.english}</p>
                <p className="text-sm text-gray-300 italic">e.g., "{item.example}"</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <motion.button
                onClick={() => onExplain(item.kannada, item.english)}
                className="p-3 bg-purple-500 rounded-full hover:bg-purple-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Get AI Explanation"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.button>
              <motion.button
                onClick={() => handleSpeak(item.kannada)}
                className="p-3 bg-blue-500 rounded-full hover:bg-blue-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Listen"
              >
                <Volume2 className="w-6 h-6 text-white" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
};

export default VocabularyBuilder;
