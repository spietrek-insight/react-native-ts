import { StyleSheet, View } from 'react-native'

import { Link, Slot, usePathname, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'

import i18next from '../../../i18next'

import { WinkAvatar } from '@/components/atoms/WinkAvatar'
import { WinkBackButton } from '@/components/atoms/WinkBackButton'
import { WinkVersion } from '@/components/atoms/WinkVersion'
import { WinkLocalization } from '@/components/molecules/WinkLocalization'
import { WinkBottomBar } from '@/components/organisms/common/WinkBottomBar'

export default function GeneralLayout() {
  const { t } = useTranslation('layout')
  const navigation = useRouter()
  const pathName = usePathname()

  const goBack = () => {
    navigation.back()
  }

  const handleLocaleChange = (newLocale: string) => {
    void i18next.changeLanguage(newLocale)

    void i18next.changeLanguage(newLocale, (err, t) => {
      if (err) return console.log('something went wrong loading', err)
      t('key') // -> same as i18next.t
    })
  }

  const renderLocale = () => {
    return <WinkLocalization onLocaleChange={handleLocaleChange} />
  }

  const renderAvatar = () => {
    return <WinkAvatar />
  }

  const renderBackButton = () => {
    // TODO - create BackButton component
    if (!navigation.canGoBack()) return null

    if (pathName === '/') return null

    return (
      <View style={styles.goBackButton}>
        <WinkBackButton onBack={goBack} />
      </View>
    )
  }

  const renderLinks = () => {
    // TODO - create Links component
    // render Scheduler and Configuration links with space in between
    // and white text text and larger font
    return (
      <>
        {pathName !== '/scheduler' && (
          <Link href="/scheduler/" style={styles.link}>
            {t('scheduler')}
          </Link>
        )}

        {pathName !== '/configuration' && (
          <Link href="/configuration/" style={styles.link}>
            {t('configuration')}
          </Link>
        )}

        {pathName !== '/admin' && (
          <Link href="/admin/" style={styles.link}>
            {t('admin')}
          </Link>
        )}
      </>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.firstColumn}>
        <View style={styles.slotContainer}>
          <Slot />
        </View>
        <WinkBottomBar />
      </View>

      <View style={styles.secondColumn}>
        {renderLocale()}
        {renderAvatar()}
        {renderBackButton()}
        {renderLinks()}
        <WinkVersion />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  firstColumn: {
    flex: 1,
  },
  secondColumn: {
    backgroundColor: '#1DB3B3',
    width: 160,
    height: '100%',
  },
  goBackButton: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  link: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'normal',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    alignSelf: 'center',
    marginBottom: 60,
  },
  slotContainer: {
    flex: 1,
    overflow: 'scroll',
    paddingBottom: 60,
    backgroundColor: '#fff',
  },
})
