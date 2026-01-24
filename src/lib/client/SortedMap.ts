import { SortedArray } from './SortedArray';

type kvp<K, V> = { key: K; value: V };

export class SortedMap<K, V> implements Map<K, V> {
	public array: SortedArray<{ key: K; value: V }>;
	public map: Map<K, { index: number; value: V }>;
	private readonly comparator: (a: kvp<K, V>, b: kvp<K, V>) => number;
	private readonly comparatorWrapped: (a: kvp<K, V>, b: kvp<K, V>) => number;
	private readonly keyEquals: (a: K, b: K) => boolean;

	constructor(comparator: (a: kvp<K, V>, b: kvp<K, V>) => number, keyEquals?: (a: K, b: K) => boolean) {
		this.comparator = comparator;
		this.comparatorWrapped = (a, b) => {
			const c = comparator(a, b);
			if (c !== 0) return c;
			try {
				const ka = JSON.stringify(a.key);
				const kb = JSON.stringify(b.key);
				if (ka < kb) return -1;
				if (ka > kb) return 1;
				return 0;
			} catch {
				return 0;
			}
		};
		this.keyEquals = keyEquals || ((a, b) => a === b);
		this.array = new SortedArray(this.comparatorWrapped, false);
		this.map = new Map();
	}

	has(key: K): boolean {
		for (const k of this.map.keys()) {
			if (this.keyEquals(k, key)) return true;
		}
		return false;
	}

	get(key: K, _default?: V): V | undefined {
		for (const [k, entry] of this.map.entries()) {
			if (this.keyEquals(k, key)) return entry.value;
		}
		return _default;
	}

	set(key: K, value: V) {
		for (const k of this.map.keys()) {
			if (this.keyEquals(k, key)) {
				this.map.get(k)!.value = value;
				const items: Array<{ key: K; value: V }> = [];
				for (const [k2, info] of this.map.entries()) {
					items.push({ key: k2, value: info.value });
				}
				this.array = new SortedArray<{ key: K; value: V }>(this.comparatorWrapped, false);
				this.array.push(...items);
				this.map = new Map();
				let i = 0;
				for (const it of this.array.toArray()) {
					i++;
					this.map.set(it.key, { index: i, value: it.value });
				}
				return this;
			}
		}
		const index = this.array.push({ key, value });
		this.map.set(key, { index, value });
		return this;
	}

	delete(key: K): boolean {
		let found = false;
		for (const k of this.map.keys()) {
			if (this.keyEquals(k, key)) {
				found = true;
				this.array.delete({ key: k, value: undefined });
				this.map.delete(k);
				break;
			}
		}
		return found;
	}

	keys(): IterableIterator<K> {
		return this.array
			.toArray()
			.map((n) => n.key)
		[Symbol.iterator]();
	}

	values(): IterableIterator<V> {
		return this.array
			.toArray()
			.map((n) => n.value)
		[Symbol.iterator]();
	}

	entries(): IterableIterator<[K, V]> {
		return this.array
			.toArray()
			.map<[K, V]>((n) => [n.key, n.value])
		[Symbol.iterator]();
	}

	clear() {
		this.array.clear();
	}

	readonly [Symbol.toStringTag]: string = '';

	[Symbol.iterator](): IterableIterator<[K, V]> {
		return this.entries();
	}

	forEach(cb: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
		this.array.toArray().forEach((item) => cb.call(thisArg, item.value, item.key, this));
	}

	get size(): number {
		return this.array.length;
	}
}
