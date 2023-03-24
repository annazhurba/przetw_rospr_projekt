<script>
    import Bondzio from "bondz.io";
    let bondzio = new Bondzio();
    var state = 0; //0 - initial elements show; 1 - log in elements show; 2- create room elements show
    function handleHost(){
        
    }
    function handleJoin(){
        state = 1;
        document.getElementById("loginButton").style.display = "none";
        document.getElementById("createButton").style.display = "none";
        document.getElementById("logoImg").style.display = "none";
        document.getElementById("joinFormDiv").style.display = "block";
    }

    function handleSubmitJoinForm(){
        //redirecting to drawing page or loading page
        bondzio.eat({
            roomName: document.getElementById("roomName").value,
            password: document.getElementById("password").value,
            action: 0 
        }).then(room => {
            console.log(room); 
        });

    }
</script>
<img src="images/Untitled.svg" alt="Logo" id="logoImg"/>
<div id="buttons">
    <button type="button" class="startButtons" id="loginButton" on:click={() => handleJoin()}>Join existing room</button>
    <button type="button" class="startButtons" id="createButton" on:click={() => handleHost()}>Create new room</button>
</div>

<div id="joinFormDiv" style="display:none">
    <p>Enter the room name</p>
    <input type="text" placeholder="Room name" id="roomName"/>
    <p>Enter the password</p>
    <input type="password" placeholder="Password" id="roomPassword"/>
    <p>Enter your nickname</p>
    <input type="text" placeholder="Nickname" id="playerNickname"/>
    <p><input type="button" value="Join" id="joinFormButton" on:click={() => handleSubmitJoinForm()}/></p>
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
    #joinFormDiv {
        align-items: center;
		max-width: 300px;
		margin: 0 auto;
    }
    #joinFormButton {
        margin-left: 30%;
    }
</style>