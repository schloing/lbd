import type { ScoreUser } from './RankUser';

export enum BoardOperation {
	AddPlayer = 'AddPlayer',
	RemovePlayer = 'RemovePlayer',
	UpdatePlayer = 'UpdatePlayer',
	ResetBoard = 'ResetBoard'
}

export interface Instruction {
	operation: BoardOperation;
	user: ScoreUser;
}