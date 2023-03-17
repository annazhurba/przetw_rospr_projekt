<script>
    function handleHost(){
        
    }
    import HostDialog from "./HostDialog.svelte";
    let showModal = false;
</script>

<div id="buttons">
    <button type="button" class="button">Join existing room</button>
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
</style>