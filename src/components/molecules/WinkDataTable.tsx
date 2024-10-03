import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import {
  CodeEntryContactLens,
  CodeEntryObject,
  CodeEntryString,
  CodeEntryStringArray,
} from '@/interfaces/codes'
import { AntDesign, Feather } from '@expo/vector-icons'

import { WinkAddButton } from '../atoms/WinkAddButton'

interface DataTableProps {
  data:
    | CodeEntryString[]
    | CodeEntryStringArray[]
    | CodeEntryObject[]
    | CodeEntryContactLens[]
  onDelete: (
    item:
      | CodeEntryString
      | CodeEntryStringArray
      | CodeEntryObject
      | CodeEntryContactLens,
  ) => void
  onEdit: (
    item:
      | CodeEntryString
      | CodeEntryStringArray
      | CodeEntryObject
      | CodeEntryContactLens,
  ) => void
}

export const WinkDataTable = ({ data, onDelete, onEdit }: DataTableProps) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editRowData, setEditRowData] = useState<
    | CodeEntryString
    | CodeEntryStringArray
    | CodeEntryObject
    | CodeEntryContactLens
  >([])

  const handleDelete = (
    item:
      | CodeEntryString
      | CodeEntryStringArray
      | CodeEntryObject
      | CodeEntryContactLens,
  ) => {
    if (window.confirm('Are you sure you want to delete this row?')) {
      onDelete(item)
    }
  }

  const handleEdit = (
    item:
      | CodeEntryString
      | CodeEntryStringArray
      | CodeEntryObject
      | CodeEntryContactLens,
  ) => {
    setEditRowData(item)
    setShowEditModal(true)
  }

  const getHeaderColumns = () => {
    console.log('getHeaderColumns', data)

    // if data is an array of strings, return Value as the header
    if (data.every(item => typeof item === 'string')) {
      return <Text style={styles.tableHeaderText}>Value</Text>
    }

    // if data is an array of string arrays, return Value as the header
    if (data.every(item => Array.isArray(item))) {
      return <Text style={styles.tableHeaderText}>Value</Text>
    }

    // if data is an array of objects, return the keys as the headers
    if (data.every(item => typeof item === 'object')) {
      return Object.keys(data[0]).map((key, index) => (
        <Text key={index} style={styles.tableHeaderText}>
          {/* capitalize the first letter of the key */}
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </Text>
      ))
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getCellData = (item: any) => {
    // if typeof item is an array of strings, join each string with a comman and return the combined string
    if (Array.isArray(item) && item.every(i => typeof i === 'string')) {
      return (
        <View style={styles.bodyContainer}>
          <Text style={styles.tableCell}>{item.join(', ')}</Text>
        </View>
      )
    }

    if (typeof item === 'object') {
      return (
        <>
          {Object.values(item).map((value, index) => (
            <View key={index} style={styles.bodyContainer}>
              <Text style={styles.tableCell}>{value as string}</Text>
            </View>
          ))}
        </>
      )
    }

    if (typeof item === 'string') {
      return (
        <View style={styles.bodyContainer}>
          <Text style={styles.tableCell}>{item}</Text>
        </View>
      )
    }
  }

  return (
    <View id="DataTable" style={styles.container}>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          {getHeaderColumns()}
          <Text style={styles.tableActionsHeaderText}>Actions</Text>
        </View>

        <View style={styles.tableBody}>
          {data.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.bodyContainer}>{getCellData(row)}</View>

              <View style={styles.actionsContainer}>
                <Pressable
                  testID="EditButton"
                  style={styles.editButton}
                  onPress={() => handleEdit(row)}
                >
                  <Feather name="edit" style={styles.icon} size={18} />
                </Pressable>
                <Pressable
                  testID="DeleteButton"
                  style={styles.deleteButton}
                  onPress={() => handleDelete(row)}
                >
                  <AntDesign name="close" style={styles.icon} size={18} />
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </View>

      <WinkAddButton onPress={() => setShowAddModal(true)} />

      {showAddModal && (
        <View style={styles.modalContainer}>
          {/* Add modal content */}
          <Pressable
            testID="CancelButton"
            style={styles.cancelButton}
            onPress={() => setShowAddModal(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          {/* <Pressable style={styles.confirmButton} onPress={() => handleAdd({})}>
            <Text style={styles.buttonText}>Confirm</Text>
          </Pressable> */}
        </View>
      )}

      {showEditModal && (
        <View style={styles.modalContainer}>
          {/* Edit modal content */}
          <Pressable
            testID="CancelButton"
            style={styles.cancelButton}
            onPress={() => setShowEditModal(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          <Pressable
            testID="ConfirmButton"
            style={styles.confirmButton}
            onPress={() => onEdit(editRowData)}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#1DB3B3',
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
    maxWidth: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'left',
    padding: 8,
    flexGrow: 1,
  },
  tableActionsHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'right',
    padding: 8,
  },
  tableBody: {
    padding: 0,
  },
  tableRow: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
  },
  tableCell: {
    flex: 1,
    textAlign: 'left',
    paddingLeft: 4,
  },
  bodyContainer: {
    flexDirection: 'row',
    // left justify the content
    justifyContent: 'flex-start',
    padding: 4,
    // flex-grow
    flexGrow: 1,
  },
  icon: {
    padding: 2,
    alignSelf: 'center',
    fontWeight: 'normal',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    padding: 4,
    borderRadius: 4,
    marginRight: 4,
  },
  deleteButton: {
    padding: 4,
    borderRadius: 4,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 16,
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  confirmButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 4,
  },
})
