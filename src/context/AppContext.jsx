import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ 
    name: "Learner", 
    level: 1, 
    xp: 0, 
    streak: 0, 
    avatar: "https://placehold.co/100x100/E2E8F0/A0AEC0?text=👤" 
  });

  const addXp = (amount) => {
    setUser(prevUser => {
      const newXp = prevUser.xp + amount;
      const newLevel = Math.floor(newXp / 100) + 1; // 100 XP per level
      if (newLevel > prevUser.level) {
        // TODO: Show level up notification!
        console.log("Level Up!", newLevel);
      }
      return { ...prevUser, xp: newXp, level: newLevel };
    });
  };

  const incrementStreak = () => {
    setUser(prevUser => ({ ...prevUser, streak: prevUser.streak + 1 }));
  };

  return (
    <AppContext.Provider value={{ user, addXp, incrementStreak, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
