import type { PageServerLoad } from "./$types";
import { redirect, type RequestEvent } from '@sveltejs/kit';
import * as table from '$/lib/server/db/schema';
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async ({ params, locals, setHeaders }) => {
    const boardId = params.id;
    if (!boardId) return redirect(404, "/board");

    const board = (await locals.DB
        .select()
        .from(table.boards)
        .where(eq(table.boards.id, boardId))
    ).at(0);

    const rankings = (await locals.DB
        .select()
        .from(table.rankings)
        .where(eq(table.rankings.boardId, boardId))
    );

    const resolvedOwner = (await locals.DB
        .select({ username: table.user.username, display: table.user.display })
        .from(table.user)
        .where(eq(table.user.id, board.owner))
    ).at(0);

    return {
        board,
        rankings,
        resolvedOwner,
    };
};