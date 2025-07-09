export interface Theme {
  dominant: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

export const themes: Record<string, Theme> = {
  default: {
    dominant: '#f4fffd',
    secondary: '#011936',
    accent: '#ed254e',
    background: '#f4fffd',
    card: '#ffffff',
    text: '#011936',
    textSecondary: '#666666',
    border: '#e0e0e0',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  },
  dark: {
    dominant: '#1a1a1a',
    secondary: '#2d2d2d',
    accent: '#ed254e',
    background: '#121212',
    card: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    border: '#404040',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  },
  classic: {
    dominant: '#ffffff',
    secondary: '#333333',
    accent: '#4a90e2',
    background: '#ffffff',
    card: '#f5f5f5',
    text: '#333333',
    textSecondary: '#666666',
    border: '#dddddd',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  },
};

// Default theme
export const colors = themes.default;

// Theme context types
export interface ThemeContextType {
  currentTheme: string;
  theme: Theme;
  setTheme: (themeName: string) => void;
  availableThemes: string[];
} 