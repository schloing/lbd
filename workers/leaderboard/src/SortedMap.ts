import { SortedArray } from './SortedArray';

type kvp<K, V> = { key: K; value: V; };

export class SortedMap<K, V> implements Map<K, V> {
    public array: SortedArray<{ key: K; value: V }>;
    private readonly comparator: (a: kvp<K, V>, b: kvp<K, V>) => number;

    constructor(comparator: (a: kvp<K, V>, b: kvp<K, V>) => number) {
        this.comparator = comparator;
        this.array = new SortedArray<{ key: K; value: V }>((a, b) => comparator(a, b), true);
    }

    has(key: K): boolean {
        return this.array.includes({ key: key, value: undefined });
    }

    get(key: K, _default?: V): V | undefined {
        const index = this.array.firstIndexOf({ key: key, value: undefined });
        return this.array.get(index)?.value ?? _default;
    }

    set(key: K, value: V): this {
        this.array.push({ key, value });
        return this;
    }

    delete(key: K): boolean {
        return this.array.delete({ key: key, value: undefined });
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

    readonly [Symbol.toStringTag]: string = "";

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