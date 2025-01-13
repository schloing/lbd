<script lang="ts">
	import { SortedMap } from '$/lib/SortedMap';
	import { onMount } from 'svelte';

	interface KVP {
		key: string;
		value: number;
	}

	let sorted: SortedMap<string, number> = new SortedMap<string, number>((a: KVP, b: KVP) => {
		// SortedArray checks comparator to check unique instead of comparing the object directly

		// duplicate key
		if (a.key == b.key) return 0;

		// duplicate value
		if (a.value == b.value) return a.key.localeCompare(b.key);

		// nothing
		return a.value - b.value;
	});

	let mapchange: number = 0;

	onMount(() => {
		const amt = 10000;
		for (let i = 1; i < amt; i++) sorted.set(self.crypto.randomUUID(), i);
		mapchange = 1;
	});

	function shit() {
		if (!sorted) return;
		const v = sorted.array.get(0);
		if (v && v.key) sorted.set(v.key, 696969);
		mapchange++;
	}
</script>

<button onclick={shit}>shit</button>
<ul>
	{#if sorted}
		{#key mapchange}
			{#each sorted as entry, i}
				<li>{i + 1}: {entry[0]}: {entry[1]}</li>
			{/each}
		{/key}
	{/if}
</ul>
