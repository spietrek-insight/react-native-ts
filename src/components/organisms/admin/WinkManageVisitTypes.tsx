/* eslint-disable max-lines */
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import {
  Button,
  DataTable,
  Dialog,
  IconButton,
  Portal,
  TextInput,
} from 'react-native-paper'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { VisitType } from '@/interfaces/visitType'

type List = {
  label: string
  value: string
}

export const WinkManageVisitTypes = (): JSX.Element => {
  const [visitTypes, setVisitTypes] = useState<VisitType[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<List>({
    label: 'English',
    value: 'en',
  })
  const [dialogVisible, setDialogVisible] = useState(false)
  const [newItem, setNewItem] = useState<VisitType>({
    idVisitTypes: 0,
    name_en: '',
    name_fr: '',
    name_it: '',
    name_es: '',
    version: 0,
    inactive: 0,
    digital: 0,
  })
  const [selectedItem, setSelectedItem] = useState<VisitType | null>(null)
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false)
  const languages = [
    { label: 'English', value: 'en' },
    { label: 'French', value: 'fr' },
    { label: 'Italian', value: 'it' },
    { label: 'Spanish', value: 'es' },
  ]

  useEffect(() => {
    void fetch('/data/visitTypes.json')
      .then(response => response.json())
      .then(data => {
        setVisitTypes(data)
      })
  }, [])

  const showDialog = () => setDialogVisible(true)
  const hideDialog = () => setDialogVisible(false)

  const addNewItem = () => {
    if (!newItem.name_en || newItem.idVisitTypes === 0) {
      alert('Please fill in all required fields.')
      return
    }
    setVisitTypes([...visitTypes, newItem])
    setNewItem({
      idVisitTypes: 0,
      name_en: '',
      name_fr: '',
      name_it: '',
      name_es: '',
      version: 0,
      inactive: 0,
      digital: 0,
    }) // Reset for the next input
    hideDialog()
  }

  const footer = (
    <View style={styles.footer}>
      <Button
        mode="outlined"
        icon="cancel"
        onPress={hideDialog}
        style={styles.button}
      >
        Cancel
      </Button>
      <Button
        mode="contained"
        icon="check"
        onPress={addNewItem}
        style={styles.button}
      >
        Add
      </Button>
    </View>
  )

  const onDeleteConfirm = (item: VisitType) => {
    setSelectedItem(item)
    setDeleteConfirmationVisible(true)
  }

  const onDelete = () => {
    if (selectedItem) {
      const newData = visitTypes.filter(
        item => item.idVisitTypes !== selectedItem.idVisitTypes,
      )
      setVisitTypes(newData)
      setDeleteConfirmationVisible(false)
      setSelectedItem(null)
    }
  }

  const deleteConfirmationFooter = (
    <View style={styles.footer}>
      <Button
        mode="text"
        onPress={() => setDeleteConfirmationVisible(false)}
        style={styles.button}
      >
        No
      </Button>
      <Button
        mode="contained"
        onPress={onDelete}
        style={[styles.button, styles.dangerButton]}
      >
        Yes
      </Button>
    </View>
  )

  return (
    <>
      <View style={styles.container}>
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

        <Button
          mode="contained"
          onPress={showDialog}
          icon={() => (
            <MaterialCommunityIcons name="plus" size={24} color="white" />
          )}
          style={styles.addButton}
        >
          Add
        </Button>
      </View>

      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={hideDialog}
          style={styles.dialog}
        >
          <Dialog.Title>Add New Item</Dialog.Title>
          <Dialog.Content>
            <View style={styles.inputContainer}>
              <TextInput
                label="ID (required)"
                value={newItem.idVisitTypes.toString()}
                onChangeText={text =>
                  setNewItem({ ...newItem, idVisitTypes: parseInt(text) })
                }
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                label="Description (required)"
                value={newItem.name_en}
                onChangeText={text => setNewItem({ ...newItem, name_en: text })}
                style={styles.input}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                label="Version (required)"
                value={newItem.version?.toString()}
                onChangeText={text =>
                  setNewItem({ ...newItem, version: parseInt(text) })
                }
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                label="Inactive (required)"
                value={newItem.inactive.toString()}
                onChangeText={text =>
                  setNewItem({ ...newItem, inactive: parseInt(text) })
                }
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                label="Digital (required)"
                value={newItem.digital.toString()}
                onChangeText={text =>
                  setNewItem({ ...newItem, digital: parseInt(text) })
                }
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
          </Dialog.Content>
          <Dialog.Actions>{footer}</Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          visible={deleteConfirmationVisible}
          onDismiss={() => setDeleteConfirmationVisible(false)}
          style={styles.dialog}
        >
          <Dialog.Title>Confirmation</Dialog.Title>
          <Dialog.Content>
            <View style={styles.confirmationContainer}>
              <Text>Are you sure you want to delete this record?</Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>{deleteConfirmationFooter}</Dialog.Actions>
        </Dialog>
      </Portal>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title style={styles.nameColumn}>Name</DataTable.Title>
          <DataTable.Title>Version</DataTable.Title>
          <DataTable.Title>Inactive</DataTable.Title>
          <DataTable.Title>Digital</DataTable.Title>
          <DataTable.Title> </DataTable.Title>
        </DataTable.Header>

        {visitTypes.map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{item.idVisitTypes}</DataTable.Cell>
            {selectedLanguage.value === 'en' && (
              <DataTable.Cell style={styles.nameColumn}>
                {item.name_en}
              </DataTable.Cell>
            )}
            {selectedLanguage.value === 'fr' && (
              <DataTable.Cell style={styles.nameColumn}>
                {item.name_fr}
              </DataTable.Cell>
            )}
            {selectedLanguage.value === 'it' && (
              <DataTable.Cell style={styles.nameColumn}>
                {item.name_it}
              </DataTable.Cell>
            )}
            {selectedLanguage.value === 'es' && (
              <DataTable.Cell style={styles.nameColumn}>
                {item.name_es}
              </DataTable.Cell>
            )}
            <DataTable.Cell>{item.version}</DataTable.Cell>
            <DataTable.Cell>{item.inactive}</DataTable.Cell>
            <DataTable.Cell>{item.digital}</DataTable.Cell>
            <DataTable.Cell>
              <IconButton
                mode="contained"
                style={styles.iconButton}
                icon={() => (
                  <MaterialCommunityIcons
                    name="pencil"
                    size={24}
                    color="white"
                  />
                )}
                onPress={() => console.log('Edit')}
              ></IconButton>
              <IconButton
                mode="contained"
                style={styles.iconButton}
                icon={() => (
                  <MaterialCommunityIcons
                    name="delete"
                    size={24}
                    color="white"
                  />
                )}
                onPress={() => onDeleteConfirm(item)}
              ></IconButton>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  dropdown: {
    width: 260,
  },
  addButton: {
    marginLeft: 16,
  },
  dialog: {
    width: '80%',
    backgroundColor: 'white',
    zIndex: 1000,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginHorizontal: 8,
  },
  iconButton: {
    backgroundColor: '#1DB3B3',
  },
  dangerButton: {
    backgroundColor: 'red',
  },
  confirmationContainer: {
    alignItems: 'center',
  },
  nameColumn: {
    flex: 1,
    minWidth: 200,
  },
})
