import { View, ActivityIndicator, StyleSheet } from 'react-native'

interface LoadingIndicatorProps {
  loading: boolean
}

export const WinkLoadingIndicator = ({
  loading,
}: LoadingIndicatorProps): JSX.Element | null => {
  if (!loading) return null

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
