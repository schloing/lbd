import type { RequestHandler } from './$types';
import { sub } from '$/lib/server/redis';

export const GET: RequestHandler = async ({ params }) => {
    let open = true;

    const stream = new ReadableStream({
        start(controller) {
            sub.subscribe(params.id);

            controller.enqueue(encode(`: connected\n\n`));

            const handler = (channel: string, message: string) => {
                if (!open) return;
                if (channel !== params.id) return;

                try {
                    controller.enqueue(
                        encode(`data: ${message}\n\n`)
                    );
                } catch {
                    // controller already closed, ignore
                }
            };

            sub.on('message', handler);

            // save teardown
            // @ts-ignore – store on controller
            controller._cleanup = () => {
                open = false;
                sub.off('message', handler);
                sub.unsubscribe(params.id);
            };
        },

        cancel() {
            // @ts-ignore
            this._cleanup?.();
            open = false;
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

function encode(str: string) {
    return new TextEncoder().encode(str);
}
