import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$/lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		return redirect(302, `/account/${locals.user.id}`);
	}
};

export const actions: Actions = {
	oauth: async (event) => {
		const data = await event.request.formData();
		const provider = data.get("provider");

		const ret = await auth.api.signInSocial({
			body: {
				...event,
				provider,
				callbackURL: "/account/login",
			},
		});

		console.log(ret);
	}
};