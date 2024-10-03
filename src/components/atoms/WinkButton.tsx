import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  useColorScheme,
  ViewStyle,
} from 'react-native'

import COLORS from '@/constants/colors'

// Props
type ButtonTypes = 'contained' | 'outlined' | 'text'
type ButtonSizes = 'xs' | 'sm' | 'md' | 'lg'

type ButtonProps = PressableProps & {
  title?: string
  icon?: string
  type?: ButtonTypes
  size?: ButtonSizes
  buttonStyle?: ViewStyle
  textStyle?: TextStyle
}

// Sizes
type SizeProps = {
  fontSize: number
  iconSize: number
  padV: number
  padH: number
}
const sizes: Record<ButtonSizes, SizeProps> = {
  xs: { fontSize: 12, iconSize: 18, padV: 3, padH: 4 },
  sm: { fontSize: 14, iconSize: 22, padV: 6, padH: 9 },
  md: { fontSize: 16, iconSize: 24, padV: 12, padH: 18 },
  lg: { fontSize: 20, iconSize: 28, padV: 24, padH: 36 },
}

export const WinkButton = (props: ButtonProps) => {
  const {
    onPress,
    title,
    icon,
    type = 'contained',
    size = 'md',
    buttonStyle,
    textStyle,
  } = props

  // Theme
  const isLightTheme = useColorScheme() === 'light'
  const themedButton = getThemedButton(isLightTheme, type)
  const themedText = getThemedText(isLightTheme, type)
  // const iconColor = (themedText as TextStyle)?.color?.toString() ?? Colors.white

  // Sizing
  const { fontSize, padV, padH } = sizes[size]
  const padding: ViewStyle = { paddingVertical: padV, paddingHorizontal: padH }
  const marginLeft = icon ? 5 : 0 // Only apply margin if it has an icon

  // Component
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, padding, themedButton, buttonStyle]}
    >
      {title && (
        <Text style={[{ fontSize, marginLeft }, themedText, textStyle]}>
          {title}
        </Text>
      )}
    </Pressable>
  )
}

// Helpers
const getThemedButton = (
  isLightTheme: boolean,
  type: ButtonTypes,
): StyleProp<ViewStyle> => {
  if (isLightTheme) {
    if (type === 'outlined') return styles.outlinedLightButton
    if (type === 'text') return styles.textLightButton
    return styles.containedLightButton
  } else {
    if (type === 'outlined') return styles.outlinedDarkButton
    if (type === 'text') return styles.textDarkButton
    return styles.containedDarkButton
  }
}

const getThemedText = (
  isLightTheme: boolean,
  type: ButtonTypes,
): StyleProp<TextStyle> => {
  if (isLightTheme) {
    if (type === 'outlined') return styles.outlinedLightText
    if (type === 'text') return styles.textLightText
    return styles.containedLightText
  } else {
    if (type === 'outlined') return styles.outlinedDarkText
    if (type === 'text') return styles.textDarkText
    return styles.containedDarkText
  }
}

// Styles
const styles = StyleSheet.create({
  // Button
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 2,
  },

  // Dark Button
  containedDarkButton: {
    backgroundColor: '#',
  },
  outlinedDarkButton: {
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: COLORS.primary,
    elevation: 0,
  },
  textDarkButton: {
    elevation: 0,
  },

  // Light Button
  containedLightButton: {
    backgroundColor: COLORS.light.background,
  },
  outlinedLightButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  textLightButton: {
    elevation: 0,
  },

  // Dark Text
  containedDarkText: {
    color: COLORS.white,
  },
  outlinedDarkText: {
    color: COLORS.primary,
  },
  textDarkText: {
    color: COLORS.primary,
  },

  // Light Text
  containedLightText: {
    color: COLORS.light.text,
  },
  outlinedLightText: {
    color: COLORS.light.text,
  },
  textLightText: {
    color: COLORS.light.text,
  },
})
