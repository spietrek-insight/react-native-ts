// theme.ts
export const theme = {
  colors: {
    primary: '#1DB3B3',
    secondary: '#03dac6',
    background: '#f6f6f6',
    surface: '#ffffff',
    error: '#b00020',
    textPrimary: '#000000',
    textSecondary: '#757575',
    white: '#ffffff',
    black: '#000000',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  fontSize: {
    small: 12,
    medium: 16,
    large: 20,
  },
}

export type Theme = typeof theme
