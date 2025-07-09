import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes, Theme, ThemeContextType } from '../styles/colors';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<string>('default');

  useEffect(() => {
    // Load saved theme from AsyncStorage
    const loadSavedTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('selectedTheme');
        if (savedTheme && themes[savedTheme]) {
          setCurrentTheme(savedTheme);
        }
      } catch (error) {
        console.error('Error loading saved theme:', error);
      }
    };

    loadSavedTheme();
  }, []);

  const setTheme = async (themeName: string) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      try {
        await AsyncStorage.setItem('selectedTheme', themeName);
      } catch (error) {
        console.error('Error saving theme:', error);
      }
    }
  };

  const value: ThemeContextType = {
    currentTheme,
    theme: themes[currentTheme],
    setTheme,
    availableThemes: Object.keys(themes),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}; 