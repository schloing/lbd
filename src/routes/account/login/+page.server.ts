import { signIn } from '$/auth';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();

	if (session?.user) {
		return redirect(302, `/account/${session.user.id}`);
	}
};

export const actions: Actions = { default: signIn };
