import { View } from 'react-native'

// Mock the FontAwesome and FontAwesome5 components
export const FontAwesome = ({
  name,
  size,
  color,
}: {
  name: string
  size: number
  color: string
}) => <View style={{ width: size, height: size, backgroundColor: color }} />

export const FontAwesome5 = ({
  name,
  size,
  color,
}: {
  name: string
  size: number
  color: string
}) => <View style={{ width: size, height: size, backgroundColor: color }} />
