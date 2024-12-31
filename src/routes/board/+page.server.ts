// import { fail, redirect } from '@sveltejs/kit';
// import type { Actions, PageServerLoad } from './$types';
// import type { RequestEvent } from '@sveltejs/kit';

// export const load: PageServerLoad = async (event: RequestEvent) => {
//     if (!event.locals.user) {
//         return redirect(302, '/account/login');
//     }
//     return { user: event.locals.user };
// };

// export const actions: Actions = {
//     createBoard: async (event: RequestEvent) => {
//         if (!event.locals.session) {
//             return fail(401);
//         }
//     }
// };
