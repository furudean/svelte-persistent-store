import { writable } from "svelte/store"

/**
 * @template {unknown} T
 *
 * @typedef {Object} Options
 *
 * @property {T} start_value
 * Initial value of the store, if there is nothing in `Storage`.
 *
 * @property {string} key
 * Key to save as in `Storage`.
 *
 * @property {"localStorage" | "sessionStorage"} storage_type
 * `Storage` object to use.
 *
 * @property {(value: T) => string} [serialize]
 * Function used to convert data before saving to `Storage`. Defaults to
 * `JSON.stringify`.
 *
 * @property {(value: string) => T} [deserialize]
 * Function used to convert `Storage` to data. Defaults to `JSON.parse`.
 */

const DEFAULT_OPTIONS = Object.freeze({
	serialize: JSON.stringify,
	deserialize: JSON.parse
})

/**
 * Store that saves and loads data from `localStorage` or `sessionStorage`.
 *
 * If `Storage` is updated the store state will sync to reflect all sessions.
 *
 * By default only JSON serializable values are handled, but custom
 * serialization and deserialization functions can be provided.
 *
 * @template {unknown} T
 *
 * @param {Options<T>} options
 */
export function persistent(options) {
	/** @type {Required<Options<T>>} */
	const _options = { ...DEFAULT_OPTIONS, ...options }
	const { key, storage_type, start_value, serialize, deserialize } = _options

	const storage =
		typeof window !== "undefined"
			? window[storage_type] ?? undefined
			: undefined

	const store = writable(start_value, function start() {
		if (!storage) return

		sync()

		/** @param {StorageEvent} event */
		function storage_handler(event) {
			if (event.key === key) sync()
		}

		window.addEventListener("storage", storage_handler)

		return function stop() {
			window.removeEventListener("storage", storage_handler)
		}
	})

	/**
	 * Set store value and web storage
	 * @param value {T}
	 */
	function set(value) {
		store.set(value)
		storage?.setItem(key, serialize(value))
	}

	/**
	 * Update store value and web storage
	 * @param {(value: T) => T} cb
	 */
	function update(cb) {
		store.update((current_value) => {
			const new_value = cb(current_value)

			storage?.setItem(key, serialize(new_value))

			return new_value
		})
	}

	/** Reconcile store value with web storage */
	function sync() {
		const stored_data = storage?.getItem(key)

		if (stored_data === null || stored_data === undefined) {
			set(start_value)
		} else {
			store.set(deserialize(stored_data)) // only set store value to avoid extra write
		}
	}

	return {
		set,
		update,
		subscribe: store.subscribe
	}
}
