<script>
    import { onMount } from "svelte";
    export let callback;
    export let category;
    export let isDrawingPlayer;
    export let isFirstRound;
    export let winnerNickname;

    function loadChooseCategoryDialog(){
        if (isDrawingPlayer && isFirstRound){         //without anything, just picking category
            document.getElementById("forWinner").style.display = "block";
            document.getElementById("forWinnerText").style.display = "none";
            document.getElementById("forLoser").style.display = "none";
            document.getElementById("forFirstRound").style.display = "none";
        } else if (isDrawingPlayer && !isFirstRound){
            document.getElementById("forWinner").style.display = "block";
            document.getElementById("forWinnerText").style.display = "block";
            document.getElementById("forLoser").style.display = "none";
            document.getElementById("forFirstRound").style.display = "none";
        } else if (!isDrawingPlayer && isFirstRound){
            document.getElementById("forWinner").style.display = "none";
            document.getElementById("forWinnerText").style.display = "none";
            document.getElementById("forLoser").style.display = "none";
            document.getElementById("forFirstRound").style.display = "block";
        } else {
            document.getElementById("forWinner").style.display = "none";
            document.getElementById("forWinnerText").style.display = "none";
            document.getElementById("forLoser").style.display = "block";
            document.getElementById("forFirstRound").style.display = "none";
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
<div id="categoryForm">
    <div id="forWinner">
        <p id="forWinnerText">You guessed correctly! Now you draw!</p>
        <p id="chooseCategoryText">Choose a category:</p>
        <button on:click={peopleButtonClick} class="categoryButtons">People</button>
        <button on:click={fruitsButtonClick} class="categoryButtons">Fruits</button>
        <button on:click={musicButtonClick} class="categoryButtons">Music</button>
    </div>
    <div id="forLoser">
        <p id="forLoserText">{winnerNickname} guessed the word this time! You can play again. </p>
        <button on:click={joinGame} id="forLoserButton" class="nonCategoryButtons">Play</button>
    </div>
    <div id="forFirstRound">
        <p id="forFirstRoundText">You guess the word!</p>
        <button on:click={joinGame} id="forFirstRoundButton" class="nonCategoryButtons">Play</button>
    </div>
</div>

<style>
    #categoryForm{
        position: absolute;
        top:40vh;
        left: 30vw;
    }
    #chooseCategoryText{
        font-size: large;
    }
    .categoryButtons{
        margin-left: 1%;
        margin-right: 1%;
    }
    p{
        text-align: center;
    }
    .nonCategoryButtons{
        margin-left: 50%;
        margin-right: auto;
    }

</style>

