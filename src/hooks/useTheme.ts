import { useState, useEffect } from 'react';
import { Theme } from '../types';
import { loadTheme, saveTheme } from '../services/storage';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => loadTheme());

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}
