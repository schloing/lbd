import type { LayoutServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event: RequestEvent) => {
    if (event.locals.user) {
        return { user: event.locals.user };
    }
};