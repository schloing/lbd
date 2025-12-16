import { db } from '$/index';
import type { PageServerLoad } from './$types';
import dns from 'dns/promises';

export const load: PageServerLoad = async ({ fetch }) => {
    const commitsRes = await fetch(
        'https://api.github.com/repos/schloing/lbd/commits?per_page=10',
        {
            headers: {
                'Accept': 'application/vnd.github+json'
            }
        }
    );

    let commits, actions;

    if (commitsRes.ok) {
        commits = await commitsRes.json();
    }

    const actionsRes = await fetch(
        'https://api.github.com/repos/schloing/lbd/actions/workflows/main.yml/runs?per_page=10',
        {
            headers: {
                'Accept': 'application/vnd.github+json'
            }
        }
    )

    if (actionsRes.ok) {
        actions = await actionsRes.json();
    }

    let dbStatus, redisStatus = true; // FIXME

    try {
        await db.execute('SELECT 1');
        dbStatus = true;
    } catch (err) {
        dbStatus = false;
    }

    return {
        commits,
        actions,
        dbStatus,
        redisStatus,
    };
};