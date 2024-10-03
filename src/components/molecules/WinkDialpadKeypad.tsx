import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { Feather } from '@expo/vector-icons'

// create DialpadKeypadProps type given the props passed in PinPad.tsx
type DialpadKeypadProps = {
  dialPadContent: (string | number)[]
  pinLength: number
  code: number[]
  dialPadSize: number
  dialPadTextSize: number
  onCodeChange: (code: number[]) => void
  onPinSubmit: (pin: number[]) => void
}

export const WinkDialpadKeypad = ({
  dialPadContent,
  pinLength,
  code,
  dialPadSize,
  dialPadTextSize,
  onCodeChange,
  onPinSubmit,
}: DialpadKeypadProps) => {
  const handleCodeChange = (value: string | number) => {
    let result: number[] = []

    if (value === 'X') {
      result = code.slice(0, -1)
    } else {
      if (code.length < pinLength) {
        result = [...code, value as number]
      }
    }

    onCodeChange(result)
    if (code.length === pinLength - 1) {
      onPinSubmit(result)
    }
  }

  return (
    <FlatList
      data={dialPadContent}
      numColumns={3} // set number of columns
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            disabled={item === ''} // make the empty space on the dialpad content unclickable
            onPress={() => {
              handleCodeChange(item)
            }}
          >
            <View
              style={[
                {
                  backgroundColor: item === '' ? 'transparent' : '#fff',
                  width: dialPadSize,
                  height: dialPadSize,
                },
                styles.dialPadContainer,
              ]}
            >
              {item === 'X' ? (
                <Feather name="delete" size={dialPadTextSize} color="#1DB3B3" />
              ) : (
                <Text
                  style={[{ fontSize: dialPadTextSize }, styles.dialPadText]}
                >
                  {item}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  dialPadContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 50,
    borderColor: 'transparent',
  },
  dialPadText: {
    color: '#1DB3B3',
  },
})
