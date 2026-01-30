import z from 'zod';
import { ZodScoreUser, type ScoreUser } from './RankUser';

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

export const ZodBoardOperation = z.enum(['AddPlayer', 'RemovePlayer', 'UpdatePlayer', 'ResetBoard']);

export const ZodInstruction = z.strictObject({
	operation: ZodBoardOperation,
	user: ZodScoreUser,
});