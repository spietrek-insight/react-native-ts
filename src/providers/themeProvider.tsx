// ThemeContext.tsx
import React, { createContext, ReactNode, useContext } from 'react'

import { theme, Theme } from './theme'

const ThemeContext = createContext<Theme>(theme)

type ThemeProviderProps = {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export const useTheme = (): Theme => useContext(ThemeContext)
