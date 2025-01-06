import type { LayoutServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
    if (locals.user) {
        return { user: locals.user };
    }
};