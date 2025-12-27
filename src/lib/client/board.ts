import type { UUID } from 'node:crypto';
import type { RankUser } from './rankuser';

export enum BoardOperation {
	AddPlayer = 'AddPlayer',
	RemovePlayer = 'RemovePlayer',
	UpdatePlayer = 'UpdatePlayer',
	ResetBoard = 'ResetBoard'
}

export interface Instruction {
	operation: BoardOperation;
	user: RankUser;
}