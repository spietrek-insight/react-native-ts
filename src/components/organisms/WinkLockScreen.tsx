import { View, Text, Image, StyleSheet } from 'react-native'

import { Button } from 'react-native-paper'

import { WinkPinEntry } from './WinkPinEntry'

type LockScreenProps = {
  onGoActive: () => void
  onSignOut: () => void
}

export const WinkLockScreen = ({ onGoActive, onSignOut }: LockScreenProps) => {
  const handleUnlock = (pin: string) => {
    if (pin === '1234') {
      onGoActive()
    }
  }

  const handleSignOut = () => {
    onSignOut()
  }

  return (
    <View style={styles.container} testID="LockScreen">
      <View style={styles.roundedContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.logo}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
            />
          </View>
          <View>
            <View>
              <Text style={styles.title}>Your session has expired</Text>
            </View>
            <View>
              <Text style={styles.subtitle}>
                Enter your pin to pick up from where you left
              </Text>
            </View>

            <WinkPinEntry onUnlock={handleUnlock} />

            <View style={styles.button}>
              <Text style={styles.buttonText}>
                <Button mode="text" onPress={handleSignOut}>
                  Not Steve Pietrek? Logout
                </Button>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundedContainer: {
    backgroundColor: '#eee',
  },
  logo: {
    marginRight: 8,
    height: 240,
    width: 240,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    marginLeft: 1,
    fontSize: 16,
    marginTop: 8,
  },
  button: {
    marginTop: 8,
    width: '100%',
    alignItems: 'flex-end',
  },
  buttonText: {
    color: 'blue',
  },
})
