import { SetStateAction, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { WinkPickList } from '@/components/molecules/WinkPickList'
import { Section } from '@/interfaces/section'

export const WinkManageSections = () => {
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
})
