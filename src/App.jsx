import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Info, BookOpen, Mic, Gamepad2, LayoutDashboard, Trophy, User } from 'lucide-react';
import { AppProvider } from './context/AppContext';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LearnPage from './pages/LearnPage';
import GamesPage from './pages/GamesPage';
import DashboardPage from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import SpeakAndLearn from './components/learn/SpeakAndLearn'; // Reusing for Pronunciation Page

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'about', label: 'About', icon: <Info className="w-5 h-5" /> },
    { id: 'learn', label: 'Learn', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'pronunciation', label: 'Trainer', icon: <Mic className="w-5 h-5" /> },
    { id: 'games', label: 'Games', icon: <Gamepad2 className="w-5 h-5" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onStartLearning={() => setCurrentPage('learn')} />;
      case 'about':
        return <AboutPage />;
      case 'learn':
        return <LearnPage />;
      case 'pronunciation':
        // Reuse SpeakAndLearn but wrap it in a container for the page
        return (
          <div className="container mx-auto py-16 px-6 text-white">
            <h1 className="text-5xl font-bold text-center mb-12">Pronunciation Trainer</h1>
            <SpeakAndLearn />
          </div>
        );
      case 'games':
        return <GamesPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onStartLearning={() => setCurrentPage('learn')} />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 font-sans">
        {/* Navbar */}
        <nav className="sticky top-4 z-50 mx-auto max-w-5xl px-4">
          <div className="flex justify-center items-center p-3 bg-black/30 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20">
            <div className="flex items-center space-x-1 md:space-x-2 overflow-x-auto">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`relative px-3 md:px-4 py-2 rounded-lg flex items-center space-x-2 ${
                    currentPage === item.id ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                  title={item.label}
                >
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="active-nav-tab"
                      className="absolute inset-0 bg-white/20 rounded-lg"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.icon}</span>
                  <span className="relative z-10 hidden md:inline">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
