import { StyleSheet, TextInput, View } from 'react-native'

type PinInputProps = {
  pin: string[]
}

export const WinkPinInput = ({ pin }: PinInputProps) => {
  return (
    <View style={styles.pinContainer}>
      {pin.map((_, index) => (
        <View key={index} style={styles.inputContainer}>
          <TextInput
            value={pin[index]}
            maxLength={1}
            keyboardType="numeric"
            style={styles.input}
            secureTextEntry
            readOnly
          />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    gap: 10,
  },
  inputContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#e6e6e6',
  },
  input: {
    fontSize: 40,
    textAlign: 'center',
    width: '100%',
    color: 'black',
  },
})
