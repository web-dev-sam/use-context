<script setup lang="ts">
import { useCounter } from './composables/useCounter'

const { count } = useCounter()
</script>

<template>
  <header
    class="top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 border-b"
    style="border-bottom: 1px solid var(--border)"
  >
    <nav class="flex items-center gap-6">
      <span class="font-semibold text-sm tracking-wide">vue-use-context</span>
    </nav>

    <div class="flex items-center gap-2">
      <a href="https://github.com/web-dev-sam/use-context" class="mr-4 text-sm hover:underline" target="_blank">GitHub</a>
      <span
        class="min-w-10 h-10 flex items-center justify-center rounded-full px-2 text-md font-semibold tabular-nums"
        style="background: var(--accent-bg); color: var(--accent); border: 1px solid var(--accent-border)"
      >
        {{ count }}
      </span>
    </div>
  </header>
</template>
