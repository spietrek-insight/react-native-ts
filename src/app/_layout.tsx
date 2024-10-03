import { Slot } from 'expo-router'
import { DefaultTheme, PaperProvider } from 'react-native-paper'

import { SessionProvider } from '@/providers/sessionProvider'
import { theme } from '@/providers/theme'
import { ThemeProvider } from '@/providers/themeProvider'

const reactNameThemeColors = {
  ...DefaultTheme.colors,
  ...theme.colors,
}

const reactNativeTheme = {
  ...DefaultTheme,
  colors: reactNameThemeColors,
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <PaperProvider theme={reactNativeTheme}>
        <SessionProvider>
          <Slot />
        </SessionProvider>
      </PaperProvider>
    </ThemeProvider>
  )
}
