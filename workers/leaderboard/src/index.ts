import { randomUUID, UUID } from 'node:crypto';
import { SortedMap } from './SortedMap';
// SortedMap and SortedArray from https://github.com/bacali95/sweet-collections

interface KVP {
	key: UUID,
	value: number,
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		//  receive board id and request (create/remove/update/destroy ranking)
		//  if (board structure for id is not made)
		//  	if (exists in db)
		//  		convert db to board structure
		//  	else
		//  		create new board structure
		//  else
		//  	use open instance
		//  (board structure exists here)
		//  if (inactivity for 5min)
		// 		write structure to db 
		// 		destroy the instance of the structure

		const leaderboard = new SortedMap<UUID, number>((a: KVP, b: KVP): number => {
			return a.value - b.value;
		});

		for (let i = 0; i < 10; i++) {
			leaderboard.set(randomUUID(), i);
		}

		return Response.json(Array.from(leaderboard.entries()));
	},
} satisfies ExportedHandler<Env>;
