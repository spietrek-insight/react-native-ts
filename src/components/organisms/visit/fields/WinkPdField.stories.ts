import type { Meta, StoryObj } from '@storybook/react'

import { WinkPdField } from './WinkPdField'

const meta = {
  title: 'Organisms/Visit/Fields/WinkPdField',
  component: WinkPdField,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof WinkPdField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'No Show',
  },
}
