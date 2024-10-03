import { StyleSheet, Text, View } from 'react-native'
import { IconButton } from 'react-native-paper'

type TabButtonProps = {
  icon: string
  label: string
  onPress: () => void
  selected?: boolean
}

export const WinkTabButton = ({
  icon,
  label,
  onPress,
  selected = false,
}: TabButtonProps) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon={icon}
        size={24}
        iconColor={selected ? '#0A3838' : '#000'}
        onPress={onPress}
        style={styles.iconButton} // Added style prop
      />
      <Text style={[styles.label, selected && styles.selectedLabel]}>
        {label}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  iconButton: {
    margin: 0, // Remove default margin of IconButton
    padding: 0, // Remove default padding of IconButton
  },
  label: {
    fontSize: 12,
    color: '#000',
    marginTop: -4, // Reduced margin between icon and text
  },
  selectedLabel: {
    color: '#0A3838',
  },
})
