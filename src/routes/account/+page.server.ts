import * as auth from '$/lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './login/$types';
import type { RequestEvent } from '@sveltejs/kit';

export const load: PageServerLoad = async (event: RequestEvent) => {
	if (!event.locals.user) {
		return redirect(302, '/account/login');
	}
	return { user: event.locals.user };
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
