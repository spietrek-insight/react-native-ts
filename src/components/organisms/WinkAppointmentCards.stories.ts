import { WinkAppointmentCards } from './WinkAppointmentCards'

export default {
  title: 'WinkAppointmentCards',
  component: WinkAppointmentCards,
  argTypes: {
    onPress: { action: 'onPress' },
  },
}

export const Base = {
  args: { appointments: [] },
}
