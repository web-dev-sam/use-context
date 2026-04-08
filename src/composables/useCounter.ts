import { readonly, ref } from 'vue'
import { useContext } from './useContext'

export function useCounterState(initialCount = 0) {
  const count = ref(initialCount)
  return {
    count: readonly(count),
    increment: () => count.value++,
    decrement: () => count.value--,
  }
}

export const { useCounter, CounterProvider } = useContext('Counter', useCounterState)
