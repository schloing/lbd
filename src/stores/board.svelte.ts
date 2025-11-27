export const boardState = $state({} as {
	board: {
		name: string;
		id: string;
		createdAt: Date;
		updatedAt: Date;
		participants: number;
		points: number;
		private: boolean;
		ownerId: string;
	} | null
});