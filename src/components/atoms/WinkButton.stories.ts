import { WinkButton } from './WinkButton'

export default {
  title: 'WinkButton',
  component: WinkButton,
  argTypes: {
    onPress: { action: 'onPress' },
  },
}

export const Base = {
  args: { title: 'Hello World' },
}
