import { writable } from 'svelte/store';

export const boardStore = writable(
	null as {
		name: string;
		id: string;
		createdAt: Date;
		updatedAt: Date;
		participants: number;
		points: number | null;
		private: boolean;
		owner: {
			name: string | null;
			id: string;
			image: string | null;
			username: string | null;
		};
		// rankings: {
		// 	id: string;
		// 	userId: string;
		// 	points: number;
		// 	boardId: string;
		// }[];
	} | null
);
