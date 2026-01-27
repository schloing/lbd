import { db } from '$/index';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
    const commitsRes = async () => {
        const data = await fetch(
            'https://api.github.com/repos/schloing/lbd/commits?per_page=10',
            {
                headers: {
                    'Accept': 'application/vnd.github+json'
                }
            }
        );
        return await data.json();
    };

    const actionsRes = async () => {
        const data = await fetch(
            'https://api.github.com/repos/schloing/lbd/actions/workflows/main.yml/runs?per_page=10',
            {
                headers: {
                    'Accept': 'application/vnd.github+json'
                }
            }
        );
        return await data.json();
    };

    let dbStatus, redisStatus = true; // FIXME

    try {
        await db.execute('SELECT 1');
        dbStatus = true;
    } catch (err) {
        dbStatus = false;
    }

    return {
        commitsRes: commitsRes(),
        actionsRes: actionsRes(),
        dbStatus,
        redisStatus,
    };
};