import { StyleSheet, View } from 'react-native'

import { WinkTabPanel, WinkTabs } from '../molecules/WinkTabs'
import { WinkManageExamTiles } from '../organisms/admin/WinkManageExamTiles'
import { WinkManageLists } from '../organisms/admin/WinkManageLists'
import { WinkManageLogs } from '../organisms/admin/WinkManageLogs'
import { WinkManageSections } from '../organisms/admin/WinkManageSections'
import { WinkManageVisitTypes } from '../organisms/admin/WinkManageVisitTypes'

export const WinkAdminPage = () => {
  return (
    <View style={styles.adminPage}>
      <WinkTabs>
        <WinkTabPanel title="Visit Types">
          <WinkManageVisitTypes />
        </WinkTabPanel>
        <WinkTabPanel title="Sections">
          <WinkManageSections />
        </WinkTabPanel>
        <WinkTabPanel title="Exam Tiles">
          <WinkManageExamTiles />
        </WinkTabPanel>
        <WinkTabPanel title="Lists">
          <WinkManageLists />
        </WinkTabPanel>
        <WinkTabPanel title="Logs">
          <WinkManageLogs />
        </WinkTabPanel>
      </WinkTabs>
    </View>
  )
}

const styles = StyleSheet.create({
  adminPage: {
    flex: 1,
    flexDirection: 'row',
  },
})
