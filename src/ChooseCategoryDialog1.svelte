<script>
    import { onMount } from "svelte";
    export let callback;
    export let category;
    export let isDrawing;
    export let isFirstRound;
    export let winnerNickname;
    export let isEnd;
    export var exitGame;

    function loadChooseCategoryDialog(){
        if (isEnd){
            exitGame = "true";
            document.getElementById("endGame1").style.display = "block";
            document.getElementById("forWinner1").style.display = "none";
            document.getElementById("forWinnerText1").style.display = "none";
            document.getElementById("forLoser1").style.display = "none";
            document.getElementById("forFirstRound1").style.display = "none";
        }
        else if (isDrawing === "true" && isFirstRound === "true"){         //without anything, just picking category
            document.getElementById("forWinner1").style.display = "block";
            document.getElementById("forWinnerText1").style.display = "none";
            document.getElementById("forLoser1").style.display = "none";
            document.getElementById("forFirstRound1").style.display = "none";
            document.getElementById("endGame1").style.display = "none";
        } else if (isDrawing === "true" && isFirstRound === "false"){
            document.getElementById("forWinner1").style.display = "block";
            document.getElementById("forWinnerText1").style.display = "block";
            document.getElementById("forLoser1").style.display = "none";
            document.getElementById("forFirstRound1").style.display = "none";
            document.getElementById("endGame1").style.display = "none";
        } else if (isDrawing === "false" && isFirstRound === "true"){
            document.getElementById("forWinner1").style.display = "none";
            document.getElementById("forWinnerText1").style.display = "none";
            document.getElementById("forLoser1").style.display = "none";
            document.getElementById("forFirstRound1").style.display = "block";
            document.getElementById("endGame1").style.display = "none";
        } else {
            document.getElementById("forWinner1").style.display = "none";
            document.getElementById("forWinnerText1").style.display = "none";
            document.getElementById("forLoser1").style.display = "block";
            document.getElementById("forFirstRound1").style.display = "none";
            document.getElementById("endGame1").style.display = "none";
        }
    }
    function joinGame(){
        callback();
    }
    //export let nickname;
    function peopleButtonClick(){
        category = "people";
        callback();
    }
    function fruitsButtonClick(){
        category = "fruits";
        callback();
    }
    function musicButtonClick(){
        category = "music";
        callback();
    }

    onMount(async () => {
        loadChooseCategoryDialog();
    });

</script>
<div id="categoryForm1">
    <div id="forWinner1">
        <p id="forWinnerText1">You guessed correctly! Now you draw!</p>
        <p id="chooseCategoryText1">Choose a category:</p>
        <button on:click={peopleButtonClick} class="categoryButtons1">People</button>
        <button on:click={fruitsButtonClick} class="categoryButtons1">Fruits</button>
        <button on:click={musicButtonClick} class="categoryButtons1">Music</button>
    </div>
    <div id="forLoser1">
        <p id="forLoserText1">{winnerNickname} guessed the word this time! You can play again. </p>
        <button on:click={joinGame} id="forLoserButton1" class="nonCategoryButtons1">Play</button>
    </div>
    <div id="forFirstRound1">
        <p id="forFirstRoundText1">You guess the word!</p>
        <button on:click={joinGame} id="forFirstRoundButton1" class="nonCategoryButtons1">Play</button>
    </div>
    <div id="endGame1">
        <p id="endGameText1">The end! Your score: </p>
        <button on:click={joinGame} id="endGameButtont1" class="nonCategoryButtons1">Play</button>
    </div>
</div>

<style>
    #categoryForm1{
        position: absolute;
        top:40vh;
        left: 30vw;
    }
    #chooseCategoryText1{
        font-size: large;
    }
    .categoryButtons1{
        margin-left: 1%;
        margin-right: 1%;
    }
    p{
        text-align: center;
    }
    .nonCategoryButtons1{
        margin-left: 50%;
        margin-right: auto;
    }

</style>

