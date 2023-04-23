<script>
	import Bondzio from "bondz.io/lib";
	import Buttons from "./Buttons.svelte";
    import DrawingPage from "./DrawingPage.svelte";
    import ChooseCategoryDialog from "./ChooseCategoryDialog.svelte";
	let bondzio = new Bondzio();
	var state = 0;
	var homePageVisible = true;
	var categoryDialogVisible = false;
	var dpVisible = false;
    var roomName;
	var roomPassword;
	var nickname;
	var category;
	const changeState = () => {
		if (state == 0){
			state = 1, homePageVisible = false, dpVisible = false, categoryDialogVisible = true
		} else if (state == 1){
			state = 2, homePageVisible = false, dpVisible = true, categoryDialogVisible = false,console.log("category " + category)
		}
	};
	
</script>

{#if homePageVisible}
	<main>
		<h1>Draw, I Guess</h1>
	</main>
	<Buttons bondzio={bondzio} callback={changeState} bind:roomName={roomName} bind:roomPassword={roomPassword} bind:nickname={nickname}/>
{/if}
{#if categoryDialogVisible}
	<ChooseCategoryDialog callback={changeState} bind:category={category}/>
{/if}
{#if dpVisible}
	<DrawingPage bondzio={bondzio} roomName={roomName} roomPassword={roomPassword} nickname={nickname} category={category}/>
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