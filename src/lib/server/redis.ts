import { Redis } from 'ioredis';
import type { RankUser, ScoreUser } from '../client/RankUser.js';
import { BoardOperation, type Instruction } from '../client/board.js';

const dev = process.env.NODE_ENV !== 'production';

let client: Redis | null = null;
let pub: Redis | null = null;
let sub: Redis | null = null;

const DEV_REDIS_HOST = '127.0.0.1';
function getRedisInstance(): Redis {
	if (!dev) {
		const host = process.env.REDIS_REST_URL;
		const token = process.env.REDIS_REST_TOKEN;

		if (!host || !token) {
			throw new Error('Missing Upstash Redis environment variables');
		}

		return new Redis(
			`rediss://default:${encodeURIComponent(token)}@${host}:6379`
		);
	}

	return new Redis({
		port: 6379,
		host: DEV_REDIS_HOST,
		username: 'default',
		password: ''
	});
}

async function getClient(): Promise<Redis> {
	if (!client) {
		client = getRedisInstance();
	}
	return client;
}

async function getPub(): Promise<Redis> {
	if (!pub) pub = getRedisInstance();
	return pub;
}

async function getSub(): Promise<Redis> {
	if (!sub) sub = getRedisInstance();
	return sub;
}

export async function addUser(user: RankUser, score: number, board: string): Promise<boolean> {
	const redis = await getClient();
	const publisher = await getPub();

	const added = await redis.zadd(board, 'NX', score, JSON.stringify(user));

	if (added > 0) {
		publisher.publish(
			board,
			JSON.stringify({
				operation: BoardOperation.AddPlayer,
				user: { user, score } as ScoreUser
			} as Instruction)
		);
	}

	return added > 0;
}

export async function removeUser(user: RankUser, board: string): Promise<boolean> {
	const redis = await getClient();
	const publisher = await getPub();

	const removed = await redis.zrem(board, JSON.stringify(user));

	if (removed > 0) {
		publisher.publish(
			board,
			JSON.stringify({
				operation: BoardOperation.RemovePlayer,
				user: { user, score: 0 } as ScoreUser
			} as Instruction)
		);
	}

	return removed > 0;
}

export async function updateUser(user: RankUser, score: number, board: string): Promise<boolean> {
	const redis = await getClient();
	const publisher = await getPub();

	const updated = await redis.zadd(board, 'XX', 'CH', score, JSON.stringify(user));

	if (updated > 0) {
		publisher.publish(
			board,
			JSON.stringify({
				operation: BoardOperation.UpdatePlayer,
				user: { user, score } as ScoreUser
			} as Instruction)
		);
	}

	return updated > 0;
}

export async function incrementUser(user: string, board: string, change: number): Promise<boolean> {
	const redis = await getClient();
	const updated = await redis.zadd(board, 'XX', 'CH', change, user);
	return updated > 0;
}

export async function getUsersWithinRanks(
	board: string,
	start: number,
	stop: number
): Promise<string[] | null> {
	if (start > stop) return null;
	const redis = await getClient();

	const users = await redis.zrange(board, start, stop, 'REV', 'WITHSCORES');
	return users;
}

export { getClient as client, getPub as pub, getSub as sub };