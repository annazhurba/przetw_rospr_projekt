<script>
    export let callback;
    export let category;
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
</script>
<div id="categoryForm">
    <p id="chooseCategoryText">Choose a category:</p>
    <input type="button" value="People" on:click={peopleButtonClick}/>
    <input type="button" value="Fruits" on:click={fruitsButtonClick}/>
    <input type="button" value="Music" on:click={musicButtonClick}/>
</div>

<style>
    #categoryForm{
        position: absolute;
        top:40vh;
        left: 40vw;
    }
    #chooseCategoryText{
        font-size: large;
    }
</style>

