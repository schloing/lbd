<script>
	import { beforeNavigate } from "$app/navigation";
	import { NavbarBoardInfo } from "$/stores/navbar";
	import BoardInfo from "$/components/BoardInfo.svelte";
	$NavbarBoardInfo = BoardInfo;
	beforeNavigate(() => {
		console.log("getting rid of that shit");
		// don't draw boardinfo in navbar
		$NavbarBoardInfo = undefined;
	});
</script>
