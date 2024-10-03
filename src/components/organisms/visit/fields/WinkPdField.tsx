import { RowConfig, WinkTableEditor } from './WinkTableEditor'

export const WinkPdField = (): JSX.Element => {
  const columnHeadings = ['OD', 'OS', 'OU']
  const rowHeadings: RowConfig[] = [
    {
      name: 'IOP Reading 1',
      columns: [
        { name: 'OD', hasInput: true },
        { name: 'OS', hasInput: true },
        { name: 'OU', hasInput: true },
      ],
      copyable: false,
    },
    {
      name: 'IOP Reading 2',
      columns: [
        { name: 'OD', hasInput: true },
        { name: 'OS', hasInput: true },
        { name: 'OU', hasInput: true },
      ],
      copyable: false,
    },
    {
      name: 'IOP Reading 3',
      columns: [
        { name: 'OD', hasInput: true },
        { name: 'OS', hasInput: true },
        { name: 'OU', hasInput: true },
      ],
      copyable: false,
    },
    {
      name: 'Avg IOP',
      columns: [
        { name: 'OD', hasInput: true },
        { name: 'OS', hasInput: true },
        { name: 'OU', hasInput: true },
      ],
      copyable: false,
    },
    {
      name: 'Pachymetry',
      columns: [
        { name: 'OD', hasInput: true },
        { name: 'OS', hasInput: true },
        { name: 'OU', hasInput: true },
      ],
      copyable: false,
    },
    {
      name: 'Correction ∆',
      columns: [
        { name: 'OD', hasInput: true },
        { name: 'OS', hasInput: true },
        { name: 'OU', hasInput: true },
      ],
      copyable: false,
    },
    {
      name: 'ADJ IOP',
      columns: [
        { name: 'OD', hasInput: true },
        { name: 'OS', hasInput: true },
        { name: 'OU', hasInput: true },
      ],
      copyable: false,
    },
  ]
  const copyableColumns = [true, true]

  return (
    <div className="mt-2" data-testid="PdField">
      <WinkTableEditor
        columnHeadings={columnHeadings}
        rowHeadings={rowHeadings}
        tabOrder="columns"
        copyableColumns={copyableColumns}
      />
    </div>
  )
}
