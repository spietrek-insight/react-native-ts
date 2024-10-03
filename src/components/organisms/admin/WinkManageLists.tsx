import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import {
  Button,
  DataTable,
  Dialog,
  Portal,
  TextInput,
} from 'react-native-paper'

type Code = {
  idlists: number
  list_name?: string
  description_en: string
  description_fr: string
  description_it?: string
  description_es?: string
  povOnlineId?: number
  listgroup_idListgroup?: number
  rank_en?: number
  rank_fr?: number
  rank_it?: number
  rank_es?: number
}

type List = {
  label: string
  value: string
}

export const WinkManageLists = (): JSX.Element => {
  const [lists, setLists] = useState<List[]>([])
  const [selectedList, setSelectedList] = useState<List | null>(null)
  const [codes, setCodes] = useState<Code[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<List>({
    label: 'English',
    value: 'en',
  })
  const [dialogVisible, setDialogVisible] = useState(false)
  const [newItem, setNewItem] = useState<Code>({
    idlists: 0,
    description_en: '',
    description_fr: '',
    description_it: '',
    description_es: '',
    rank_en: 0,
    rank_fr: 0,
    rank_it: 0,
    rank_es: 0,
  })
  // const [selectedItem, setSelectedItem] = useState<Code | null>(null)
  // const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
  //   useState(false)

  const languages = [
    { label: 'English', value: 'en' },
    { label: 'French', value: 'fr' },
    { label: 'Italian', value: 'it' },
    { label: 'Spanish', value: 'es' },
  ]

  useEffect(() => {
    const loadData = async () => {
      await fetch('/data/codes.json')
        .then(response => response.json())
        .then(data => {
          const listNames = data.map((item: Code) => item.list_name)
          const uniqueListNames: string[] = Array.from(new Set(listNames))
          const sortedListNames = uniqueListNames.sort((a, b) =>
            a.localeCompare(b, undefined, { sensitivity: 'accent' }),
          )
          const mappedListNames = sortedListNames.map(name => ({
            label: name,
            value: name,
          }))
          setLists(mappedListNames)
        })
    }

    void loadData()
  }, [])

  useEffect(() => {
    const loadData = async () => {
      await fetch('/data/codes.json')
        .then(response => response.json())
        .then(data => {
          const filteredCodes = data.filter(
            (item: Code) => item.list_name === selectedList?.value,
          )
          setCodes(filteredCodes)
        })
    }

    if (selectedList) {
      void loadData()
    }
  }, [selectedList])

  const addNewItem = () => {
    if (
      !newItem.description_en ||
      newItem.idlists === 0 ||
      newItem.rank_en === 0
    ) {
      alert('Please fill in all required fields.')
      return
    }
    setCodes(prev => [...prev, newItem])
    setNewItem({
      idlists: 0,
      description_en: '',
      description_fr: '',
      description_it: '',
      description_es: '',
      rank_en: 0,
      rank_fr: 0,
      rank_it: 0,
      rank_es: 0,
    })
    setDialogVisible(false)
  }

  return (
    <ScrollView>
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
        >
          <Dialog.Title>Add New Item</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="ID (required)"
              value={String(newItem.idlists)}
              onChangeText={text =>
                setNewItem({ ...newItem, idlists: Number(text) })
              }
              keyboardType="numeric"
            />
            <TextInput
              label="Description (required)"
              value={newItem.description_en}
              onChangeText={text =>
                setNewItem({ ...newItem, description_en: text })
              }
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
            <Button onPress={addNewItem}>Add</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <View style={styles.filterContainer}>
        <Dropdown
          data={languages}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select language"
          value={selectedLanguage.value}
          onChange={item => {
            setSelectedLanguage(item)
          }}
          style={styles.dropdown}
        />

        <Dropdown
          data={lists}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select list"
          searchPlaceholder="Search..."
          value={selectedList?.value}
          onChange={item => {
            setSelectedList(item)
          }}
          style={[styles.dropdown, styles.rightDropdown]}
        />
      </View>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title>Description</DataTable.Title>
          <DataTable.Title numeric>Rank</DataTable.Title>
        </DataTable.Header>
        {codes.map(code => (
          <DataTable.Row key={code.idlists}>
            <DataTable.Cell>{code.idlists}</DataTable.Cell>
            <DataTable.Cell>
              {code[`description_${selectedLanguage.value}` as keyof Code]}
            </DataTable.Cell>
            <DataTable.Cell numeric>
              {code[`rank_${selectedLanguage.value}` as keyof Code]}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    marginLeft: 16,
  },
  dropdown: {
    width: 260,
  },
  rightDropdown: {
    marginLeft: 10,
  },
})
