import { SetStateAction, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

import { WinkPickList } from '@/components/molecules/WinkPickList'
import { Section } from '@/interfaces/section'

type List = {
  label: string
  value: string
}

export const WinkManageExamTiles = () => {
  const [sections, setSections] = useState<List[]>([])
  const [selectedSection, setSelectedSection] = useState<List | null>(null)
  const [source, setSource] = useState<Section[]>([])
  const [target, setTarget] = useState<Section[]>([])
  const [allowUpdates, setAllowUpdates] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const items = await fetch('/data/sections.json').then(response =>
        response.json(),
      )
      const sortedItems = items.sort(
        (a: Section, b: Section) => a.order - b.order,
      )
      setSections(
        sortedItems
          .filter((item: Section) => item.active)
          .map((item: Section) => ({ label: item.label, value: item.id })),
      )

      setSource(sortedItems.filter((item: Section) => !item.active))
      setTarget(sortedItems.filter((item: Section) => item.active))
      setAllowUpdates(true)
    }

    void fetchData()
  }, [])

  useEffect(() => {
    if (!allowUpdates) return

    const updateData = async () => {
      // combine source and target and call SectionService.updateSections
      const updatedTarget = target.map((item, index) => {
        item.order = index
        item.active = true
        return item
      })

      const updatedSource = source.map((item, index) => {
        item.order = index
        item.active = false
        return item
      })
      const sections = [...updatedSource, ...updatedTarget]
      console.log(sections)
      // await SectionService.updateSections(sections)
    }

    void updateData()
  }, [allowUpdates, source, target])

  const onChange = (
    source: SetStateAction<Section[]>,
    target: SetStateAction<Section[]>,
  ) => {
    setSource(source)
    setTarget(target)
  }

  return (
    <View style={styles.container}>
      <Dropdown
        data={sections}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select section"
        value={selectedSection?.value}
        onChange={item => {
          setSelectedSection(item)
        }}
        style={styles.dropdown}
      />

      <WinkPickList
        source={source}
        target={target}
        onChange={onChange}
        sourceHeader="Available"
        targetHeader="Selected"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  dropdown: {
    width: 260,
  },
})
