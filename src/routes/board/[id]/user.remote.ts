import { db } from '$/index';
import { users } from '$/lib/db/auth-schema';
import { query } from '$app/server';
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