import { StyleSheet, View } from 'react-native'

type DialpadPinProps = {
  pinLength: number
  pinSize: number
  dialPadContent: (string | number)[]
  code: number[]
}

export const WinkDialpadPin = ({
  pinLength,
  pinSize,
  dialPadContent,
  code,
}: DialpadPinProps) => {
  return (
    <View style={styles.dialPadPinContainer}>
      {Array(pinLength)
        .fill(null)
        .map((_, index) => {
          const item = dialPadContent[index]
          const isSelected =
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            typeof item === 'number' && code[index] !== undefined
          return (
            <View
              key={index}
              style={{
                width: pinSize,
                height: pinSize,
                borderRadius: pinSize / 2,
                overflow: 'hidden',
                margin: 5,
              }}
            >
              <View
                style={[
                  {
                    borderRadius: pinSize / 2,
                    borderColor: !isSelected ? 'lightgrey' : '#1DB3B3',
                  },
                  styles.pinContentContainer,
                ]}
              >
                {isSelected && (
                  <View
                    style={[
                      {
                        width: pinSize * 0.5,
                        height: pinSize * 0.5,
                        borderRadius: pinSize * 0.35,
                      },
                      styles.pinContent,
                    ]}
                  />
                )}
              </View>
            </View>
          )
        })}
    </View>
  )
}

const styles = StyleSheet.create({
  dialPadPinContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'flex-end',
  },
  pinContentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinContent: {
    backgroundColor: '#1DB3B3',
  },
})
