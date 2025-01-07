import * as auth from '$/lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import * as table from '$/lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return redirect(302, '/account/login');
	}

	const boards = (await locals.DB
		.select()
		.from(table.boards)
		.where(eq(table.boards.owner, locals.user.id)));

	return { user: locals.user, boards: boards };
};

export const actions: Actions = {
	logout: async (event: RequestEvent) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event, event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		return redirect(302, '/account/login');
	},
	rename: async (event: RequestEvent) => {
		if (!event.locals.session) {
			return fail(401);
		}

		// unimplemented

		return redirect(302, '/account');
	},
	delete: async (event: RequestEvent) => {
		if (!event.locals.session) {
			return fail(401);
		}

		// unimplemented

		return redirect(302, '/account/login');
	}
};
