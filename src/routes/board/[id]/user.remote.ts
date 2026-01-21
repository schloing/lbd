import { db } from '$/index';
import { type RankUser } from '$/lib/client/rankuser';
import { users } from '$/lib/db/auth-schema';
import { updateUser } from '$/lib/server/redis';
import { command, query } from '$app/server';
import { like } from 'drizzle-orm';
import * as z from "zod";

export const getUserByUsername = query(z.string(), async (username) => {
    if (username.length <= 1) {
        return [];
    }

    try {
        const queriedUsers = await db.select({ username: users.username, uuid: users.id })
            .from(users)
            .where(like(users.username, `%${username}%`))
            .limit(10);

        return queriedUsers;
    }
    catch (e) {
        return [];
    }
});

export const updateUserPoints = command(z.string(), async (user) => {
    let rankUser;

    try {
        rankUser = JSON.parse(user) as RankUser & { score: number };
    }
    catch (e) {
        console.log("failed to parse");
        return { success: false };
    }

    const { score, ...cleanUser } = rankUser;

    if (await updateUser(cleanUser, rankUser.score, rankUser.board)) {
        return { success: true }
    }

    return { success: false };
});