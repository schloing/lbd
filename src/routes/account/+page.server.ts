import * as auth from '$/lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import * as table from '$/lib/server/db/schema';
import type { Actions, PageServerLoad } from './login/$types';
import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event: RequestEvent) => {
	if (!event.locals.user) {
		return redirect(302, '/account/login');
	}

	const boards = (await event.locals.DB
		.select()
		.from(table.boards)
		.where(eq(table.boards.owner, event.locals.user.id)));

	return { user: event.locals.user, boards: boards };
};

export const actions: Actions = {
	logout: async (event: RequestEvent) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event, event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		return redirect(302, '/account/login');
	}
};
