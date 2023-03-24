<script>
    import Bondzio from "bondz.io";
    let bondzio = new Bondzio();
    //function handleHost(){
        
    //}
    function handleLogIn(){
        bondzio.eat({
            roomName: "tymektest",
            password: "1234",
            action: 0 
        }).then(room => {
            console.log(room); 
        })
    }
    import HostDialog from "./HostDialog.svelte";
    let showModal = false;
</script>
<img src="images/Untitled.svg" alt="Logo"/>
<div id="buttons">
    <button type="button" class="button" on:click={() => handleLogIn()}>Join existing room</button>
    <button type="button" class="button" on:click={() => (showModal = true)}>Create new room</button>
</div>

<HostDialog bind:showModal>
    <h2 slot="header">Create new room</h2>
</HostDialog>

<style>
    #buttons { 
        align-items: center;
		max-width: 300px;
		margin: 0 auto;
    }
    img {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
</style>