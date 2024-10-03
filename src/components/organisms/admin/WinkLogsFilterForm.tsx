// create a new component named LogsFilterForm
// the component should be a form within a react-native-paper Dialog and Portal
// the component should have a date picker for the start and end dates
// the component should have a DropDown (using DropDownAlt) for the Editor
// Editor is an array of objects from the user.json file (idUser and username). should be displayed in a DropDownAlt component
// Patient is an array of objects from the patient.json file (idPatient and firstname + alias + lastname). should be displayed in a DropDownAlt component
// Store is an array of objects from the store.json file (idStore and name). should be displayed in a DropDownAlt component
// there should be state for editors, patients, and stores and the selected values for each
// the dialog should have actions for Cancel and Apply
// the component should have props for visible, options, and onApply
// options should be an object with the following properties:
// startDate: Date
// endDate: Date
// editors: array of numbers (idUser)
// patients: array of numbers (idPatient)
// stores: array of numbers (idStore)

import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Dialog, Portal } from 'react-native-paper'
import { DatePickerModal } from 'react-native-paper-dates'

type OptionsType = {
  range: RangeType
  editors: number[]
  patients: number[]
  stores: number[]
}

type LogsFilterFormProps = {
  visible: boolean
  options: OptionsType
  onApply: (options: OptionsType) => void
  onClose: () => void
}

type RangeType = {
  startDate: Date | undefined
  endDate: Date | undefined
}

export const WinkLogsFilterForm = ({
  visible,
  options,
  onApply,
  onClose,
}: LogsFilterFormProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editors, setEditors] = useState<any[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [patients, setPatients] = useState<any[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stores, setStores] = useState<any[]>([])
  const [selectedEditor, setSelectedEditor] = useState<number | undefined>(
    undefined,
  )
  const [selectedPatient, setSelectedPatient] = useState<number | undefined>(
    undefined,
  )
  const [selectedStore, setSelectedStore] = useState<number | undefined>(
    undefined,
  )
  const [range, setRange] = useState<RangeType>({
    startDate: undefined,
    endDate: undefined,
  })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Simulate fetching data for dropdowns
    setEditors([
      { idUser: 1, username: 'Editor1' },
      { idUser: 2, username: 'Editor2' },
    ])
    setPatients([
      { idPatient: 1, firstname: 'John', lastname: 'Doe' },
      { idPatient: 2, firstname: 'Jane', lastname: 'Doe' },
    ])
    setStores([
      { idStore: 1, name: 'Store1' },
      { idStore: 2, name: 'Store2' },
    ])
  }, [])

  const onDismiss = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const onConfirm = useCallback(
    ({ startDate, endDate }: RangeType) => {
      setOpen(false)
      setRange({ startDate, endDate })
    },
    [setOpen, setRange],
  )

  const applyFilters = () => {
    onApply({
      range,
      editors: selectedEditor ? [selectedEditor] : [],
      patients: selectedPatient ? [selectedPatient] : [],
      stores: selectedStore ? [selectedStore] : [],
    })
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => onApply(options)}>
        <Dialog.Title>Filter Logs</Dialog.Title>
        <Dialog.Content style={styles.dialogContent}>
          <Button
            onPress={() => setOpen(true)}
            uppercase={false}
            mode="outlined"
          >
            Pick range
          </Button>
          <DatePickerModal
            locale="en"
            mode="range"
            visible={open}
            onDismiss={onDismiss}
            startDate={range.startDate}
            endDate={range.endDate}
            onConfirm={onConfirm}
          />
          {/* <DropDownAlt
            label="Editor"
            value={selectedEditor}
            items={editors.map(editor => ({
              id: editor.idUser,
              name: editor.username,
            }))}
            onSelect={setSelectedEditor}
          />
          <DropDownAlt
            label="Patient"
            value={selectedPatient}
            items={patients.map(patient => ({
              id: patient.idPatient,
              name: `${patient.firstname} ${patient.lastname}`,
            }))}
            onSelect={setSelectedPatient}
          />
          <DropDownAlt
            label="Store"
            value={selectedStore}
            items={stores.map(store => ({
              id: store.idStore,
              name: store.name,
            }))}
            onSelect={setSelectedStore}
          /> */}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose} style={styles.button}>
            Cancel
          </Button>
          <Button onPress={applyFilters} style={styles.button}>
            Apply
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

const styles = StyleSheet.create({
  dialogContent: {
    padding: 20, // Adds padding inside the dialog content area
  },
  label: {
    fontSize: 16,
    marginBottom: 8, // Space below the label
    color: '#333', // Text color for better readability
  },
  datePickerText: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
    borderRadius: 4,
    overflow: 'hidden', // Ensures the background does not bleed outside the border radius
  },
  button: {
    margin: 8, // Space around buttons
  },
  dropdown: {
    marginBottom: 20, // Space below each dropdown
  },
})
