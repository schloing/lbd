import { browser } from '$app/environment';

export class LocalStore<T> {
    #value = $state() as T;
    #key: string;

    constructor(key: string, initialValue: T) {
        this.#key = key;
        
        if (browser) {
            const item = localStorage.getItem(key);
            this.#value = item ? JSON.parse(item) : initialValue;
        }
        else {
            this.#value = initialValue;
        }
    }

    get value(): T {
        return this.#value;
    }

    set value(newValue: T) {
        this.#value = newValue;
        if (browser) {
            localStorage.setItem(this.#key, JSON.stringify(newValue));
        }
    }
}
