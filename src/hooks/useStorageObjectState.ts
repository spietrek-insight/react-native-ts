import { useCallback, useEffect, useReducer } from 'react'
import { Platform } from 'react-native'

import { deleteItemAsync, setItemAsync, getItemAsync } from 'expo-secure-store'

type UseStateHook<T> = [T | null, (value: T | null) => void]

const useAsyncState = <T>(initialValue: T | null = null): UseStateHook<T> => {
  return useReducer(
    (_state: T | null, action: T | null = null): T | null => action,
    initialValue,
  ) as UseStateHook<T>
}

export const setStorageItemAsync = async <T>(key: string, value: T | null) => {
  const stringValue = value === null ? null : JSON.stringify(value)
  if (Platform.OS === 'web') {
    setWebStorageItem(key, stringValue)
  } else {
    await setNativeStorageItem(key, stringValue)
  }
}

const setWebStorageItem = (key: string, value: string | null) => {
  if (value === null) {
    localStorage.removeItem(key)
  } else {
    localStorage.setItem(key, value)
  }
}

const setNativeStorageItem = async (key: string, value: string | null) => {
  if (value === null) {
    await deleteItemAsync(key)
  } else {
    await setItemAsync(key, value)
  }
}

export const useStorageObjectState = <T>(key: string): UseStateHook<T> => {
  const [state, setState] = useAsyncState<T>()

  useEffect(() => {
    const fetchData = async () => {
      const value =
        Platform.OS === 'web'
          ? localStorage.getItem(key)
          : await getItemAsync(key)
      try {
        setState(value ? JSON.parse(value) : null)
      } catch (e) {
        console.error('Error parsing storage item:', e)
      }
    }
    void fetchData()
  }, [key, setState])

  const setValue = useCallback(
    async (value: T | null) => {
      setState(value)
      await setStorageItemAsync(key, value)
    },

    [key, setState],
  )

  return [state, setValue]
}
