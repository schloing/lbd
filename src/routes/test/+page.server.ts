import type { PageServerLoad } from './$types';
import { CALLS_APP_ID, CALLS_API_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { randomUUID } from 'node:crypto';

export const load: PageServerLoad = async ({ locals }) => {
}