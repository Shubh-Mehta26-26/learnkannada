import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TranslatorSection from '../components/learn/TranslatorSection';
import VocabularyBuilder from '../components/learn/VocabularyBuilder';
import ConversationCards from '../components/learn/ConversationCards';
import AlphabetLearner from '../components/learn/AlphabetLearner';
import SpeakAndLearn from '../components/learn/SpeakAndLearn';
import GeminiExplanationModal from '../components/ui/GeminiExplanationModal';
import { callGeminiApi } from '../services/gemini';

const LearnPage = () => {
  const [activeTab, setActiveTab] = useState('translate');
  const tabs = [
    { id: 'translate', label: 'Translator' },
    { id: 'vocab', label: 'Vocabulary' },
    { id: 'convo', label: 'Conversations' },
    { id: 'alphabet', label: 'Alphabet' },
    { id: 'practice', label: 'Speak & Learn' },
  ];

  // State for the explanation modal
  const [modalState, setModalState] = useState({
    show: false,
    isLoading: false,
    title: '',
    content: ''
  });

  // Function to open the modal and fetch explanation
  const handleShowExplanation = async (kannadaWord, englishWord) => {
    setModalState({ show: true, isLoading: true, title: kannadaWord, content: '' });
    
    const prompt = `You are a friendly Kannada language tutor. A student is learning the word "${kannadaWord}" which means "${englishWord}". 
    In 2-3 simple sentences, explain the cultural context, a bit about the grammar, or another example of how to use this word. 
    Keep it very simple for a beginner.
    Respond in English.`;
    
    const explanation = await callGeminiApi(prompt);
    
    setModalState({ show: true, isLoading: false, title: kannadaWord, content: explanation });
  };

  const handleCloseModal = () => {
    setModalState({ show: false, isLoading: false, title: '', content: '' });
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'translate':
        return <TranslatorSection />;
      case 'vocab':
        return <VocabularyBuilder onExplain={handleShowExplanation} />;
      case 'convo':
        return <ConversationCards onExplain={handleShowExplanation} />;
      case 'alphabet':
        return <AlphabetLearner />;
      case 'practice':
        return <SpeakAndLearn />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-16 px-6 text-white">
      <h1 className="text-5xl font-bold text-center mb-12">Kannada Learning Hub</h1>
      <div className="flex justify-center mb-8 bg-black/20 rounded-xl p-2 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-2 font-semibold rounded-lg ${
              activeTab === tab.id ? 'text-white' : 'text-gray-300'
            } whitespace-nowrap`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-learn-tab"
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>

      <GeminiExplanationModal
        show={modalState.show}
        onClose={handleCloseModal}
        title={modalState.title}
        content={modalState.content}
        isLoading={modalState.isLoading}
      />
    </div>
  );
};

export default LearnPage;
