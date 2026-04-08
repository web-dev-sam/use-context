<script setup lang="ts">
import { useCounterState } from '../composables/useCounter'
import Button from './ui/Button.vue'

const { title = '', initialCount = 0 } = defineProps<{ title?: string, initialCount?: number }>()

const { count, increment, decrement } = useCounterState(initialCount)
</script>

<template>
  <div
    class="rounded-xl p-6 min-w-52 flex flex-col gap-4 border outline outline-green-500 text-center"
    style="background: var(--code-bg); border-color: var(--border)"
  >
    <div>
      <p class="text-xs font-medium uppercase tracking-widest mb-1" style="color: var(--text)">
        {{ title ?? 'Counter' }}
      </p>
      <span
        class="text-5xl font-bold tabular-nums"
        style="color: var(--text-h)"
      >
        {{ count }}
      </span>
    </div>

    <div class="flex gap-2 justify-center">
      <Button @click="decrement()" class="rounded bg-green-700!">-</Button>
      <Button @click="increment()" class="rounded bg-green-700!">+</Button>
    </div>
  </div>
</template>
