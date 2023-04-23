<script>
    export let callback;
    export let category;
    function peopleButtonClick(){
        category = "people";
        callback();
    }
</script>
<div id="categoryForm">
    <p id="chooseCategoryText">Choose a category:</p>
    <input type="button" value="People" on:click={peopleButtonClick}/>
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

