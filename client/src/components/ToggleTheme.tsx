import React from 'react';
import { useTheme } from '../context/ThemeProvider';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <div className="toggle-theme" onClick={toggleTheme}>
      <FaSun className={theme === 'light' ? 'sun-light' : 'sun-dark'} />
      <FaMoon className={theme === 'light' ? 'moon-light' : 'moon-dark'} />
    </div>
  );
};
