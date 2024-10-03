import { View, StyleSheet } from 'react-native'

import { WinkPinPad } from '../molecules/WinkPinPad'

type PinEntryProps = {
  onUnlock: (pin: string) => void
}

export const WinkPinEntry = ({ onUnlock }: PinEntryProps) => {
  const handlePinEntered = (enteredPin: string) => {
    console.log('PIN Entered:', enteredPin)
    onUnlock(enteredPin)
  }

  return (
    <View style={styles.container} testID="PinEntry">
      <WinkPinPad onPinEntered={handlePinEntered} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
