import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const MemoryFlashcardGame = ({ onBack }) => {
  const { addXp } = useAppContext();
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [tries, setTries] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const setupGame = () => {
    const gameVocab = vocabList.slice(0, 6);
    let idCounter = 1;
    
    const pairs = gameVocab.flatMap(word => ([
      { id: idCounter++, content: word.english, pairId: word.pairId },
      { id: idCounter++, content: word.kannada, pairId: word.pairId }
    ]));

    setCards(shuffleArray(pairs));
    setFlippedCards([]);
    setMatchedCards([]);
    setTries(0);
    setIsChecking(false);
  };

  useEffect(() => {
    setupGame();
  }, []);

  const handleCardClick = (index) => {
    const card = cards[index];

    if (isChecking || flippedCards.includes(index) || matchedCards.includes(card.pairId)) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      setTries(tries + 1);
      
      const [firstCard, secondCard] = [cards[newFlippedCards[0]], cards[newFlippedCards[1]]];

      if (firstCard.pairId === secondCard.pairId) {
        setMatchedCards([...matchedCards, firstCard.pairId]);
        addXp(15);
        setIsChecking(false);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setIsChecking(false);
          setFlippedCards([]);
        }, 1200);
      }
    }
  };

  const allMatched = matchedCards.length === 6;

  return (
    <GlassCard>
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="flex items-center text-lg text-gray-200 hover:text-white">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <h2 className="text-3xl font-semibold text-center text-white">Memory Match 🧠</h2>
        <button onClick={setupGame} className="flex items-center text-lg text-gray-200 hover:text-white">
          <RefreshCw className="w-5 h-5 mr-2" />
          Reset
        </button>
      </div>

      <div className="text-center mb-6">
        <p className="text-2xl text-white">Tries: <span className="font-bold">{tries}</span></p>
        {allMatched && (
          <motion.p 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl text-yellow-300 font-bold mt-2"
          >
            🎉 Excellent Memory! You found all pairs! 🎉
          </motion.p>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => {
          const isFlipped = flippedCards.includes(index);
          const isMatched = matchedCards.includes(card.pairId);
          const isShown = isFlipped || isMatched;

          return (
            <motion.div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`flex items-center justify-center h-24 rounded-lg cursor-pointer
                ${isMatched ? 'bg-green-600/50 text-white/70' : 
                  isShown ? 'bg-blue-400/50' : 
                  'bg-black/20 hover:bg-black/40'}
              `}
              whileHover={{ scale: isShown ? 1 : 1.05 }}
              animate={{ rotateY: isShown ? 180 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <AnimatePresence>
                {isShown ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white text-lg font-semibold text-center p-2"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    {card.content}
                  </motion.span>
                ) : (
                  <span className="text-4xl text-white/50">❓</span>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
};

export default MemoryFlashcardGame;
