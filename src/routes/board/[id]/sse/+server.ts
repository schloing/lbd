import type { RequestHandler } from './$types';
import Redis from 'ioredis';

export const GET: RequestHandler = async ({ params }) => {
    const encoder = new TextEncoder();
    const redisSub = new Redis({ host: 'localhost', port: 6379 });
    let open = true;
    let cleanup: () => void;

    const stream = new ReadableStream({
        start(controller) {
            redisSub.subscribe(params.id);

            controller.enqueue(encoder.encode(`data: connected\n\n`));

            const handler = (channel: string, message: string) => {
                if (!open || channel !== params.id) return;
                controller.enqueue(encoder.encode(`data: ${message}\n\n`));
            };

            redisSub.on('message', handler);

            const heartbeat = setInterval(() => {
                if (!open) return;
                controller.enqueue(encoder.encode(`data: keep-alive\n\n`));
            }, 20_000);

            cleanup = () => {
                open = false;
                clearInterval(heartbeat);
                redisSub.off('message', handler);
                redisSub.unsubscribe(params.id);
                redisSub.disconnect();
            };
        },

        cancel() {
            cleanup?.();
        }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            Connection: 'keep-alive'
        }
    });
};