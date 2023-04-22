<script>
	import Bondzio from "bondz.io/lib";
	import Buttons from "./Buttons.svelte";
    import DrawingPage from "./DrawingPage.svelte";
	let bondzio = new Bondzio();
	var state = 0;
	var homePageVisible = true;
	var dpVisible = false;
    var roomName;
	var roomPassword;
	const changeState = () => {state = 1, homePageVisible = false, dpVisible = true};
	
</script>

{#if homePageVisible}
	<main>
		<h1>Draw, I Guess</h1>
	</main>
	<Buttons bondzio={bondzio} callback={changeState} bind:roomName={roomName} bind:roomPassword={roomPassword}/>
{/if}
{#if dpVisible}
	<DrawingPage bondzio={bondzio} roomName={roomName} roomPassword={roomPassword}/>
{/if}

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