import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

type PageHeadingProps = {
  title: string
  subtitle?: string | null
}

export const WinkPageHeader: React.FC<PageHeadingProps> = ({
  title,
  subtitle = null,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000', // Adjust this to match your primary color
  },
  subtitle: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Adjust this to match your gray-800 color
  },
})
