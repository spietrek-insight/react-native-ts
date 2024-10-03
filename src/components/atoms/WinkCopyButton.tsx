import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export const WinkCopyButton: React.FC<{
  onPress: () => void
  icon: 'doubleright' | 'arrowdown'
  style: object
}> = React.memo(({ onPress, icon, style }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <AntDesign name={icon} size={20} color="white" />
  </TouchableOpacity>
))
