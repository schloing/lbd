import { handle } from '@upstash/realtime';
import { realtime } from '$/lib/server/realtime';
import { ZodInstruction } from '$/lib/client/board';
import { addUser, removeUser, updateUser } from '$/lib/server/redis';
import { BoardOperation } from '$/lib/client/board';

export const GET = async ({ url, params }: { url: URL; params: { id: string } }) => {
	if (!realtime) {
		return new Response('Upstash Redis is not configured', { status: 500 });
	}
	const realtimeUrl = new URL(url);
	realtimeUrl.searchParams.set('channel', `realtime:${params.id}`);
	return (
		(await handle({ realtime })(new Request(realtimeUrl))) ?? new Response(null, { status: 204 })
	);
};

export const POST = async ({ request, params, locals }: any) => {
	if (!locals.user) {
		return new Response('Unauthorized', { status: 401 });
	}

	const parsed = ZodInstruction.safeParse(await request.json());
	if (!parsed.success) {
		return new Response('Invalid instruction', { status: 400 });
	}

	const instruction = parsed.data;
	let success = false;

	switch (instruction.operation) {
		case BoardOperation.AddPlayer:
			success = await addUser(instruction.user.user, instruction.user.score, params.id);
			break;
		case BoardOperation.UpdatePlayer:
			success = await updateUser(instruction.user.user, instruction.user.score, params.id);
			break;
		case BoardOperation.RemovePlayer:
			success = await removeUser(instruction.user.user, params.id);
			break;
	}

	return Response.json({ success });
};
