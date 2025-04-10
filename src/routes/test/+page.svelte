<script lang="ts">
	import { addUser, client } from '$/lib/server/redis';
	import { beforeNavigate } from '$app/navigation';

	const boardID = crypto.randomUUID();

	// await client.ZADD()

	beforeNavigate(async () => {
		await client.unsubscribe();
		await client.quit();
	});
</script>

<h1>board: {boardID}</h1>
<button on:click={() => addUser(crypto.randomUUID(), boardID, Math.floor(Math.random() * 100))}
	>hello</button
>
