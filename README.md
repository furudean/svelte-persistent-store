<img src="iky.png"
  height="76"
  width="62"
  align="right"
  alt="A girl" />

# [svelte-persistent-store](https://www.npmjs.com/package/@furudean/svelte-persistent-store)

Svelte [store](https://svelte.dev/docs#run-time-svelte-store) that saves and
loads data from `localStorage` or `sessionStorage`. Works with Svelte Kit out
of the box.

If `Storage` is updated the store will sync to reflect the new state.

By default only JSON serializable values are handled, but [custom serialization
and deserialization functions can be provided](#custom-serialization-functions).

## Install

```bash
npm install @furudean/svelte-persistent-store
```

## Use

```js
import { persistent } from "@furudean/svelte-persistent-store"

const preferences = persistent({
	start_value: {
		foo: "bar"
	},
	key: "preferences", // key to save as in Storage
	storage_type: "localStorage" // Storage object to use
})
```

## Custom serialization functions

Since `LocalStorage` and `SessionStorage` only support strings, data needs to be
saved as strings. This is called serialization. You can pass custom serializer
and deserializer functions if you require specific behavior when loading or
saving data from `Storage`.

For example, you can handle numbers like this:

```js
const persistent_number = persistent({
	start_value: 0,
	key: "my-persistent-number",
	storage_type: "localStorage",
	serialize: (value) => value.toString(), // transform before saving
	deserialize: (value) => Number(value) // transform after loading
})
```
