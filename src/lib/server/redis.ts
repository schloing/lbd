import { redisRest, realtime } from './realtime';
import type { RankUser, ScoreUser } from '../client/RankUser.js';
import { BoardOperation, type Instruction } from '../client/board.js';

function serializeUser(user: RankUser): string {
	return JSON.stringify({
		name: user.name,
		username: user.username ?? null,
		uuid: user.uuid ?? null,
		board: user.board,
		accountAssociated: user.accountAssociated
	});
}

function usersMatch(a: RankUser, b: RankUser): boolean {
	if (a.uuid && b.uuid) {
		return a.uuid === b.uuid && a.board === b.board;
	}
	return a.name === b.name && a.board === b.board;
}

async function findStoredUser(user: RankUser, board: string): Promise<string | null> {
	if (!redisRest) return null;
	const rows = await redisRest.zrange(board, 0, -1);
	for (const row of rows) {
		try {
			const stored = JSON.parse(row) as RankUser;
			if (usersMatch(stored, user)) {
				return row;
			}
		} catch {
			if (row === user.name) {
				return row;
			}
		}
	}
	return null;
}

export async function addUser(user: RankUser, score: number, board: string): Promise<boolean> {
	if (!redisRest || !realtime) throw new Error('Upstash Redis is not configured');
	const added = await redisRest.zadd(board, { nx: true }, { score, member: serializeUser(user) });

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
	const storedMember = await findStoredUser(user, board);
	if (!storedMember) return false;
	const removed = await redisRest.zrem(board, storedMember);

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
	const storedMember = await findStoredUser(user, board);
	if (!storedMember) return false;
	const updated = await redisRest.zadd(
		board,
		{ xx: true, ch: true },
		{ score, member: storedMember }
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
	return users as string[];
}
