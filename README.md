<img src="iky.png"
  height="76"
  width="62"
  align="right"
  alt="A girl" />

# [svelte-persistent-store](https://www.npmjs.com/package/@furudean/svelte-persistent-store)

This is a
[writable svelte store](https://svelte.dev/docs#run-time-svelte-store-writable)
that saves and loads data from `Window.localStorage` or `Window.sessionStorage`.
Works with Svelte Kit out of the box.

The store listens to events from the `Storage` interface, and will sync its
internal state upon changes. This makes debugging using the developer console
easy, and it will update across sessions as well.

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

Since the `Storage` interface only supports strings, data needs to be saved as
strings. This is called serialization. By default `JSON.stringify` and
`JSON.parse` is used.

You can pass custom serializer and deserializer functions if you require
specific behavior when loading or saving data from `Storage`. For example, you
can handle numbers like this:

```js
const persistent_number = persistent({
	start_value: 0,
	key: "my-persistent-number",
	storage_type: "localStorage",
	serialize: (value) => value.toString(), // transform before saving
	deserialize: (value) => Number(value) // transform after loading
})
```
