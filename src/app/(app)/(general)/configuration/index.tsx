import { Text, View } from 'react-native'

import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function ConfigurationScreen() {
  useDocumentTitle('Configuration')

  return (
    <View id="ConfigurationScreen">
      <Text>Configuration</Text>
    </View>
  )
}
