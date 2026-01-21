import { SortedArray } from './SortedArray';

type kvp<K, V> = { key: K; value: V };

export class SortedMap<K, V> implements Map<K, V> {
	public array: SortedArray<{ key: K; value: V }>;
	public map: Map<K, { index: number; value: V }>;
	private readonly comparator: (a: kvp<K, V>, b: kvp<K, V>) => number;
	private readonly comparatorWrapped: (a: kvp<K, V>, b: kvp<K, V>) => number;

	constructor(comparator: (a: kvp<K, V>, b: kvp<K, V>) => number) {
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
		this.array = new SortedArray(this.comparatorWrapped, false);
		this.map = new Map();
	}

	has(key: K): boolean {
		return this.map.has(key);
		// return this.array.includes({ key: key, value: undefined });
	}

	get(key: K, _default?: V): V | undefined {
		const entry = this.map.get(key);
		return entry ? entry.value : _default;
	}

	set(key: K, value: V) {
		
		if (this.map.has(key)) {
			this.map.get(key)!.value = value;
			const items: Array<{ key: K; value: V }> = [];
			for (const [k, info] of this.map.entries()) {
				items.push({ key: k, value: info.value });
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
		const index = this.array.push({ key, value });
		this.map.set(key, { index, value });

		return this;
	}

	delete(key: K): boolean {
		return this.array.delete({ key: key, value: undefined }) && this.map.delete(key);
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
