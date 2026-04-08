<script setup lang="ts">
import { useCounter } from '../composables/useCounter'
import Button from './ui/Button.vue'

defineProps<{
  color: string
}>()

const { decrement, increment } = useCounter()
</script>

<template>
  <div class="flex gap-2 border border-dashed border-gray-600 px-2 py-1.5 rounded">
    <Button @click="decrement();" class="rounded" :class="{
      orange: 'bg-orange-600 hover:bg-orange-600',
      purple: 'bg-purple-500 hover:bg-purple-500',
    }[color]">-</Button>
    <Button @click="increment();" class="rounded" :class="{
      orange: 'bg-orange-600 hover:bg-orange-600',
      purple: 'bg-purple-500 hover:bg-purple-500',
    }[color]">+</Button>
  </div>
</template>
