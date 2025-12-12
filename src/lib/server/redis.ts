import { Redis } from 'ioredis';
import type { RankUser } from '../client/rankuser';

let client: Redis;
export let sub: Redis;
export let pub: Redis;

const DEV_REDIS = '127.0.0.1:6379';
const getRedis = () => new Redis(import.meta.env.DEV ? DEV_REDIS : import.meta.env.PROD_REDIS);

doCreateClient();

async function doCreateClient() {
	if (!client) client = getRedis();
	if (!pub) pub = getRedis();
	if (!sub) sub = getRedis();

	enableRedisPersistence(client).catch((err) => {
		console.warn('could not enable redis persistence:', err.message ?? err);
	});
}

async function enableRedisPersistence(redis: Redis) {
	try {
		await redis.config('SET', 'appendonly', 'yes');
		await redis.config('SET', 'appendfsync', 'everysec');
		await redis.config('SET', 'save', '900 1 300 10 60 10000');
		await redis.bgsave();
		console.info('AOF + snapshotting');
	} catch (err) {
		throw err;
	}
}


export async function addUser(user: RankUser, board: string): Promise<boolean> {
	// NX add if not exists
	const added = await client.zadd(board, 'NX', user.score, JSON.stringify(user));

	if (added > 0) pub.publish(board, JSON.stringify({ operation: 'ADD', ...user }));

	return added > 0;
}

export async function updateUser(user: string, board: string, score: number): Promise<boolean> {
	// XX update if exists
	const updated = await client.zadd(board, 'XX', 'CH', score, user);
	return updated > 0;
}

export async function incrementUser(user: string, board: string, change: number): Promise<boolean> {
	// XX update if exists
	const updated = await client.zadd(board, 'XX', 'CH', change, user);
	return updated > 0;
}

export async function getUsersWithinRanks(
	board: string,
	start: number,
	stop: number
): Promise<string[] | null> {
	if (start > stop) return null;

	const users = await client.zrange(board, start, stop, 'REV', 'WITHSCORES');

	return users;
}