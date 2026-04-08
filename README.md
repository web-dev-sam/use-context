# vue-use-context

A demo exploring a `useContext` utility for Vue 3 that lets a composable's state exist at any scope — not just application-wide or per-call.

## The problem

A Vue composable's state has two natural lifetimes:

- **Application-wide** — state is created outside any function, as a module-level singleton. Every component that imports the composable shares the same instance.
- **Call-wide** — state is created inside the composable function itself. Each call to the composable creates its own independent instance.

Neither is right when you want state shared across a subtree — for example, a header and a card that are siblings, or a deeply nested component and its distant ancestor, but *not* the rest of the app. That's the gap this explores.

## The idea

`useContext` wraps any composable with `provide`/`inject` to produce a third option: **context-wide** state, scoped to whichever subtree you choose.

```ts
export function useContext(contextKey, composable) {
  // Returns { use<Key>: () => TReturn, <Key>Provider: Component }
}
```

Given a name and a composable, it returns:

- A **Provider component** (`<CounterProvider>`) that runs the composable, calls `provide()` with its return value, and renders its slot.
- A **consumer composable** (`useCounter()`) that calls `inject()` and throws a clear error if no provider is found above it in the tree.

Both are fully typed — the consumer hook's return type matches the composable's return type, and the Provider's `:args` prop is typed to match the composable's parameters.

## Usage

```ts
// Define a composable as normal
function useCounterState(initialCount = 0) {
  const count = ref(initialCount)
  return {
    count: readonly(count),
    increment: () => count.value++,
    decrement: () => count.value--
  }
}

// Wrap it once with useContext
export const { useCounter, CounterProvider } = useContext('Counter', useCounterState)
```

```vue
<!-- Wrap a subtree with the Provider -->
<CounterProvider :args="[0]">
  <Header />       <!-- calls useCounter() — gets shared state -->
  <Counter />      <!-- calls useCounter() — same shared state -->
</CounterProvider>
```

## What the demo shows

The app renders two counters and a header:

- **Global Counter + Header** — both sit inside the root `<CounterProvider :args="[0]">`. `Header` displays the count in the navbar; `Counter` displays and controls it. They share a single reactive state instance with no props or emits between them.

- **Special Counter** — wrapped in its own nested `<CounterProvider :args="[67]">`. It gets a completely isolated state starting at 67, independent of the global one.

The same composable, three different scopes — application-wide is just a Provider at the root; call-wide is no Provider at all; anything in between is a Provider wherever you need it.

## Key properties

| | |
|---|---|
| **Any scope** | Place the Provider at any level — app root, route, modal, widget |
| **Isolation by nesting** | Inner providers shadow outer ones — each subtree gets its own state |
| **Type-safe** | Consumer hook return type and Provider `:args` prop are inferred from the composable |
| **Throws on missing provider** | `useCounter()` outside a provider gives a clear error, not a silent `undefined` |

## Running

```sh
pnpm install
pnpm dev
```
