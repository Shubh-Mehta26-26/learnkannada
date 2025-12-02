import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Loader2, Send } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { useAppContext } from '../../context/AppContext';
import { callGeminiApi } from '../../services/gemini';

const TranslatorSection = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addXp } = useAppContext();

  const handleTranslate = async () => {
    if (!inputText) return;
    setIsLoading(true);
    setTranslatedText('Translating...');

    const prompt = `You are an expert translator. Translate the following English text to Kannada: "${inputText}"
    Respond with *only* the Kannada translation and nothing else.`;
    
    try {
      const translation = await callGeminiApi(prompt);
      setTranslatedText(translation);
      addXp(5); // 5 XP for a translation
    } catch (error) {
      console.error(error);
      setTranslatedText('Error: Translation failed. Check console.');
    } finally {
      setIsLoading(false);
    }
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      // We need to find a Kannada voice.
      // This is tricky as it depends on the user's OS.
      // We'll set the lang code and hope for the best.
      utterance.lang = 'kn-IN';
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support Text-to-Speech.");
    }
  };

  return (
    <GlassCard>
      <h2 className="text-3xl font-semibold mb-6 text-center text-white">English → Kannada Translator</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2 text-gray-100">English</label>
          <textarea
            rows="5"
            className="w-full p-4 rounded-lg bg-white/20 text-white placeholder-gray-300 border-2 border-transparent focus:border-blue-400 focus:bg-white/30 focus:outline-none"
            placeholder="Type your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        {/* Output */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2 text-gray-100">Kannada (ಕನ್ನಡ)</label>
          <div className="relative w-full p-4 rounded-lg bg-black/20 text-white min-h-[140px]">
            <AnimatePresence>
              <motion.p 
                key={translatedText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg"
              >
                {translatedText || 'Translation will appear here...'}
              </motion.p>
            </AnimatePresence>
            {translatedText && translatedText !== 'Translating...' && !translatedText.startsWith('Error') && (
              <motion.button 
                onClick={() => speak(translatedText)}
                className="absolute bottom-4 right-4 p-2 bg-blue-500 rounded-full hover:bg-blue-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Volume2 className="w-5 h-5 text-white" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <motion.button
          onClick={handleTranslate}
          disabled={isLoading}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold shadow-lg disabled:opacity-50 flex items-center justify-center"
          whileHover={{ scale: isLoading ? 1 : 1.05 }}
          whileTap={{ scale: isLoading ? 1 : 0.95 }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Translating...
            </>
          ) : (
            <>
              Translate
              <Send className="w-5 h-5 inline-block ml-2" />
            </>
          )}
        </motion.button>
      </div>
       <p className="text-center text-gray-300 text-sm mt-4">
        
      </p>
    </GlassCard>
  );
};

export default TranslatorSection;
