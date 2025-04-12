import { Redis } from 'ioredis';

let client: Redis;
export let sub: Redis;
export let pub: Redis;

doCreateClient();

async function doCreateClient() {
	if (!client)
		client = new Redis(import.meta.env.DEV ? import.meta.env.DEV_REDIS : import.meta.env.PROD_REDIS);

	if (!pub)
		pub = new Redis(import.meta.env.DEV ? import.meta.env.DEV_REDIS : import.meta.env.PROD_REDIS);

	if (!sub)
		sub = new Redis(import.meta.env.DEV ? import.meta.env.DEV_REDIS : import.meta.env.PROD_REDIS);
}

export async function addUser(user: string, board: string, score: number): Promise<boolean> {
	// NX add if not exists
	const added = await client.zadd(board, "NX", score, user);
	
	if (added > 0)
		pub.publish(board, JSON.stringify({ operation: "ADD", user, score }));
	
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
