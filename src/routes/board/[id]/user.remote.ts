import { db } from '$/index';
import { users } from '$/lib/db/auth-schema';
import { boards } from '$/lib/db/schema';
import { auth } from '$/lib/server/auth';
import { getBoardById } from '$/lib/server/board';
import { updateUser } from '$/lib/server/redis';
import { command, getRequestEvent, query } from '$app/server';
import { removeUser as removeUserRedis } from '$/lib/server/redis';
import { ZodRankUser, ZodScoreUser, type RankUser } from '$/lib/client/RankUser';
import { eq, like } from 'drizzle-orm';
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

export const removeUser = command(ZodRankUser, async (user) => {
    const { request } = getRequestEvent();
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) {
        return { success: false, message: "no session" };
    }

    const board = await getBoardById(user.board);

    if (session.user.id !== board?.ownerId) {
        return { success: false, message: "not owner" };
    }

    if (!await removeUserRedis(user as RankUser, user.board)) {
        return { success: false, message: "redis failed" };
    }

    return { success: true };
});

export const deleteBoard = command(z.string(), async (boardId) => {
    const { request } = getRequestEvent();
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) {
        return { success: false };
    }

    const board = await getBoardById(boardId);

    if (!board) {
        return { success: false };
    }

    if (session.user.id !== board.ownerId) {
        return { success: false };
    }

    await db.delete(boards).where(eq(boards.id, board.id));

    return {
        success: true,
        message: 'board deleted'
    };
});