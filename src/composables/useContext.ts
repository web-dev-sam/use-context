import { defineComponent, inject, provide, type InjectionKey, type PropType, type SlotsType } from 'vue'

type UseContextReturn<TArgs extends any[], TReturn, K extends string> =
  Record<`use${K}`, () => TReturn> &
  Record<`${K}Provider`, {
    new (): {
      $props: { args?: TArgs }
      $slots: { default(props: TReturn): any }
    }
  }>

export function useContext<
  TArgs extends any[],
  TReturn,
  const K extends string,
>(
  contextKey: K,
  composable: (...args: TArgs) => TReturn,
): UseContextReturn<TArgs, TReturn, K> {
  const key = Symbol() as InjectionKey<TReturn>

  function useConsumer(): TReturn {
    const state = inject(key)
    if (state === undefined) throw new Error(`[useContext] No provider found for "${contextKey}"`)
    return state
  }

  const Provider = defineComponent({
    props: {
      args: {
        type: Array as unknown as PropType<TArgs>,
        default: () => [],
      },
    },
    slots: Object as SlotsType<{ default: (props: TReturn) => any }>,
    setup(props, { slots }) {
      const state = composable(...(props.args as TArgs))
      provide(key, state)
      return () => slots.default?.(state)
    },
  })

  return {
    [`use${contextKey}`]: useConsumer,
    [`${contextKey}Provider`]: Provider,
  } as UseContextReturn<TArgs, TReturn, K>
}
