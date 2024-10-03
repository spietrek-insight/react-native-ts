import type { Meta, StoryObj } from '@storybook/react'

import { WinkGlassesField } from './WinkGlassesField'

const meta = {
  title: 'Organisms/Visit/Fields/WinkGlassesField',
  component: WinkGlassesField,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof WinkGlassesField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'No Show',
  },
}
