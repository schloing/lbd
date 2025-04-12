import { writable } from 'svelte/store';

export const userStore = writable(null as { id: string, username: string } | null);
