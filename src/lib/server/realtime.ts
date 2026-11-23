import { Redis } from '@upstash/redis';
import { Realtime } from '@upstash/realtime';
import z from 'zod/v4';

function getRedisUrl() {
	const host = process.env.REDIS_REST_URL;
	if (!host) {
		return undefined;
	}
	return host.startsWith('http') ? host : `https://${host}`;
}

const url = getRedisUrl();
const token = process.env.REDIS_REST_TOKEN;

export const redisRest =
	url && token
		? new Redis({
				url,
				token,
				automaticDeserialization: false
			})
		: null;

export const realtime = redisRest
	? new Realtime({
			redis: redisRest,
			schema: {
				board: {
					update: z.any()
				}
			},
			history: true
		})
	: null;
