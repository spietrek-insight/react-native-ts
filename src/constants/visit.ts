import { TileStatus, TileStatusColor } from '@/interfaces/visit'

export const TILE_STATUS_COLOR_MAP: Record<TileStatus, TileStatusColor> = {
  unviewed: 'border-yellow5',
  defaultSet: 'border-red4',
  modified: 'border-green5',
}
