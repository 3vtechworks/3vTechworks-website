import React, { createContext, useContext, useState, useEffect } from 'react';
import logoDark from '../assets/logo/3vlogodark.png';
import logoBright from '../assets/logo/3vlogobright.png';

export type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  logo: string;
  isDark: boolean;
}

const defaultThemeState: ThemeContextType = {
  theme: 'light',
  toggleTheme: () => {},
  logo: logoBright,
  isDark: false,
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeState);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read saved theme preference or default to 'light' (white theme) as requested
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('3v_theme') : null;
    return saved === 'dark' || saved === 'light' ? saved : 'light';
  });

  useEffect(() => {
    localStorage.setItem('3v_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // In dark theme use 3vlogodark, for bright theme use 3vlogobright
  const logo = theme === 'dark' ? logoBright : logoDark;
  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, logo, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  return useContext(ThemeContext);
};

export default ThemeContext;
