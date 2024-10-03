import { RowConfig, WinkTableEditor } from './WinkTableEditor'

export const WinkGlassesField = (): JSX.Element => {
  const columnHeadings = ['Sph', 'Cyl', 'Axis', 'DVA', 'Add', 'NVA']
  const rowHeadings: RowConfig[] = [
    {
      name: 'OD',
      columns: [
        { name: 'Sph', hasInput: true },
        { name: 'Cyl', hasInput: true },
        { name: 'Axis', hasInput: true },
        { name: 'DVA', hasInput: true },
        { name: 'Add', hasInput: true },
        { name: 'NVA', hasInput: true },
      ],
      copyable: true,
    },
    {
      name: 'OS',
      columns: [
        { name: 'Sph', hasInput: true },
        { name: 'Cyl', hasInput: true },
        { name: 'Axis', hasInput: true },
        { name: 'DVA', hasInput: true },
        { name: 'Add', hasInput: true },
        { name: 'NVA', hasInput: true },
      ],
      copyable: true,
    },
    {
      name: 'OU',
      columns: [
        { name: 'Sph', hasInput: false },
        { name: 'Cyl', hasInput: false },
        { name: 'Axis', hasInput: false },
        { name: 'DVA', hasInput: true },
        { name: 'Add', hasInput: false },
        { name: 'NVA', hasInput: true },
      ],
      copyable: false,
    },
  ]
  const copyableRows = [true, true, false]

  return (
    <div className="mt-2" data-testid="GlassesField">
      <WinkTableEditor
        columnHeadings={columnHeadings}
        rowHeadings={rowHeadings}
        tabOrder="rows"
        copyableRows={copyableRows}
      />
    </div>
  )
}
