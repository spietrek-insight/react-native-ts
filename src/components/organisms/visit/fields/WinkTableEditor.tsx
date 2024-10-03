import React, { useRef, useState, useCallback } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { WinkCopyButton } from '@/components/atoms/WinkCopyButton'

type GridData = string[][]

type ColumnConfig = {
  name: string
  hasInput: boolean
}

export type RowConfig = {
  name: string
  columns: ColumnConfig[]
  copyable: boolean
}

interface TableProps {
  rowHeadings: RowConfig[]
  columnHeadings: string[]
  tabOrder: 'rows' | 'columns'
  copyableRows?: boolean[]
  copyableColumns?: boolean[]
}

const useGridData = (rowCount: number, columnCount: number) => {
  const [gridData, setGridData] = useState<GridData>(
    Array.from({ length: rowCount }, () => Array(columnCount).fill('')),
  )

  const updateGridData = useCallback(
    (rowIndex: number, colIndex: number, value: string) => {
      setGridData(prevData =>
        prevData.map((row, rIndex) =>
          rIndex === rowIndex
            ? row.map((cell, cIndex) => (cIndex === colIndex ? value : cell))
            : row,
        ),
      )
    },
    [],
  )

  const copyRow = useCallback(
    (rowIndex: number) => {
      if (rowIndex < gridData.length - 1) {
        setGridData(prevData => {
          const newData = [...prevData]
          newData[rowIndex + 1] = [...prevData[rowIndex]]
          return newData
        })
      }
    },
    [gridData],
  )

  const copyColumn = useCallback(
    (colIndex: number) => {
      if (colIndex < gridData[0].length - 1) {
        setGridData(prevData =>
          prevData.map(row => {
            const newRow = [...row]
            newRow[colIndex + 1] = row[colIndex]
            return newRow
          }),
        )
      }
    },
    [gridData],
  )

  return { gridData, updateGridData, copyRow, copyColumn }
}

const useInputRefs = (rowCount: number, columnCount: number) => {
  return useRef<(TextInput | null)[][]>(
    Array.from({ length: rowCount }, () => Array(columnCount).fill(null)),
  )
}

const InputCell: React.FC<{
  value: string
  onChange: (value: string) => void
  onSubmitEditing: () => void
  inputRef: React.Ref<TextInput>
  style: object
}> = React.memo(({ value, onChange, onSubmitEditing, inputRef, style }) => (
  <TextInput
    ref={inputRef}
    style={style}
    value={value}
    onChangeText={onChange}
    onSubmitEditing={onSubmitEditing}
  />
))

