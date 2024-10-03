import React from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

interface IconButtonProps {
  ariaLabel?: string | null
  icon: string
  onPress: () => void
  border?: boolean
  borderColor?: string
  style?: ViewStyle
}

export const WinkIconButton: React.FC<IconButtonProps> = ({
  ariaLabel,
  icon,
  onPress,
  border,
  borderColor,
  style,
}) => {
  const iconName = icon as keyof typeof FontAwesome.glyphMap
  return (
    <TouchableOpacity
      accessibilityLabel={ariaLabel ?? undefined}
      onPress={onPress}
      style={[
        {
          borderWidth: border ? 1 : 0,
          borderColor: borderColor ?? 'gray',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
          width: 28,
          height: 28,
          borderRadius: 45,
        },
      ]}
    >
      <FontAwesome name={iconName} size={14} color="#your-primary-color" />
    </TouchableOpacity>
  )
}
