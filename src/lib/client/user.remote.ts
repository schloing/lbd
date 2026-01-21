import { db } from "$/index";
import { query } from "$app/server";
import * as z from "zod";
import { users } from "../db/auth-schema";
import { eq } from "drizzle-orm";

export const getUserById = query(z.string(), async (uuid) => {
    try {
        const [queriedUser] = await db.select({ username: users.username, uuid: users.id })
            .from(users)
            .where(eq(users.id, uuid));

        return queriedUser;
    }
    catch (e) {
        return null;
    }
});