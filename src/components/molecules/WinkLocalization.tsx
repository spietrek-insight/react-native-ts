import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Divider, Menu } from 'react-native-paper'

type Props = {
  onLocaleChange?: (newLocale: string) => void
}

export const WinkLocalization = ({ onLocaleChange }: Props) => {
  const [visible, setVisible] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('en_US')

  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const handleLocaleChange = (newLocale: string) => {
    setSelectedLanguage(newLocale)
    if (onLocaleChange) {
      onLocaleChange(newLocale)
      closeMenu()
    }
  }

  return (
    <View id="Localization" testID="Localization">
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button mode="contained" onPress={openMenu}>
            {selectedLanguage}
          </Button>
        }
        anchorPosition="bottom"
        style={styles.menu}
      >
        <Menu.Item
          onPress={() => handleLocaleChange('en_US')}
          title="English"
        />
        <Divider />
        <Menu.Item
          onPress={() => handleLocaleChange('fr_CA')}
          title="Français"
        />
        <Divider />
        <Menu.Item
          onPress={() => handleLocaleChange('es_SP')}
          title="Español"
        />
      </Menu>
    </View>
  )
}

const styles = StyleSheet.create({
  menu: {
    width: 140,
    marginLeft: 10,
  },
})
