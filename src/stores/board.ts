import { writable } from 'svelte/store';

export const boardStore = writable<{
    id: string;
    name: string;
    owner: string;
    resolvedOwner: {
        display: string,
        username: string,
    };
    updatedAt: string;
    createdAt: string;
    participants: number;
    points: number | null;
}>(undefined);