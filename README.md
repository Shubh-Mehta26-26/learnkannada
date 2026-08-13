# 🌟 Kannada Learning AI Platform

An interactive, gamified, and AI-powered web application designed to make learning the Kannada language engaging, effective, and accessible for learners of all levels.

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google_Gemini-API-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

---

## ✨ Features

- 📚 **Structured Alphabet & Vocabulary Modules**: Learn Swaragalu (Vowels), Vyanjanagalu (Consonants), and essential daily-use words with native audio pronunciation.
- 🗣️ **Interactive Pronunciation Trainer**: Practice spoken Kannada with real-time audio evaluation using the browser's Web Speech API (`SpeechRecognition` & `speechSynthesis`).
- 🤖 **AI-Powered Translation & Assistant**: Integrated with **Google Gemini API** for dynamic contextual translation and interactive phrase learning.
- 🎮 **Gamified Mini-Games**:
  - 🔄 **Word Match**: Test vocabulary matching capabilities under timed challenges.
  - ✍️ **Fill in the Blanks**: Complete contextual sentences with proper Kannada grammar.
  - 🧠 **Memory Flashcards**: Boost visual and textual word retention.
- 🏆 **Gamification & Progress Tracking**:
  - XP Points & Level Up engine (`100 XP` per level).
  - Daily Streak tracking & achievement badges.
  - Dynamic Leaderboard and User Profile dashboard.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 18, React Router DOM v6
- **Build System**: Vite
- **Styling & UI**: Tailwind CSS, Glassmorphism design, Lucide Icons, Lottie Animations
- **Animations**: Framer Motion
- **State Management**: React Context API
- **AI Integration**: Google Gemini 2.5 Flash API
- **Speech Engine**: Web Speech API

---

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v16+ recommended).

### 1. Clone the repository
```bash
git clone https://github.com/Shubh-Mehta26-26/learnkannada.git
cd learnkannada
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your Google Gemini API key:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Start the development server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📜 Project Structure

```
src/
├── components/
│   ├── games/        # Interactive learning games (Word Match, Flashcards, Fill-Blanks)
│   ├── learn/        # Learning modules (Alphabet, Vocabulary, Translator, Speech Trainer)
│   └── ui/           # Reusable UI elements
├── context/          # AppContext (XP, User state, Streaks)
├── pages/            # Application views (Home, About, Learn, Games, Dashboard, Leaderboard)
├── services/         # Gemini API integration service
├── App.jsx           # App layout & routing controller
└── main.jsx          # Entry point
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.