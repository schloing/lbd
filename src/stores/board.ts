import { persisted } from 'svelte-persisted-store';

export const boardStore = persisted<{
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
} | undefined>("leaderbored-board", undefined);