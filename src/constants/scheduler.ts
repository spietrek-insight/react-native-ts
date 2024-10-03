export const BASE_STYLE: React.CSSProperties = {
  backgroundColor: 'lightgrey',
  color: 'black',
  borderRadius: '4px',
  border: '1px solid white',
}

export const RESOURCE_STYLES: Record<number, React.CSSProperties> = {
  1: { backgroundColor: '#ccddff' },
  2: { backgroundColor: '#99ff99' },
  3: { backgroundColor: '#ffe6e6' },
}

export const TYPE_STYLES: Record<string, React.CSSProperties> = {
  available: {
    color: 'black',
    backgroundColor: '#f1f2f2',
    border: '1px solid black',
  },
  unavailable: {
    color: 'white',
    backgroundColor: '#909090',
  },
}

export const OUTSIDE_WORKING_HOURS_STYLE: React.CSSProperties = {
  backgroundColor: '#f2f2f2',
  color: 'black',
  borderRadius: '0px',
  border: 'none',
}

export const DEFAULT_STYLE: React.CSSProperties = {}
