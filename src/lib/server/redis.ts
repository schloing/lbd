import { createClient, type RedisFunctions, type RedisModules, type RedisScripts } from "redis";
import { type UUID } from "crypto";
import type { RedisClientType } from "@redis/client";

export let client: any;

export async function doCreateClient() {
    if (client) return;

    client =
        await createClient({ url: import.meta.env.DEV ? import.meta.env.DEV_REDIS : import.meta.env.PROD_REDIS })
            .on('error', err => console.log('redis client error', err))
            .connect();
}

export async function addUser(user: UUID, board: UUID, score: number): Promise<boolean> {
    // NX add if not exists
    const added = await client.zAdd(board as string, [{ score, value: user }], { NX: true, CH: true });
    return added > 0;
}

export async function updateUser(user: UUID, board: UUID, score: number): Promise<boolean> {
    // XX update if exists
    const updated = await client.zAdd(board as string, [{ score, value: user }], { XX: true, CH: true });
    return updated > 0;
}

export async function incrementUser(user: UUID, board: UUID, change: number): Promise<boolean> {
    // XX update if exists
    const updated = await client.zAdd(board as string, [{ score: change, value: user }], { INCR: true, XX: true, CH: true });
    return updated > 0;
}

// https://github.com/cloudcommunity/Cloud-Free-Tier-Comparison?utm_source=chatgpt.com
// https://www.dragonflydb.io/docs/category/sorted-sets