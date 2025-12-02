import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { useAppContext } from '../../context/AppContext';

const vocabList = [
  { kannada: "ನಮಸ್ಕಾರ", english: "Hello", emoji: "👋", example: "ನಮಸ್ಕಾರ, ನೀವು ಹೇಗಿದ್ದೀರಿ?", pairId: "hello" },
  { kannada: "ಧನ್ಯವಾದ", english: "Thank you", emoji: "🙏", example: "ನಿಮ್ಮ ಸಹಾಯಕ್ಕೆ ಧನ್ಯವಾದ.", pairId: "thanks" },
  { kannada: "ಹೌದು", english: "Yes", emoji: "👍", example: "ಹೌದು, ನನಗೆ ಬೇಕು.", pairId: "yes" },
  { kannada: "ಇಲ್ಲ", english: "No", emoji: "👎", example: "ಇಲ್ಲ, ನನಗೆ ಬೇಡ.", pairId: "no" },
  { kannada: "ನೀರು", english: "Water", emoji: "💧", example: "ದಯವಿಟ್ಟು ನೀರು ಕೊಡಿ.", pairId: "water" },
  { kannada: "ಊಟ", english: "Food/Meal", emoji: "🍲", example: "ಊಟ ಆಯಿತಾ?", pairId: "food" },
];

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const gameWords = vocabList.slice(0, 5);

const WordMatchGame = ({ onBack }) => {
  const { addXp } = useAppContext();
  const [englishWords, setEnglishWords] = useState([]);
  const [kannadaWords, setKannadaWords] = useState([]);
  
  const [selectedEnglish, setSelectedEnglish] = useState(null);
  const [selectedKannada, setSelectedKannada] = useState(null);
  
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const setupGame = () => {
    setEnglishWords(shuffleArray(gameWords));
    setKannadaWords(shuffleArray(gameWords));
    setSelectedEnglish(null);
    setSelectedKannada(null);
    setMatchedPairs([]);
    setScore(0);
    setFeedback(null);
    setIsChecking(false);
  };

  useEffect(() => {
    setupGame();
  }, []);

  const handleEnglishSelect = (word) => {
    if (isChecking || matchedPairs.includes(word.kannada)) return;
    setSelectedEnglish(word);
    checkMatch(word, selectedKannada);
  };

  const handleKannadaSelect = (word) => {
    if (isChecking || matchedPairs.includes(word.kannada)) return;
    setSelectedKannada(word);
    checkMatch(selectedEnglish, word);
  };

  const checkMatch = (english, kannada) => {
    if (english && kannada) {
      setIsChecking(true);
      if (english.pairId === kannada.pairId) {
        setMatchedPairs(prev => [...prev, kannada.kannada]);
        setScore(prev => prev + 10);
        addXp(10);
        setFeedback('correct');
      } else {
        setFeedback('incorrect');
      }
      
      setTimeout(() => {
        setSelectedEnglish(null);
        setSelectedKannada(null);
        setFeedback(null);
        setIsChecking(false);
      }, 1000);
    }
  };

  const allMatched = matchedPairs.length === gameWords.length;

  const getButtonClass = (word, type) => {
    const isMatched = matchedPairs.includes(word.kannada);
    const isSelected = (type === 'en' && selectedEnglish?.english === word.english) || 
                       (type === 'kn' && selectedKannada?.kannada === word.kannada);

    if (isMatched) {
      return 'bg-green-600/50 text-white/50 cursor-not-allowed';
    }
    if (isSelected) {
      if (feedback === 'correct') return 'bg-green-500 text-white ring-2 ring-white';
      if (feedback === 'incorrect') return 'bg-red-500 text-white ring-2 ring-white animate-shake';
      return 'bg-blue-500 text-white ring-2 ring-white';
    }
    return 'bg-white/30 hover:bg-white/50';
  };

  return (
    <GlassCard>
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="flex items-center text-lg text-gray-200 hover:text-white">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <h2 className="text-3xl font-semibold text-center text-white">Word Match 🎲</h2>
        <button onClick={setupGame} className="flex items-center text-lg text-gray-200 hover:text-white">
          <RefreshCw className="w-5 h-5 mr-2" />
          Reset
        </button>
      </div>

      <div className="text-center mb-6">
        <p className="text-2xl text-white">Score: <span className="font-bold">{score}</span></p>
        {allMatched && (
          <motion.p 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl text-yellow-300 font-bold mt-2"
          >
            🎉 You matched them all! 🎉
          </motion.p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col space-y-4">
          {englishWords.map((word) => (
            <motion.button
              key={word.english}
              onClick={() => handleEnglishSelect(word)}
              disabled={matchedPairs.includes(word.kannada)}
              className={`w-full p-4 rounded-lg text-lg font-semibold text-white transition-all duration-200 ${getButtonClass(word, 'en')}`}
              whileHover={{ scale: matchedPairs.includes(word.kannada) ? 1 : 1.05 }}
            >
              {word.english}
            </motion.button>
          ))}
        </div>
        <div className="flex flex-col space-y-4">
          {kannadaWords.map((word) => (
            <motion.button
              key={word.kannada}
              onClick={() => handleKannadaSelect(word)}
              disabled={matchedPairs.includes(word.kannada)}
              className={`w-full p-4 rounded-lg text-lg font-semibold text-white transition-all duration-200 ${getButtonClass(word, 'kn')}`}
              whileHover={{ scale: matchedPairs.includes(word.kannada) ? 1 : 1.05 }}
            >
              {word.kannada}
            </motion.button>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};

export default WordMatchGame;
