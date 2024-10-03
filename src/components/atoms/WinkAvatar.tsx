import { Text, View } from 'react-native'

export const WinkAvatar = () => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 50,
        height: 90,
        justifyContent: 'center',
        marginTop: 20,
        width: 90,
        alignSelf: 'center',
      }}
    >
      <Text
        style={{
          color: '#1DB3B3',
          fontSize: 40,
          textAlign: 'center',
          fontWeight: 'bold',
          padding: 10,
        }}
      >
        SP
      </Text>
    </View>
  )
}
