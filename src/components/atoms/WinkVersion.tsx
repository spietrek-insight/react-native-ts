// display the version of the app at the bottom of the sidebar
// the text should be white and centered
// the font size should be 16
// the text should say "v1.0.0"

import { Text, View } from 'react-native'

export const WinkVersion = () => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 16,
          textAlign: 'center',
        }}
      >
        v5.0.0
      </Text>
    </View>
  )
}
