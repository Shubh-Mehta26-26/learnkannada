import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import StyledButton from '../ui/StyledButton';
import { useAppContext } from '../../context/AppContext';

const FillInTheBlanksGame = ({ onBack }) => {
  const { addXp } = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null); // null, true, false
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      sentence: "ನಿಮ್ಮ ಹೆಸರು _____?",
      translation: "What is your name?",
      options: ["ಏನು (Enu)", "ಯಾರು (Yaaru)", "ಎಲ್ಲಿ (Elli)"],
      correctAnswer: "ಏನು (Enu)"
    },
    {
      sentence: "ನನಗೆ ಕಾಫಿ _____.",
      translation: "I want coffee.",
      options: ["ಬೇಕು (Beku)", "ಬಾರದು (Baaradu)", "ಇಲ್ಲ (Illa)"],
      correctAnswer: "ಬೇಕು (Beku)"
    },
    {
      sentence: "ನಾಳೆ _____ ಬನ್ನಿ.",
      translation: "Come to the house tomorrow.",
      options: ["ಮನೆಗೆ (Manege)", "ಹೋಗಿ (Hogi)", "ಊಟ (Oota)"],
      correctAnswer: "ಮನೆಗೆ (Manege)"
    },
    {
      sentence: "ಇದು _____ ಪುಸ್ತಕ.",
      translation: "This is my book.",
      options: ["ನನ್ನ (Nanna)", "ನಿಮ್ಮ (Nimma)", "ಅವನ (Avana)"],
      correctAnswer: "ನನ್ನ (Nanna)"
    },
    {
      sentence: "ನೀವು _____ ಇದ್ದೀರಿ?",
      translation: "How are you?",
      options: ["ಹೇಗೆ (Hege)", "ಏಕೆ (Eke)", "ಯಾವಾಗ (Yaavaga)"],
      correctAnswer: "ಹೇಗೆ (Hege)"
    }
  ];

  const handleOptionSelect = (option) => {
    if (selectedOption !== null) return; // Prevent multiple clicks

    setSelectedOption(option);
    const correct = option === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(prev => prev + 10);
      addXp(10);
    }

    // Auto advance after delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <GlassCard className="text-center py-12">
        <h2 className="text-4xl font-bold text-white mb-4">Game Over! 🎉</h2>
        <p className="text-2xl text-gray-200 mb-8">Your Score: {score} / {questions.length * 10}</p>
        <div className="flex justify-center space-x-4">
          <StyledButton onClick={restartGame}>Play Again 🔄</StyledButton>
          <button onClick={onBack} className="px-6 py-3 text-white border border-white/30 rounded-xl hover:bg-white/10">Exit</button>
        </div>
      </GlassCard>
    );
  }

  const question = questions[currentQuestionIndex];

  return (
    <GlassCard>
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="flex items-center text-lg text-gray-200 hover:text-white">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <div className="text-right">
          <p className="text-sm text-gray-400">Question {currentQuestionIndex + 1}/{questions.length}</p>
          <p className="text-xl font-bold text-white">Score: {score}</p>
        </div>
      </div>

      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-4 leading-relaxed">
          {question.sentence.split("_____").map((part, index, arr) => (
            <React.Fragment key={index}>
              {part}
              {index < arr.length - 1 && (
                <span className="inline-block border-b-2 border-white min-w-[100px] mx-2 text-yellow-300">
                  {selectedOption ? (isCorrect && selectedOption === question.correctAnswer ? selectedOption : (selectedOption === question.correctAnswer ? selectedOption : "_____")) : "_____"}
                </span>
              )}
            </React.Fragment>
          ))}
        </h2>
        <p className="text-lg text-gray-300 italic">({question.translation})</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {question.options.map((option, index) => {
          let btnClass = "bg-white/10 hover:bg-white/20 border-white/20";
          if (selectedOption === option) {
            btnClass = isCorrect ? "bg-green-500 border-green-400 ring-2 ring-green-300" : "bg-red-500 border-red-400 ring-2 ring-red-300";
          } else if (selectedOption !== null && option === question.correctAnswer) {
            btnClass = "bg-green-500/50 border-green-400/50"; // Show correct answer if wrong one picked
          }

          return (
            <motion.button
              key={index}
              onClick={() => handleOptionSelect(option)}
              disabled={selectedOption !== null}
              className={`p-4 rounded-xl border text-lg font-semibold text-white transition-all ${btnClass}`}
              whileHover={{ scale: selectedOption === null ? 1.02 : 1 }}
              whileTap={{ scale: selectedOption === null ? 0.98 : 1 }}
            >
              {option}
            </motion.button>
          );
        })}
      </div>
      
      {selectedOption && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 text-center text-xl font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}
        >
          {isCorrect ? "Correct! 🎉" : "Oops! Try to remember this one."}
        </motion.div>
      )}
    </GlassCard>
  );
};

export default FillInTheBlanksGame;
