import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        return redirect(302, `/account/${locals.user.id}`);
    }

    return {};
};