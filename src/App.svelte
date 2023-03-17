<script>
	import Buttons from "./Buttons.svelte";
	let state = 0;
</script>

<main>
	<h1>Draw, I Guess</h1>
</main>
<Buttons/>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>