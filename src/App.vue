<script setup lang="ts">
import { CounterProvider } from './composables/useCounter'
import Header from './Header.vue'
import Counter from './components/Counter.vue'
import CounterLocal from './components/CounterLocal.vue'

</script>

<template>
  <div class="min-h-screen flex flex-col gap-12 rounded-3xl border-4 border-purple-500" style="background: var(--bg)">
    <CounterProvider :args="[0]">
        <Header />
        <main class="mt-20 sm:mt-32 px-6 max-w-3xl mx-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Shares state with Header via createCounterContext() above -->

            <div class="p-4 rounded-xl outline outline-transparent text-center border border-dashed border-gray-600">
              <Counter title="Application-wide" color="purple" />
            </div>

            <!-- Isolated subtree — own state, no script setup needed -->
            <CounterProvider :args="[67]" v-slot="{ count }">
              <div class="p-4 rounded-xl outline outline-orange-500 text-center">
                <Counter title="Context-wide" color="orange" class="mb-3" />
                <span class="text-sm"><span class="uppercase">In</span> &lt;CounterProvider&gt;</span> {{ count }}
              </div>
            </CounterProvider>
          </div>
        </main>
    </CounterProvider>
    <section class="px-6 max-w-3xl mx-auto flex flex-col gap-6">
      <CounterLocal title="Component-wide" :initialCount="42" />
    </section>
    <footer>
      <details class="rounded-xl border p-5 text-sm max-w-[80ch] mx-4 mb-16 sm:mx-auto" style="background: var(--code-bg); border-color: var(--border); color: var(--text)">
        <summary class="cursor-pointer font-semibold tracking-wide uppercase text-xs select-none" style="color: var(--text-h)">
          <span class="ml-1.5">How it works</span>
        </summary>
        <div class="mt-3 flex flex-col gap-2 leading-relaxed">
          <p>
            All three counters above are rendered directly in <code>App.vue</code> with zero state definitions in that component —
            no <code>ref</code>, no <code>emit</code>.
            All state comes from a single composable, <code>useCounterState</code>, wired up via <code>useContext()</code>.
          </p>
          <div class="flex flex-col gap-3 mt-1">
            <div class="flex flex-col sm:flex-row sm:gap-3">
              <span class="font-semibold sm:w-36 sm:shrink-0" style="color: var(--text-h)">Application-wide</span>
              <span>Shares state with the header counter via the top-level <code>&lt;CounterProvider&gt;</code>. Any component in the tree can call <code>useCounter()</code> to read or mutate the same value.</span>
            </div>
            <div class="flex flex-col sm:flex-row sm:gap-3">
              <span class="font-semibold sm:w-36 sm:shrink-0" style="color: var(--text-h)">Context-wide</span>
              <span>A nested <code>&lt;CounterProvider&gt;</code> creates an isolated subtree with its own state. Components inside inject from the nearest provider.</span>
            </div>
            <div class="flex flex-col sm:flex-row sm:gap-3">
              <span class="font-semibold sm:w-36 sm:shrink-0" style="color: var(--text-h)">Component-wide</span>
              <span>No provider at all. The component calls <code>useCounterState()</code> directly and owns its own local state — the traditional composable pattern.</span>
            </div>
          </div>
        </div>
      </details>
    </footer>
  </div>
</template>

<style scoped>
code {
  font-family: monospace;
  font-size: 0.85em;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0.25em 0.5em;
}
</style>
