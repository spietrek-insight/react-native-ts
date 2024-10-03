import { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import {
  Button,
  DataTable,
  Dialog,
  Paragraph,
  Portal,
} from 'react-native-paper'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { YEAR_TIME_FORMAT } from '@/constants/dates'
import { usePagination } from '@/hooks/useDataTablePagination'

import { WinkLogsFilterForm } from './WinkLogsFilterForm'

dayjs.extend(utc)

type UserLogItem = {
  idUserLog: number
  date: number
  action: number
  comment: string
  User_idUser: number
  Store_idStore: number
  table: string
  field: string
  key: number
  oldValue: string
  newValue: string
  Patient_idPatient: number
  Visit_idVisit: number
  userName: string
  storeName: string
  patientFullName: string
}

export const WinkManageLogs = (): JSX.Element => {
  const [filterFormVisible, setFilterFormVisible] = useState(false)
  const [items, setItems] = useState<UserLogItem[]>([])
  const [loading, setLoading] = useState(true)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof UserLogItem
    direction: 'ascending' | 'descending'
  }>({ key: 'date', direction: 'descending' })
  const [visible, setVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState<UserLogItem | null>(null)

  const {
    page,
    itemsPerPage,
    from,
    to,
    setPage,
    onItemsPerPageChange,
    numberOfItemsPerPageList,
  } = usePagination({ itemsLength: items.length })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true) // Assuming setLoading is available in this scope

        // Fetch the first data set
        const response = await fetch('/data/userLogA.json')
        const data = await response.json()

        // Fetch the second data set
        const usersResponse = await fetch('/data/users.json')
        const users = await usersResponse.json()

        // Fetch the third data set
        const storesResponse = await fetch('/data/stores.json')
        const stores = await storesResponse.json()

        // Fetch the third data set
        const patientsResponse = await fetch('/data/patients.json')
        const patients = await patientsResponse.json()

        // Process the data
        const sortedData = data
          .map((item: UserLogItem) => ({
            ...item,
            userName: users.find(
              (user: { idUser: number }) => user.idUser === item.User_idUser,
            )?.username,
            storeName: stores.find(
              (store: { idStore: number }) =>
                store.idStore === item.Store_idStore,
            )?.name,
            // set patientFullName which is combination of firstname + lastname
            patientFullName:
              patients.find(
                (patient: { idPatient: number }) =>
                  patient.idPatient === item.Patient_idPatient,
              )?.firstname +
              ' ' +
              patients.find(
                (patient: { idPatient: number }) =>
                  patient.idPatient === item.Patient_idPatient,
              )?.lastname,
          }))
          .sort((a: UserLogItem, b: UserLogItem) => b.date - a.date)

        setItems(sortedData) // Assuming setItems is available in this scope
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false) // Ensure loading is turned off whether or not there was an error
      }
    }

    void fetchData()
  }, [])

  const sortData = (sortBy: keyof UserLogItem) => {
    const isAsc =
      sortConfig.key === sortBy && sortConfig.direction === 'ascending'
    const direction = isAsc ? 'descending' : 'ascending'
    const sortedData = [...items].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return direction === 'ascending' ? -1 : 1
      }
      if (a[sortBy] > b[sortBy]) {
        return direction === 'ascending' ? 1 : -1
      }
      return 0
    })
    setItems(sortedData)
    setSortConfig({ key: sortBy, direction })
  }

  const showDialog = (item: UserLogItem) => {
    setSelectedItem(item)
    setVisible(true)
  }

  const hideDialog = () => {
    setVisible(false)
    setSelectedItem(null)
  }

  const handleDisplayFilterForm = () => {
    setFilterFormVisible(!filterFormVisible)
  }

  if (loading) {
    return <ActivityIndicator size="large" />
  }

  return (
    <>
      <WinkLogsFilterForm
        visible={filterFormVisible}
        onClose={handleDisplayFilterForm}
        options={{
          range: {
            startDate: undefined,
            endDate: undefined,
          },
          editors: [],
          patients: [],
          stores: [],
        }}
        onApply={() => console.log('onApply')}
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={styles.dialogStyle}
        >
          <Dialog.ScrollArea style={styles.scrollArea}>
            <ScrollView>
              <Paragraph>Action: {selectedItem?.action}</Paragraph>
              <Paragraph>Comment: {selectedItem?.comment}</Paragraph>
              <Paragraph>Table: {selectedItem?.table}</Paragraph>
              <Paragraph>Field: {selectedItem?.field}</Paragraph>
              <Paragraph>Old Value: {selectedItem?.oldValue}</Paragraph>
              <Paragraph>New Value: {selectedItem?.newValue}</Paragraph>
              <Paragraph>Visit ID: {selectedItem?.Visit_idVisit}</Paragraph>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={hideDialog} style={styles.button}>
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <ScrollView style={styles.container}>
        <Button
          mode="contained"
          onPress={handleDisplayFilterForm}
          style={styles.button}
        >
          Filter
        </Button>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.idCell}>ID</DataTable.Title>
            <DataTable.Title
              sortDirection={
                sortConfig.key === 'date' ? sortConfig.direction : undefined
              }
              onPress={() => sortData('date')}
              style={styles.dateCell}
            >
              Date
            </DataTable.Title>
            <DataTable.Title>Editor</DataTable.Title>
            <DataTable.Title>Store</DataTable.Title>
            <DataTable.Title>Patient</DataTable.Title>
          </DataTable.Header>

          {items.slice(from, to).map(item => (
            <DataTable.Row key={item.idUserLog}>
              <DataTable.Cell
                style={styles.idCell}
                onPress={() => showDialog(item)}
              >
                {item.idUserLog}
              </DataTable.Cell>
              <DataTable.Cell style={styles.dateCell}>
                {dayjs(item.date).utc().local().format(YEAR_TIME_FORMAT)}
              </DataTable.Cell>
              <DataTable.Cell>{item.userName}</DataTable.Cell>
              <DataTable.Cell>{item.storeName}</DataTable.Cell>
              <DataTable.Cell>{item.patientFullName}</DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(items.length / itemsPerPage)}
            onPageChange={page => setPage(page)}
            label={`${from + 1}-${to} of ${items.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel="Rows per page"
          />
        </DataTable>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dialogStyle: {
    backgroundColor: 'white', // You can adjust the color to match your theme
    borderRadius: 6,
    elevation: 10, // Shadow for Android
    marginHorizontal: 20, // Ensures some space from the screen edges
  },
  scrollArea: {
    maxHeight: 400, // Limits the height to ensure it doesn't take full screen
    paddingHorizontal: 20, // Inner padding for the content
  },
  paragraph: {
    marginBottom: 10, // Space between paragraphs for better readability
  },
  button: {
    margin: 10, // Margin around the button
  },
  idCell: {
    flex: 1,
    maxWidth: 80,
  },
  dateCell: {
    flex: 1,
    maxWidth: 130,
  },
})
