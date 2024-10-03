/* eslint-disable react/function-component-definition */
import { useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'

export default function TestComponent() {
  const [name, setUser] = useState('')
  const [show, setShow] = useState(false)

  return (
    <View>
      <TextInput value={name} onChangeText={setUser} testID="input" />
      <Button
        title="Print Username"
        onPress={() => {
          // let's pretend this is making a server request, so it's async
          // (you'd want to mock this imaginary request in your unit tests)...
          setTimeout(
            () => {
              setShow(true)
            },
            Math.floor(Math.random() * 200),
          )
        }}
      />
      {show && <Text testID="printed-username">{name}</Text>}
    </View>
  )
}
