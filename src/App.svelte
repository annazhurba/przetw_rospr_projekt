<script>
	import Bondzio from "bondz.io/lib";
	import Buttons from "./Buttons.svelte";
    import DrawingPage from "./DrawingPage.svelte";
    import ChooseCategoryDialog from "./ChooseCategoryDialog.svelte";
	import ChooseCategoryDialog1 from "./ChooseCategoryDialog1.svelte";
	import ChooseCategoryDialog2 from "./ChooseCategoryDialog2.svelte";
	import ChooseCategoryDialog3 from "./ChooseCategoryDialog3.svelte";
	import ChooseCategoryDialog4 from "./ChooseCategoryDialog4.svelte";
	let bondzio = new Bondzio();
	var state = 0;
	var homePageVisible = true;
	var categoryDialogVisible = false;
	var dpVisible = false;
    var roomName;
	var roomPassword;
	var nickname;
	var category;
	var isDrawing;
	var isFirstRound = "true";
	var winnerNickname;
	var exitGame = "false";
	var gamesPlayed = 0;
	let maxGamesPlayed = 5;
	var isEnd = false;
	var score = 0;
	let unique ={};

	const changeState = () => {
		unique ={};
		console.log("homepageVisible");
		console.log(homePageVisible);
		console.log("dpVisible");
		console.log(dpVisible);
		console.log("categoryDVisible");
		console.log(categoryDialogVisible);
		if (gamesPlayed >= maxGamesPlayed){
			isEnd = true;
		}
		if ((state == 0 || state == 3) && exitGame === "false"){
			state = 1, homePageVisible = false, dpVisible = false, categoryDialogVisible = true, console.log("state" + state)  // after room creation showing the form for choosing category
		} else if (state == 1 && exitGame === "false"){
			state = 2, homePageVisible = false, dpVisible = true, categoryDialogVisible = false, console.log("state" + state) // after choosing category showing drawing player's drawing page
		} else if (state == 2 && exitGame === "false"){ // if guessing player didn't guess then show 
			state = 1,  console.log("state" + state), gamesPlayed += 1, category =null, homePageVisible = false, dpVisible = false, categoryDialogVisible = true
		} else if (state == 2 && exitGame === "true"){
			state = 3, homePageVisible = true, dpVisible = false, categoryDialogVisible = false, exitGame = false
		}
	};
</script>

{#if homePageVisible}
	<main>
		<h1>Draw, I Guess</h1>
	</main>
	<Buttons bind:bondzio={bondzio} callback={changeState} bind:roomName={roomName} bind:roomPassword={roomPassword} bind:nickname={nickname} bind:isDrawing={isDrawing}/>
{:else if categoryDialogVisible}
	{#key unique}
		<ChooseCategoryDialog callback={changeState} bind:category={category} isDrawing={isDrawing} isFirstRound={isFirstRound} winnerNickname={winnerNickname} isEnd={isEnd} bind:exitGame={exitGame}/>
	{/key}
{:else if dpVisible}
	<DrawingPage bind:bondzio={bondzio} nickname={nickname} category={category} bind:isDrawing={isDrawing} bind:winnerNickname={winnerNickname} bind:exitGame={exitGame} callback={changeState} bind:isFirstRound={isFirstRound} bind:score={score}/>
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