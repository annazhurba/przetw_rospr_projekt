<script>
    import { bind } from "svelte/internal";

    //import App from "./App.svelte";
    export let bondzio;
    export let callback;  // todoS
    export let roomName;
    export let roomPassword;
    export let nickname;
    export let isDrawingPlayer = false;
    var state = 0; //0 - initial elements show; 1 - log in elements show; 2- create room elements show

    function handleHost(){
        //create new room implementation
        state = 2;
        document.getElementById("loginButton").style.display = "none";
        document.getElementById("createButton").style.display = "none";
        document.getElementById("logoImg").style.display = "none";
        document.getElementById("roomDetailsDiv").style.display = "block";
        document.getElementById("joinFormButton").style.display = "none";
    }
    function handleJoin(){
        state = 1;
        document.getElementById("loginButton").style.display = "none";
        document.getElementById("createButton").style.display = "none";
        document.getElementById("logoImg").style.display = "none";
        document.getElementById("roomDetailsDiv").style.display = "block";
        document.getElementById("createFormButton").style.display = "none";
    }

    function handleSubmitJoinForm(){
        isDrawingPlayer = false;
        bondzio.eat({
            roomName: document.getElementById("roomName").value,
            password: document.getElementById("roomPassword").value,
            action: 0 
        }).then(room => {
            bondzio.connect(nickname);
            callback();
        });
    }

    function handleSubmitCreateForm(){
        //create new room
        isDrawingPlayer = true;
        bondzio.eat({
            roomName: document.getElementById("roomName").value,
            password: document.getElementById("roomPassword").value,
            action: 1 
        }).then(room => {
            callback();
        });
    }
</script>
<img src="images/Untitled.svg" alt="Logo" id="logoImg"/>
<div id="buttons">
    <button type="button" class="startButtons" id="loginButton" on:click={() => handleJoin()}>Join existing room</button>
    <button type="button" class="startButtons" id="createButton" on:click={() => handleHost()}>Create new room</button>
</div>

<div id="roomDetailsDiv" style="display:none">
    <p>Enter the room name</p>
    <input type="text" placeholder="Room name" id="roomName" bind:value={roomName}/>
    <p>Enter the password</p>
    <input type="password" placeholder="Password" id="roomPassword" bind:value={roomPassword}/>
    <p>Enter your nickname</p>
    <input type="text" placeholder="Nickname" id="playerNickname" bind:value={nickname}/>
    <p><input type="button" value="Join" id="joinFormButton" on:click={() => handleSubmitJoinForm()}/></p>
    <p><input type="button" value="Create" id="createFormButton" on:click={() => handleSubmitCreateForm()}/></p>
</div>

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
    #roomDetailsDiv {
        align-items: center;
		max-width: 300px;
		margin: 0 auto;
    }
    #joinFormButton {
        margin-left: 30%;
    }
    #createFormButton {
        margin-left: 30%;
    }
</style>