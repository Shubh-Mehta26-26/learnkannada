import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Gamepad2, Trophy } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import WorkingAboutPageAnimation from '../components/ui/WorkingAboutPageAnimation';

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

const AboutPage = () => {
  const features = [
    { icon: <Sparkles className="w-8 h-8 text-purple-400" />, title: "AI-Powered", desc: "Instant translations & smart pronunciation feedback." },
    { icon: <BookOpen className="w-8 h-8 text-blue-400" />, title: "Rich Library", desc: "Master daily phrases, complex grammar, and 1000+ words." },
    { icon: <Gamepad2 className="w-8 h-8 text-green-400" />, title: "Gamified Fun", desc: "Play exciting mini-games to reinforce your learning." },
    { icon: <Trophy className="w-8 h-8 text-yellow-400" />, title: "Track Success", desc: "Climb the leaderboard and earn badges as you grow." },
  ];

  const timelineSteps = [
    { title: "The Beginning", desc: "Master the Kannada Alphabet (Varnamale) and basic greetings." },
    { title: "Building Blocks", desc: "Learn essential vocabulary for home, travel, and shopping." },
    { title: "Speak Confidently", desc: "Use our AI Voice Trainer to perfect your accent and flow." },
    { title: "Total Fluency", desc: "Engage in full conversations and read Kannada literature." },
  ];

  const culturalHighlights = [
    { title: "Mysore Dasara", desc: "The 'Nada Habba' (State Festival) known for its grand royal procession.", emoji: "🐘" },
    { title: "Ugadi", desc: "The Kannada New Year, celebrating new beginnings with jaggery and neem.", emoji: "🌿" },
    { title: "Rajyotsava", desc: "Celebrated on Nov 1st to mark the formation of Karnataka state.", emoji: "❤️" },
  ];

  const cuisineHighlights = [
    { name: "Masala Dosa", desc: "Crispy, fermented crepe filled with spiced potatoes. A worldwide favorite.", emoji: "🥞" },
    { name: "Ragi Mudde", desc: "Nutritious finger millet balls, the powerhouse food of rural Karnataka.", emoji: "🌾" },
    { name: "Mysore Pak", desc: "A rich, melt-in-the-mouth sweet made of ghee, sugar, and gram flour.", emoji: "🍬" },
  ];

  const natureHighlights = [
    { name: "Hampi Ruins", desc: "UNESCO World Heritage site showcasing the Vijayanagara Empire.", emoji: "🛕" },
    { name: "Western Ghats", desc: "One of the world's eight 'hottest hotspots' of biodiversity.", emoji: "⛰️" },
    { name: "Jog Falls", desc: "The second-highest plunge waterfall in India, a majestic sight.", emoji: "🌊" },
  ];

  return (
    <div className="container mx-auto py-16 px-6 text-white relative">
      {/* Decorative background blobs for About Page */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10" />

      {/* Intro Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 pb-2">
          About LearnKannada
        </h1>
        <p className="text-xl text-gray-400 mt-4">Discover the tool, embrace the tradition.</p>
      </motion.div>

      {/* PART 1: THE APPLICATION */}
      <div className="mb-32">
        {/* Replaced the old header with a cleaner, more professional design */}
        <div className="mb-12 text-left">
          <h2 className="text-3xl font-bold text-white inline-block relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-1/2 after:bg-gradient-to-r after:from-blue-500 after:to-transparent after:rounded-full">
           The Application
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <WorkingAboutPageAnimation />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-sm font-semibold text-blue-400 tracking-widest uppercase mb-2">Our Mission</h2>
            <h3 className="text-3xl font-semibold text-white">Bridging Cultures Through Technology</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              We built LearnKannada to make one of India's classical languages accessible to the world. By combining cutting-edge AI with proven gamification techniques, we turn language learning from a chore into an adventure.
            </p>
          </motion.div>
        </div>

        <h3 className="text-2xl font-bold text-center mb-8">What You'll Experience</h3>
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {features.map((feature, i) => (
            <GlassCard
              key={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              whileHover={{ y: -10, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              className="text-center group transition-colors"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-white/10 rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-sm text-gray-300">{feature.desc}</p>
            </GlassCard>
          ))}
        </div>

        <h3 className="text-2xl font-bold text-center mb-12">Your Learning Journey</h3>
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
          
          {timelineSteps.map((step, i) => (
            <motion.div 
              key={i}
              className="relative mb-12 flex flex-col md:flex-row items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white rounded-full border-4 border-blue-600 transform -translate-x-[7px] md:-translate-x-1/2 z-10 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
              
              <div className={`md:w-[45%] pl-12 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-last md:pl-12'}`}>
                <div className="bg-gray-800/40 border border-gray-700 p-5 rounded-xl hover:border-blue-500/50 transition-colors">
                  <h3 className="text-xl font-bold text-blue-300 mb-1">{step.title}</h3>
                  <p className="text-gray-300 text-sm">{step.desc}</p>
                </div>
              </div>
              {/* Empty space for the other side */}
              <div className="md:w-[45%]" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* PART 2: THE CULTURE */}
      <div>
        {/* Replaced the old header with a cleaner, more professional design */}
        <div className="mb-12 text-left">
          <h2 className="text-3xl font-bold text-white inline-block relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-1/2 after:bg-gradient-to-r after:from-purple-500 after:to-transparent after:rounded-full">
             The Culture & Language
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
             <h2 className="text-sm font-semibold text-purple-400 tracking-widest uppercase mb-2">Heritage</h2>
             <h3 className="text-3xl font-semibold text-white mb-6">Why Learn Kannada?</h3>
             <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Kannada is not just a language; it's a gateway to a rich history spanning over 2,000 years. Spoken by over 50 million people, it is the heart of Karnataka's vibrant culture, literature, and cinema. It is one of the oldest Dravidian languages and holds the status of a Classical Language of India.
            </p>
            <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20 text-center">
              <p className="text-lg font-medium italic text-purple-200">
                "Siriigannadam Gelge, Siriigannadam Balge"
              </p>
              <p className="text-sm text-gray-400 mt-1">
                (Let rich Kannada triumph, let rich Kannada live)
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            {/* Cultural Heartbeat Grid */}
            <div className="bg-gray-800/30 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-6 border-l-4 border-purple-500 pl-3">Cultural Pillars</h3>
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-orange-500/20 to-red-600/20 p-4 rounded-xl border border-orange-500/30 text-center"
                >
                  <div className="text-4xl mb-3">🎭</div>
                  <p className="text-sm font-bold text-orange-100">Yakshagana</p>
                  <p className="text-xs text-orange-200/70">Traditional Theater Art</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 p-4 rounded-xl border border-yellow-500/30 text-center"
                >
                  <div className="text-4xl mb-3">🏛️</div>
                  <p className="text-sm font-bold text-yellow-100">Mysore Palace</p>
                  <p className="text-xs text-yellow-200/70">Royal Architecture</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 p-4 rounded-xl border border-green-500/30 text-center"
                >
                  <div className="text-4xl mb-3">📜</div>
                  <p className="text-sm font-bold text-green-100">8 Jnanpith Awards</p>
                  <p className="text-xs text-green-200/70">Literary Excellence</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-pink-500/20 to-rose-600/20 p-4 rounded-xl border border-pink-500/30 text-center"
                >
                  <div className="text-4xl mb-3">🎵</div>
                  <p className="text-sm font-bold text-pink-100">Carnatic Music</p>
                  <p className="text-xs text-pink-200/70">Classical Heritage</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* NEW SECTION: The Soul of Karnataka */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md"
        >
          <h3 className="text-3xl font-bold text-center text-white mb-10">The Soul of Karnataka</h3>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {culturalHighlights.map((item, i) => (
               <motion.div 
                 key={i} 
                 whileHover={{ y: -5 }}
                 className="text-center p-6 bg-black/20 rounded-xl border border-white/5 hover:bg-purple-500/10 transition-colors"
               >
                 <div className="text-5xl mb-4">{item.emoji}</div>
                 <h4 className="text-xl font-bold text-purple-200 mb-2">{item.title}</h4>
                 <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
               </motion.div>
            ))}
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="md:w-3/4">
               <h4 className="text-2xl font-semibold text-yellow-300 mb-3">A Literary Legacy</h4>
               <p className="text-gray-300 leading-relaxed">
                 Kannada literature (Sahitya) is vast and historic. From the 9th-century <span className="italic text-white">Kavirajamarga</span> to the modern rationalist movements, it has shaped the ethos of the state. It is a language that has evolved from ancient stone inscriptions to the digital age, preserving its core identity while embracing the new.
               </p>
             </div>
             <div className="md:w-1/4 flex flex-col items-center justify-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <div className="text-4xl mb-2">📚</div>
                <p className="text-xs font-mono text-yellow-200 uppercase tracking-wider">Oldest Text</p>
                <p className="text-sm font-bold text-white">Kavirajamarga</p>
                <p className="text-[10px] text-gray-400">c. 850 CE</p>
             </div>
          </div>
        </motion.div>

        {/* NEW SECTION: Flavors & Nature */}
        <div className="mt-16 grid md:grid-cols-2 gap-12">
            {/* Cuisine Section */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-orange-900/20 to-red-900/20 p-6 rounded-2xl border border-orange-500/20 backdrop-blur-sm"
            >
                <h3 className="text-2xl font-bold text-orange-200 mb-6 flex items-center">
                    <span className="mr-3">🍛</span> A Taste of Karnataka
                </h3>
                <div className="space-y-4">
                    {cuisineHighlights.map((item, i) => (
                        <div key={i} className="flex items-start space-x-4 p-3 hover:bg-white/5 rounded-lg transition-colors">
                            <div className="text-3xl bg-black/20 p-2 rounded-lg">{item.emoji}</div>
                            <div>
                                <h4 className="font-bold text-white">{item.name}</h4>
                                <p className="text-sm text-gray-300">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Nature Section */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-900/20 to-teal-900/20 p-6 rounded-2xl border border-green-500/20 backdrop-blur-sm"
            >
                <h3 className="text-2xl font-bold text-green-200 mb-6 flex items-center">
                    <span className="mr-3">🌿</span> Natural Wonders
                </h3>
                <div className="space-y-4">
                    {natureHighlights.map((item, i) => (
                        <div key={i} className="flex items-start space-x-4 p-3 hover:bg-white/5 rounded-lg transition-colors">
                            <div className="text-3xl bg-black/20 p-2 rounded-lg">{item.emoji}</div>
                            <div>
                                <h4 className="font-bold text-white">{item.name}</h4>
                                <p className="text-sm text-gray-300">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
