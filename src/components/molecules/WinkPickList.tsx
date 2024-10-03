import { SetStateAction, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { IconButton, List } from 'react-native-paper'

import { FontAwesome } from '@expo/vector-icons'

type ItemType = {
  // define the type for each item in the source and target arrays
  label: string
  // add any other properties you need for each item
}

type PickListProps<T> = {
  source: T[]
  target: T[]
  onChange: (source: SetStateAction<T[]>, target: SetStateAction<T[]>) => void
  sourceHeader: string
  targetHeader: string
}

export const WinkPickList = <T extends ItemType>({
  source,
  target,
  onChange,
  sourceHeader,
  targetHeader,
}: PickListProps<T>) => {
  const [selectedSource, setSelectedSource] = useState<T[]>([])
  const [selectedTarget, setSelectedTarget] = useState<T[]>([])

  const moveSelectedToTarget = () => {
    const newSource = source.filter(item => !selectedSource.includes(item))
    const newTarget = [...target, ...selectedSource]
    onChange(newSource, newTarget)
    setSelectedSource([])
  }

  const moveSelectedToSource = () => {
    const newTarget = target.filter(item => !selectedTarget.includes(item))
    const newSource = [...source, ...selectedTarget]
    onChange(newSource, newTarget)
    setSelectedTarget([])
  }

  const moveAllToTarget = () => {
    const newTarget = [...target, ...source]
    onChange([], newTarget)
  }

  const moveAllToSource = () => {
    const newSource = [...source, ...target]
    onChange(newSource, [])
  }

  const moveUp = () => {
    const index = target.indexOf(selectedTarget[0])
    if (index > 0) {
      const newTarget = [...target]
      newTarget.splice(index, 1)
      newTarget.splice(index - 1, 0, selectedTarget[0])
      onChange(source, newTarget)
    }
  }

  const moveDown = () => {
    const index = target.indexOf(selectedTarget[0])
    if (index < target.length - 1) {
      const newTarget = [...target]
      newTarget.splice(index, 1)
      newTarget.splice(index + 1, 0, selectedTarget[0])
      onChange(source, newTarget)
    }
  }

  const renderItem = (item: T, index: number, list: 'source' | 'target') => (
    <List.Item
      key={`${item.label}-${index}`}
      title={item.label}
      onPress={() =>
        list === 'source'
          ? setSelectedSource([item])
          : setSelectedTarget([item])
      }
      titleStyle={
        list === 'source'
          ? selectedSource.includes(item)
            ? styles.selectedTitleStyle
            : styles.listItem
          : selectedTarget.includes(item)
            ? styles.selectedTitleStyle
            : styles.listItem
      }
      style={
        list === 'source'
          ? selectedSource.includes(item)
            ? styles.selectedItem
            : null
          : selectedTarget.includes(item)
            ? styles.selectedItem
            : null
      }
    />
  )

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <ScrollView style={styles.list}>
          <View>
            <Text style={styles.listHeader}>{sourceHeader}</Text>
          </View>
          {source.map((item, index) => renderItem(item, index, 'source'))}
        </ScrollView>
        <View style={styles.buttons}>
          <IconButton
            icon={() => (
              <FontAwesome name="angle-right" size={24} color="white" />
            )}
            onPress={moveSelectedToTarget}
            style={styles.iconButton}
          />
          <IconButton
            icon={() => (
              <FontAwesome name="angle-double-right" size={24} color="white" />
            )}
            onPress={moveAllToTarget}
            style={styles.iconButton}
          />
          <IconButton
            icon={() => (
              <FontAwesome name="angle-left" size={24} color="white" />
            )}
            onPress={moveSelectedToSource}
            style={styles.iconButton}
          />
          <IconButton
            icon={() => (
              <FontAwesome name="angle-double-left" size={24} color="white" />
            )}
            onPress={moveAllToSource}
            style={styles.iconButton}
          />
        </View>
        <ScrollView style={styles.list}>
          <View>
            <Text style={styles.listHeader}>{targetHeader}</Text>
          </View>
          {target.map((item, index) => renderItem(item, index, 'target'))}
        </ScrollView>
      </View>
      <View style={styles.moveButtons}>
        <IconButton
          icon={() => <FontAwesome name="angle-up" size={24} color="white" />}
          onPress={moveUp}
          style={styles.iconButton}
        />
        <IconButton
          icon={() => <FontAwesome name="angle-down" size={24} color="white" />}
          onPress={moveDown}
          style={styles.iconButton}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  list: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
  },
  listHeader: {
    backgroundColor: '#e0e0e0',
    color: '#000',
    padding: 10,
    paddingLeft: 14,
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  iconButton: {
    backgroundColor: '#1DB3B3',
    borderRadius: 8,
    width: 40,
    height: 40,
  },
  moveButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  listItem: {
    color: '#000',
  },
  selectedItem: {
    backgroundColor: '#1DB3B3',
  },
  selectedTitleStyle: {
    color: 'white',
  },
})
