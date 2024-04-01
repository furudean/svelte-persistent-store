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

The store listens to events from the `Storage` interface and will sync its
internal state upon changes. This makes debugging using the developer console
easy, and it will update across sessions as well.

## Install

```bash
npm install @furudean/svelte-persistent-store
```

## Use

> **Note**: By default only
> [JSON serializable values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description)
> are handled, but [custom serialization and deserialization functions can be
> provided](#custom-serialization-functions).

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

Since the `Storage` interface only supports strings, data needs to be converted
to strings before saving. By default `JSON.stringify` and `JSON.parse` is used.

You can pass custom serializer and deserializer functions if you require
specific behavior when loading or saving data from `Storage`. For example, you
can handle `Date`s like this:

```js
const persistent_date = persistent({
	start_value: new Date(),
	key: "my-persistent-date",
	storage_type: "localStorage",
	serialize: (date) => date.toISOString(), // transform before saving
	deserialize: (str) => new Date(str) // transform after loading
})
```
