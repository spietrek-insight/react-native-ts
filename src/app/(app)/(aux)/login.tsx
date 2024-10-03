import { View } from 'react-native'

import { useTranslation } from 'react-i18next'
import { Button } from 'react-native-paper'

import { useSession } from '@/providers/sessionProvider'

export default function LoginScreen() {
  const { t } = useTranslation('loginScreen')
  const { signIn } = useSession()

  function handleLoginPress() {
    console.log('login press')
    signIn()
  }

  return (
    <View
      id="LoginScreen"
      testID="LoginScreen"
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Button onPress={() => handleLoginPress()}>{t('signIn')}</Button>
    </View>
  )
}
