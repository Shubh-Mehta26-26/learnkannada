import React, { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import StyledButton from '../components/ui/StyledButton';
import WordMatchGame from '../components/games/WordMatchGame';
import MemoryFlashcardGame from '../components/games/MemoryFlashcardGame';
import FillInTheBlanksGame from '../components/games/FillInTheBlanksGame';

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

const GamesPage = () => {
  const [activeGame, setActiveGame] = useState(null); // 'wordMatch', 'listening', etc.

  const games = [
    { id: "wordMatch", title: "Word Match 🎲", desc: "Match English words to their Kannada translation.", status: "Ready" },
    { id: "memory", title: "Memory Flashcards 🧠", desc: "Flip cards and match the pairs.", status: "Ready" },
    { id: "fillBlank", title: "Fill in the Blanks 📝", desc: "Complete the Kannada sentence with the right word.", status: "Ready" },
    { id: "listening", title: "Listening Challenge 🎧", desc: "Hear a Kannada word and choose the correct meaning.", status: "Coming Soon" },
    { id: "speakWin", title: "Speak & Win 🎤", desc: "Pronounce the word correctly to score points.", status: "Coming Soon" },
  ];

  // Render the active game
  if (activeGame === 'wordMatch') {
    return (
      <div className="container mx-auto py-16 px-6 text-white">
        <WordMatchGame onBack={() => setActiveGame(null)} />
      </div>
    );
  }

  if (activeGame === 'memory') {
    return (
      <div className="container mx-auto py-16 px-6 text-white">
        <MemoryFlashcardGame onBack={() => setActiveGame(null)} />
      </div>
    );
  }

  if (activeGame === 'fillBlank') {
    return (
      <div className="container mx-auto py-16 px-6 text-white">
        <FillInTheBlanksGame onBack={() => setActiveGame(null)} />
      </div>
    );
  }

  // Render the game menu
  return (
    <div className="container mx-auto py-16 px-6 text-white">
      <h1 className="text-5xl font-bold text-center mb-12">Mini-Games Arcade</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {games.map((game, i) => (
          <GlassCard
            key={game.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={i}
          >
            <h2 className="text-2xl font-semibold text-white mb-3">{game.title}</h2>
            <p className="text-gray-200 mb-6">{game.desc}</p>
            <StyledButton
              disabled={game.status !== "Ready"}
              onClick={() => game.status === "Ready" ? setActiveGame(game.id) : null}
              className={game.status !== "Ready" ? "opacity-50 !bg-gray-500" : ""}
            >
              {game.status === "Ready" ? "Play Now" : "Coming Soon"}
            </StyledButton>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;
