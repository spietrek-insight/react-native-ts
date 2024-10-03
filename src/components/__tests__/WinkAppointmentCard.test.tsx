import { Appointment } from '@/interfaces/appointment'
import { fireEvent, render } from '@testing-library/react-native'

import { WinkAppointmentCard } from '../organisms/WinkAppointmentCard'

const mockAppointment: Appointment = {
  id: '1',
  date: new Date(),
  visitType: 'Check-up',
  statusCode: 'Scheduled',
  statusCodeIcon: 'calendar',
  doctorName: 'Dr. Smith',
  invoiced: false,
  lastNoShow: false,
  existingPatient: false,
  newPatient: true,
  leftWithRx: false,
  family: false,
  fullName: 'John Doe',
  gender: 'Male',
  dateOfBirth: new Date(),
  confirmed: true,
  doctorId: 1,
  duration: 30,
  end: new Date(),
  type: 'available',
  patientId: '1',
  start: new Date(),
  waiting: false,
}

// Mock React Native modules
describe('AppointmentCard', () => {
  it('should render the appointment details correctly', () => {
    const { getByTestId, getByText } = render(
      <WinkAppointmentCard appointment={mockAppointment} />,
    )

    // Check if the component is rendered
    const appointmentCard = getByTestId('AppointmentCard')
    expect(appointmentCard).toBeDefined()

    // Check if the appointment details are displayed correctly
    expect(
      getByText(
        mockAppointment.date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
        }),
      ),
    ).toBeDefined()
    expect(getByText(mockAppointment.visitType)).toBeDefined()
    expect(
      getByText(
        `${mockAppointment.fullName} (${mockAppointment.gender}) ${mockAppointment.dateOfBirth.toLocaleDateString()}`,
      ),
    ).toBeDefined()
    expect(getByText(mockAppointment.doctorName)).toBeDefined()
  })

  it('should call the onPress callback when the component is pressed', () => {
    const onPressMock = jest.fn()
    const { getByTestId } = render(
      <WinkAppointmentCard
        appointment={mockAppointment}
        onPress={onPressMock}
      />,
    )

    const appointmentCard = getByTestId('AppointmentCard')
    fireEvent.press(appointmentCard)

    expect(onPressMock).toHaveBeenCalledWith(mockAppointment.id)
  })
})
