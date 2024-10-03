//  create a new component named BackButton
// if should accept a onBack prop
// it should use FontAwesome from '@expo/vector-icons'
// the arrow-left icon should be used
// the component should be a Pressable
// the icon should be white and be a size of 50
// the onPress should call the onBack prop

import { Pressable, StyleSheet } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

interface IProps {
  onBack: () => void
}

export const WinkBackButton = ({ onBack }: IProps) => {
  return (
    <Pressable
      id="back-button"
      testID="back-button"
      onPress={onBack}
      style={styles.container}
    >
      <Ionicons
        name="return-up-back"
        style={styles.icon}
        size={40}
        color="white"
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2dc3c3',
    borderRadius: 48.75,
  },
  icon: {
    padding: 10,
    //center icon
    alignSelf: 'center',
    // icon should not be bold
    fontWeight: 'normal',
  },
})
