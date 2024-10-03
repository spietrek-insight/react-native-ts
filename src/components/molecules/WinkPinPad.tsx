import { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'

import { WinkDialpadKeypad } from './WinkDialpadKeypad'
import { WinkDialpadPin } from './WinkDialpadPin'

const dialPadContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'X']
const dialPadSize = 80
const dialPadTextSize = dialPadSize * 0.3
const pinLength = 4
const pinSize = 80 / pinLength

type PinPadProps = {
  onPinEntered: (pin: string) => void
}

export const WinkPinPad = ({ onPinEntered }: PinPadProps) => {
  const [code, setCode] = useState<Array<number>>([])

  const handleCodeChange = (newCode: number[]) => {
    setCode(newCode)
  }

  const handlePinSubmit = (pin: number[]) => {
    setTimeout(() => {
      onPinEntered(pin.join(''))
      setCode([])
    }, 500)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <WinkDialpadPin
          pinLength={pinLength}
          pinSize={pinSize}
          dialPadContent={dialPadContent}
          code={code}
        />

        <WinkDialpadKeypad
          dialPadContent={dialPadContent}
          pinLength={pinLength}
          code={code}
          dialPadSize={dialPadSize}
          dialPadTextSize={dialPadTextSize}
          onCodeChange={handleCodeChange}
          onPinSubmit={handlePinSubmit}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    position: 'relative',
  },
  dialPadContainer: {
    width: dialPadSize,
    height: dialPadSize,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 50,
    borderColor: 'transparent',
  },
  dialPadText: {
    color: '#1DB3B3',
    fontSize: dialPadTextSize,
  },
})
