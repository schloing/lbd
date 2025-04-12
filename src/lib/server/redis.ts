import { Redis } from 'ioredis';

export let client: Redis;

doCreateClient();

async function doCreateClient() {
	if (client) return;
	client = new Redis(import.meta.env.DEV ? import.meta.env.DEV_REDIS : import.meta.env.PROD_REDIS);
}

export async function addUser(user: string, board: string, score: number): Promise<boolean> {
	// NX add if not exists
	const added = await client.zadd(board, "NX", score, user);
	return added > 0;
}

export async function updateUser(user: string, board: string, score: number): Promise<boolean> {
	// XX update if exists
	const updated = await client.zadd(board, "XX", "CH", score, user);
	return updated > 0;
}

export async function incrementUser(user: string, board: string, change: number): Promise<boolean> {
	// XX update if exists
	const updated = await client.zadd(board, "XX", "CH", change, user);
	return updated > 0;
}

export async function getUsersWithinRanks(board: string, start: number, stop: number): Promise<string[] | null> {
	if (start > stop)
		return null;

	const users = await client.zrange(board, start, stop, "REV", "WITHSCORES");

	return users;
}

// https://github.com/cloudcommunity/Cloud-Free-Tier-Comparison?utm_source=chatgpt.com
// https://www.dragonflydb.io/docs/category/sorted-sets
