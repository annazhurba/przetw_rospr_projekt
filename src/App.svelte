<script>
	import Buttons from "./Buttons.svelte";
	import Bondzio from "bondz.io/lib";
	let bondzio = new Bondzio();
	let state = 0;
	const changeState = () => {state = 2};
</script>

<main>
	<h1>Draw, I Guess</h1>
</main>
<Buttons bondzio={bondzio} callback={changeState}/>

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