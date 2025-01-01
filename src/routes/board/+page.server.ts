import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import * as table from '$/lib/server/db/schema';
import { randomUUID } from 'node:crypto';

export const load: PageServerLoad = async (event: RequestEvent) => {
    if (!event.locals.user) {
        return redirect(302, '/account/login');
    }
    return { user: event.locals.user };
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
