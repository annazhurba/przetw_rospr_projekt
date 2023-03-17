<script>
    export let showModal;
    let dialog;

    $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog 
    bind:this={dialog} 
    on:close={()=>(showModal = false)} 
    on:click|self={() => dialog.close()}>
    <div on:click|stopPropagation>
        <slot name="header"/>
        <hr/>
        <!-- svelte-ignore a11y-autofocus -->
        <button autofocus on:click={() => dialog.close()}>Cancel</button>
        <!-- svelte-ignore a11y-autofocus -->
        <button autofocus>Create</button>
    </div>
</dialog>