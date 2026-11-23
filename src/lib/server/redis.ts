import { redisRest, realtime } from './realtime';
import type { RankUser, ScoreUser } from '../client/RankUser.js';
import { BoardOperation, type Instruction } from '../client/board.js';

export async function addUser(user: RankUser, score: number, board: string): Promise<boolean> {
	if (!redisRest || !realtime) throw new Error('Upstash Redis is not configured');
	const added = await redisRest.zadd(board, { nx: true }, { score, member: JSON.stringify(user) });

	if ((added ?? 0) > 0) {
		await realtime.channel(board).emit('board.update', {
			operation: BoardOperation.AddPlayer,
			user: { user, score } as ScoreUser
		} as Instruction);
	}

	return (added ?? 0) > 0;
}

export async function removeUser(user: RankUser, board: string): Promise<boolean> {
	if (!redisRest || !realtime) throw new Error('Upstash Redis is not configured');
	const removed = await redisRest.zrem(board, JSON.stringify(user));

	if (removed > 0) {
		await realtime.channel(board).emit('board.update', {
			operation: BoardOperation.RemovePlayer,
			user: { user, score: 0 } as ScoreUser
		} as Instruction);
	}

	return removed > 0;
}

export async function updateUser(user: RankUser, score: number, board: string): Promise<boolean> {
	if (!redisRest || !realtime) throw new Error('Upstash Redis is not configured');
	const updated = await redisRest.zadd(
		board,
		{ xx: true, ch: true },
		{ score, member: JSON.stringify(user) }
	);

	if ((updated ?? 0) > 0) {
		await realtime.channel(board).emit('board.update', {
			operation: BoardOperation.UpdatePlayer,
			user: { user, score } as ScoreUser
		} as Instruction);
	}

	return (updated ?? 0) > 0;
}

export async function incrementUser(user: string, board: string, change: number): Promise<boolean> {
	if (!redisRest) throw new Error('Upstash Redis is not configured');
	const updated = await redisRest.zincrby(board, change, user);
	return updated !== null;
}

export async function getUsersWithinRanks(
	board: string,
	start: number,
	stop: number
): Promise<string[] | null> {
	if (start > stop) return null;
	if (!redisRest) return null;
	const users = await redisRest.zrange(board, start, stop, { rev: true, withScores: true });
	return users.map(String);
}
