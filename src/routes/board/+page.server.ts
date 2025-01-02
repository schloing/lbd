import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import * as table from '$/lib/server/db/schema';
import { randomUUID } from 'node:crypto';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event: RequestEvent) => {
    if (!event.locals.user) {
        return redirect(302, '/account/login');
    }

    const boards = (await event.locals.DB
        .select()
        .from(table.boards)
        .where(eq(table.boards.owner, event.locals.user.id)));

    return { boards: boards };
};

export const actions: Actions = {
    createBoard: async (event: RequestEvent) => {
        if (!event.locals.session) {
            return fail(401);
        }

        const formData = await event.request.formData();
        const boardName = formData.get('boardName');
        // const isPrivate = formData.get('isPrivate');

        const boardId = randomUUID();
        try {
            await event.locals.DB
                .insert(table.boards)
                .values({
                    id: boardId,
                    name: boardName,
                    owner: event.locals.user.id
                });
        } catch (e) {
            console.error(e);
            return fail(500, { message: 'An error has occurred' });
        }

        return redirect(303, `/board/${boardId}`);
    }
};
