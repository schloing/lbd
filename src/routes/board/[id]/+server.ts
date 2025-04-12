import type { RequestHandler } from './$types';
import { produce } from 'sveltekit-sse';
import { sub } from '$/lib/server/redis';

export const POST: RequestHandler = async ({ params }) => {
    return produce(async function start({ emit }) {
        sub.on("message", (channel, message) => {
            if (channel === params.id) {
                const { error } = emit(params.id, message);

                if (error) {
                    return function cancel() {
                        console.warn("connection cancalled");
                    }
                }
            }
        });
    }, {
        stop() {
            sub.unsubscribe(params.id);
        }
    });
}