// Hook: useTileNavigation.ts
import { useEffect, useState } from 'react'

import { ExamDef } from '@/interfaces/examDef'
import { Tile } from '@/interfaces/visit'

interface FilteredTile extends Tile {
  sectionName: string
}

interface UseTileNavigationProps {
  activeTileId: string | null
  examDefs: ExamDef[]
}

interface TileNavigation {
  validExamDefs: ExamDef[]
  currentExamDefIndex: number
  currentTileIndex: number
  navigateTile: (direction: number) => void
  searchTileInExamDefs: (event: { query: string }) => void
  onTileSelect: (e: { value: { id: string } }) => void
  filteredTiles: FilteredTile[]
  searchTile: string
  setSearchTile: React.Dispatch<React.SetStateAction<string>>
  totalTiles: number
  globalTileIndex: number
}

export const useTileNavigation = ({
  activeTileId,
  examDefs,
}: UseTileNavigationProps): TileNavigation => {
  const [validExamDefs, setValidExamDefs] = useState<ExamDef[]>([])
  const [currentExamDefIndex, setCurrentExamDefIndex] = useState(0)
  const [currentTileIndex, setCurrentTileIndex] = useState(0)
  const [filteredTiles, setFilteredTiles] = useState<FilteredTile[]>([])
  const [searchTile, setSearchTile] = useState('')

  useEffect(() => {
    setValidExamDefs(examDefs.filter(examDef => examDef.tiles.length > 0))
  }, [examDefs])

  useEffect(() => {
    if (activeTileId) {
      const examDefIndex = validExamDefs.findIndex(examDef =>
        examDef.tiles.some(tile => tile.id === activeTileId),
      )
      if (examDefIndex !== -1) {
        const tileIndex = validExamDefs[examDefIndex].tiles.findIndex(
          tile => tile.id === activeTileId,
        )
        setCurrentExamDefIndex(examDefIndex)
        setCurrentTileIndex(tileIndex)
      }
    }
  }, [activeTileId, validExamDefs])

  const navigateTile = (direction: number) => {
    let newTileIndex = currentTileIndex + direction
    let newExamDefIndex = currentExamDefIndex

    if (newTileIndex < 0) {
      newExamDefIndex = currentExamDefIndex - 1
      if (newExamDefIndex < 0) {
        newExamDefIndex = validExamDefs.length - 1
        newTileIndex = validExamDefs[newExamDefIndex].tiles.length - 1
      } else {
        newTileIndex = validExamDefs[newExamDefIndex].tiles.length - 1
      }
    } else if (newTileIndex >= validExamDefs[newExamDefIndex].tiles.length) {
      newExamDefIndex = currentExamDefIndex + 1
      if (newExamDefIndex >= validExamDefs.length) {
        newExamDefIndex = 0
        newTileIndex = 0
      } else {
        newTileIndex = 0
      }
    }

    setCurrentExamDefIndex(newExamDefIndex)
    setCurrentTileIndex(newTileIndex)
    setFilteredTiles([])
    setSearchTile('')
  }

  const searchTileInExamDefs = (event: { query: string }) => {
    const _filteredTiles: FilteredTile[] = []
    validExamDefs.forEach(examDef => {
      examDef.tiles.forEach(tile => {
        if (tile.name.toLowerCase().includes(event.query.toLowerCase())) {
          _filteredTiles.push({ ...tile, examDefName: examDef.section })
        }
      })
    })
    setFilteredTiles(
      _filteredTiles.sort((a, b) => a.name.localeCompare(b.name)),
    )
  }

  const onTileSelect = (e: { value: { id: string } }) => {
    const { id } = e.value
    const examDefIndex = validExamDefs.findIndex(examDef =>
      examDef.tiles.some(tile => tile.id === id),
    )
    if (examDefIndex !== -1) {
      const tileIndex = validExamDefs[examDefIndex].tiles.findIndex(
        tile => tile.id === id,
      )
      setCurrentExamDefIndex(examDefIndex)
      setCurrentTileIndex(tileIndex)
    }
  }

  const totalTiles = validExamDefs.reduce(
    (acc, examDef) => acc + examDef.tiles.length,
    0,
  )
  const globalTileIndex =
    validExamDefs
      .slice(0, currentExamDefIndex)
      .reduce((acc, examDef) => acc + examDef.tiles.length, 0) +
    currentTileIndex +
    1

  return {
    validExamDefs,
    currentExamDefIndex,
    currentTileIndex,
    navigateTile,
    searchTileInExamDefs,
    onTileSelect,
    filteredTiles,
    searchTile,
    setSearchTile,
    totalTiles,
    globalTileIndex,
  }
}