export const WinkTableEditor: React.FC<TableProps> = ({
  rowHeadings,
  columnHeadings,
  tabOrder,
  copyableRows = [],
  copyableColumns = [],
}) => {
  const { gridData, updateGridData, copyRow, copyColumn } = useGridData(
    rowHeadings.length,
    columnHeadings.length,
  )
  const inputRefs = useInputRefs(rowHeadings.length, columnHeadings.length)

  const focusNextInput = useCallback(
    (startRowIndex: number, startColIndex: number): void => {
      for (
        let rowIndex = startRowIndex;
        rowIndex < rowHeadings.length;
        rowIndex++
      ) {
        for (
          let colIndex = rowIndex === startRowIndex ? startColIndex : 0;
          colIndex < columnHeadings.length;
          colIndex++
        ) {
          const nextInput = inputRefs.current[rowIndex][colIndex]
          if (nextInput) {
            nextInput.focus()
            return
          }
        }
      }
    },
    [rowHeadings.length, columnHeadings.length],
  )

  const handleInputChange = useCallback(
    (rowIndex: number, colIndex: number, value: string): void => {
      updateGridData(rowIndex, colIndex, value)
    },
    [updateGridData],
  )

  const handleCopyRow = useCallback(
    (rowIndex: number): void => {
      copyRow(rowIndex)
      setTimeout(() => focusNextInput(rowIndex + 1, 0), 0)
    },
    [copyRow, focusNextInput],
  )

  const handleCopyColumn = useCallback(
    (colIndex: number): void => {
      copyColumn(colIndex)
      setTimeout(() => focusNextInput(0, colIndex + 1), 0)
    },
    [copyColumn, focusNextInput],
  )

  const isValidInput = useCallback(
    (colName: string, columns: ColumnConfig[]): boolean => {
      return columns.some(col => col.name === colName && col.hasInput)
    },
    [],
  )

  const renderColumnLayout = useCallback(() => {
    return (
      <ScrollView horizontal={true}>
        <View style={columnStyles.container}>
          <View style={columnStyles.column}>
            <View style={columnStyles.headerCell} />
            {rowHeadings.map((heading, index) => (
              <View key={index} style={columnStyles.rowHeadingCell}>
                <Text style={columnStyles.rowHeadingText}>{heading.name}:</Text>
              </View>
            ))}
          </View>

          {columnHeadings.map((colHeading, colIndex) => (
            <View
              key={colIndex}
              style={[
                columnStyles.column,
                colIndex > 0 && columnStyles.columnWithSpacing,
              ]}
            >
              <View style={columnStyles.headerCell}>
                <Text style={columnStyles.columnHeadingText}>{colHeading}</Text>
              </View>
              {rowHeadings.map((_, rowIndex) => (
                <View key={rowIndex} style={columnStyles.inputCell}>
                  <InputCell
                    value={gridData[rowIndex][colIndex]}
                    onChange={value =>
                      handleInputChange(rowIndex, colIndex, value)
                    }
                    onSubmitEditing={() => {
                      if (rowIndex === rowHeadings.length - 1) {
                        if (copyableColumns[colIndex]) {
                          // Focus copy button
                          // This would require adding a ref for the copy button
                        } else if (colIndex < columnHeadings.length - 1) {
                          // Focus first input of next column
                          inputRefs.current[0][colIndex + 1]?.focus()
                        }
                      } else {
                        // Focus next input in same column
                        inputRefs.current[rowIndex + 1][colIndex]?.focus()
                      }
                    }}
                    inputRef={(el: TextInput | null) =>
                      (inputRefs.current[rowIndex][colIndex] = el)
                    }
                    style={columnStyles.input}
                  />
                </View>
              ))}
              {colIndex < columnHeadings.length - 1 &&
                copyableColumns[colIndex] && (
                  <View style={columnStyles.copyButtonCell}>
                    <WinkCopyButton
                      onPress={() => handleCopyColumn(colIndex)}
                      icon="doubleright"
                      style={columnStyles.copyButton}
                    />
                  </View>
                )}
            </View>
          ))}
        </View>
      </ScrollView>
    )
  }, [
    rowHeadings,
    columnHeadings,
    gridData,
    handleInputChange,
    handleCopyColumn,
    copyableColumns,
  ])

  const renderRowLayout = useCallback(() => {
    return (
      <ScrollView>
        <View style={rowStyles.container}>
          <View style={rowStyles.headerRow}>
            <Text style={rowStyles.emptyHeader}></Text>
            {columnHeadings.map((heading, index) => (
              <Text key={index} style={rowStyles.columnHeader}>
                {heading}
              </Text>
            ))}
            <View style={rowStyles.copyButtonSpace} />
          </View>

          {rowHeadings.map((rowHeading, rowIndex) => (
            <View key={rowIndex} style={rowStyles.dataRow}>
              <Text style={rowStyles.rowHeader}>{rowHeading.name}:</Text>
              {columnHeadings.map((col, colIndex) => (
                <View key={colIndex} style={rowStyles.inputContainer}>
                  {isValidInput(col, rowHeading.columns) ? (
                    <InputCell
                      value={gridData[rowIndex][colIndex]}
                      onChange={value =>
                        handleInputChange(rowIndex, colIndex, value)
                      }
                      onSubmitEditing={() => {}}
                      inputRef={(el: TextInput | null) =>
                        (inputRefs.current[rowIndex][colIndex] = el)
                      }
                      style={rowStyles.input}
                    />
                  ) : (
                    <View style={rowStyles.emptySpace} />
                  )}
                </View>
              ))}
              {rowIndex < rowHeadings.length - 1 && copyableRows[rowIndex] && (
                <View style={rowStyles.copyButtonSpace}>
                  <WinkCopyButton
                    onPress={() => handleCopyRow(rowIndex)}
                    icon="arrowdown"
                    style={rowStyles.copyButton}
                  />
                </View>
              )}
              {rowIndex === rowHeadings.length - 1 && (
                <View style={rowStyles.copyButtonSpace} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    )
  }, [
    rowHeadings,
    columnHeadings,
    gridData,
    handleInputChange,
    handleCopyRow,
    copyableRows,
    isValidInput,
  ])

  return (
    <View style={styles.container}>
      {tabOrder === 'columns' ? renderColumnLayout() : renderRowLayout()}
    </View>
  )
}

const columnStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#F0F0F0',
  },
  column: {
    flexDirection: 'column',
  },
  columnWithSpacing: {
    marginLeft: 4, // Add spacing between columns
  },
  headerCell: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4, // Add spacing below header
  },
  rowHeadingCell: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 5,
    marginBottom: 4, // Add spacing between rows
  },
  inputCell: {
    height: 36,
    justifyContent: 'center',
    marginBottom: 4, // Add spacing between rows
  },
  input: {
    height: 36,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 100,
    backgroundColor: '#fff',
  },
  rowHeadingText: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'right',
  },
  columnHeadingText: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  copyButtonCell: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 5,
    marginBottom: 4, // Add spacing below copy button
  },
  copyButton: {
    position: 'absolute',
    right: -15,
    backgroundColor: '#1DB3B3',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const rowStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#F0F0F0',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  emptyHeader: {
    // width: 100,
  },
  columnHeader: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rowHeader: {
    // width: 100,
    textAlign: 'right',
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 14,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 2,
    // width: 100,
  },
  input: {
    height: 36,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    width: 100,
  },
  emptySpace: {
    height: 36,
  },
  copyButtonSpace: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  copyButton: {
    backgroundColor: '#1DB3B3',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

// Keep a minimal shared styles object for the main container
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
