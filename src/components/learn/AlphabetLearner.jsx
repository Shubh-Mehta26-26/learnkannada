import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

const alphabetList = [
  // Vowels (ಸ್ವರಗಳು)
  { type: "Vowel", char: "ಅ", pronunciation: "a" },
  { type: "Vowel", char: "ಆ", pronunciation: "aa" },
  { type: "Vowel", char: "ಇ", pronunciation: "i" },
  { type: "Vowel", char: "ಈ", pronunciation: "ee" },
  { type: "Vowel", char: "ಉ", pronunciation: "u" },
  { type: "Vowel", char: "ಊ", pronunciation: "oo" },
  { type: "Vowel", char: "ಋ", pronunciation: "ru" },
  { type: "Vowel", char: "ಎ", pronunciation: "e" },
  { type: "Vowel", char: "ಏ", pronunciation: "E" },
  { type: "Vowel", char: "ಐ", pronunciation: "ai" },
  { type: "Vowel", char: "ಒ", pronunciation: "o" },
  { type: "Vowel", char: "ಓ", pronunciation: "O" },
  { type: "Vowel", char: "ಔ", pronunciation: "au" },
  { type: "Vowel", char: "ಅಂ", pronunciation: "am" },
  { type: "Vowel", char: "ಅಃ", pronunciation: "aha" },
  
  // Consonants (ವ್ಯಂಜನಗಳು) - First 2 groups
  { type: "Consonant", char: "ಕ", pronunciation: "ka" },
  { type: "Consonant", char: "ಖ", pronunciation: "kha" },
  { type: "Consonant", char: "ಗ", pronunciation: "ga" },
  { type: "Consonant", char: "ಘ", pronunciation: "gha" },
  { type: "Consonant", char: "ಙ", pronunciation: "nga" },
  { type: "Consonant", char: "ಚ", pronunciation: "cha" },
  { type: "Consonant", char: "ಛ", pronunciation: "chha" },
  { type: "Consonant", char: "ಜ", pronunciation: "ja" },
  { type: "Consonant", char: "ಝ", pronunciation: "jha" },
  { type: "Consonant", char: "ಞ", pronunciation: "nya" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeInOut"
    },
  }),
};

const AlphabetLearner = () => {
  const vowels = alphabetList.filter(a => a.type === 'Vowel');
  const consonants = alphabetList.filter(a => a.type === 'Consonant');

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'kn-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <GlassCard>
      <h2 className="text-3xl font-semibold mb-6 text-center text-white">Alphabet Learning</h2>
      
      <h3 className="text-2xl font-semibold text-purple-300 mb-4">Vowels (ಸ್ವರಗಳು)</h3>
      <div className="grid grid-cols-5 md:grid-cols-10 gap-4 mb-8">
        {vowels.map((alpha, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={i}
            whileHover={{ scale: 1.1, y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
            onClick={() => speak(alpha.char)}
            className="flex flex-col items-center justify-center p-4 bg-black/20 rounded-lg cursor-pointer"
          >
            <p className="text-4xl md:text-5xl font-bold text-white">{alpha.char}</p>
            <p className="text-md md:text-lg text-gray-200">{alpha.pronunciation}</p>
          </motion.div>
        ))}
      </div>

      <h3 className="text-2xl font-semibold text-purple-300 mb-4">Consonants (ವ್ಯಂಜನಗಳು)</h3>
      <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
        {consonants.map((alpha, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={i}
            whileHover={{ scale: 1.1, y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
            onClick={() => speak(alpha.char)}
            className="flex flex-col items-center justify-center p-4 bg-black/20 rounded-lg cursor-pointer"
          >
            <p className="text-4xl md:text-5xl font-bold text-white">{alpha.char}</p>
            <p className="text-md md:text-lg text-gray-200">{alpha.pronunciation}</p>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
};

export default AlphabetLearner;
