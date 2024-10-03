// create a component that has a + icon using FontAwesome6 from @expo/vector-icons
// and a text that says "Add" next to it
// the properties should be backgroundColor, fontColor, onPress

import { Pressable, StyleSheet, Text } from 'react-native'

import { FontAwesome6 } from '@expo/vector-icons'

interface IProps {
  onPress: () => void
}

export const WinkAddButton = ({ onPress }: IProps) => {
  return (
    <Pressable
      id="add-button"
      testID="add-button"
      style={styles.container}
      onPress={onPress}
    >
      <FontAwesome6 name="plus" size={24} color="white" />
      <Text style={styles.text}>Add</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1DB3B3',
    padding: 8,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    marginLeft: 8,
  },
})
