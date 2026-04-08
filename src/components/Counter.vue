<script setup lang="ts">
import { useCounter } from '../composables/useCounter'
import CounterButtons from './CounterButtons.vue'

const { title = '', color } = defineProps<{ title?: string, color: 'orange' | 'purple' }>()

const { count } = useCounter()
</script>

<template>
  <div
    class="rounded-xl p-6 min-w-52 flex flex-col gap-4 border justify-center items-center text-center"
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

    <CounterButtons :color />
  </div>
</template>
