import type { Actions, PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();

	if (!session?.user) {
		return redirect(302, `/account/login`);
	}

	return redirect(302, `/account/${session.user.id}`);
};
