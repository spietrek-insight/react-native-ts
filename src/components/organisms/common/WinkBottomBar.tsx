import React from 'react'
import { StyleSheet } from 'react-native'

import { usePathname, useRouter } from 'expo-router'
import { Surface } from 'react-native-paper'

import { WinkTabButton } from '@/components/molecules/WinkTabButton'
import { useSession } from '@/providers/sessionProvider'

export const WinkBottomBar: React.FC = () => {
  const navigation = useRouter()
  const pathName = usePathname()
  const { signOut, goInactive } = useSession()

  const handleGoHome = () => {
    navigation.replace('/')
  }

  return (
    <Surface style={styles.container} elevation={4} mode="flat">
      {pathName !== '/' && (
        <WinkTabButton icon="home" label="Home" onPress={handleGoHome} />
      )}

      <WinkTabButton icon="account" label="Patient" onPress={goInactive} />
      <WinkTabButton
        icon="account-reactivate"
        label="Referrals"
        onPress={goInactive}
      />
      <WinkTabButton icon="lock" label="Lock" onPress={goInactive} />
      <WinkTabButton icon="logout" label="Sign Out" onPress={signOut} />
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomBarButton: {
    marginHorizontal: 16,
  },
})
