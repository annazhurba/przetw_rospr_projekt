<script>
    export let bondzio;
    var isDrawingPlayer = true; //0 - guessing player, 1 - drawing player
    var isErasing = false;
    var eraseButtonName = "Erase";
    function loadDrawingPage(){
        if (isDrawingPlayer){ //TODO where do we know if the player is g or d from???
            document.getElementById("hintText").style.display = "block";
            document.getElementById("guessingText").style.display = "none";
        } else {
            document.getElementById("guessingText").style.display = "block";
            document.getElementById("hintText").style.display = "none";
        }
    }

    //handling canvas

        var canvas; 
        var ctx;
        let coord = { x: 0, y: 0 };

        function resize() {
            ctx.canvas.width = window.innerWidth*0.7;
            ctx.canvas.height = window.innerHeight*0.8;
        }

        function reposition(event) {
            coord.x = event.clientX - canvas.offsetLeft;
            coord.y = event.clientY - canvas.offsetTop;
            bondzio.sendDraw(coord.x, coord.y);
        }

        function start(event){
            document.addEventListener('mousemove', draw);
            reposition(event);
        }
        function stop(){
            document.removeEventListener('mousemove', draw);
        }

        function draw(event){
            ctx.beginPath();
            ctx.lineCap = 'round';
            if (!isErasing){
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#000000';
            } else {
                ctx.lineWidth = 15;
                ctx.strokeStyle = '#FFFFFF';

            }
            ctx.moveTo(coord.x, coord.y);
            reposition(event);
            ctx.lineTo(coord.x, coord.y);
            ctx.stroke();
        }
        addEventListener("DOMContentLoaded", (event) => {
            bondzio.eat({
                roomName: document.getElementById("roomName").value,
                password: document.getElementById("password").value,
                action: 0 
            }).then(room => {
                console.log(room); 
            });
            loadDrawingPage();
            canvas = document.getElementById("canvas");
            ctx = canvas.getContext('2d');
            resize();
        })
        if (isDrawingPlayer){
            document.addEventListener('mousedown', start);
            document.addEventListener('mouseup', stop);
        }
        window.addEventListener('resize', resize);
        function clearCanvas(){
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
        function handleErase(){
            isErasing = !isErasing;
            if (isErasing){
                eraseButtonName = "Draw";
            } else {
                eraseButtonName = "Erase";
            }
        }

    //chat
    //import Bondzio from "bondz.io/lib";


	var messages = [{nickname: "Test", content: "Some stuff"},
	{nickname: "Another", content: "Cool story"}];
	//let bondzio = new Bondzio();
	bondzio.eat({
	roomName: "test",
	password: '1234',
	action: 0 
	})
        bondzio.connect("Testowy")

        let callbacks = {
        onDraw: (arg) => console.log(arg),
        onConnect: (arg) => console.log(arg),
        onNewWord: (arg) => console.log(arg),
        onChatMessage: (arg) => {
		messages.push(arg)
		messages = messages
		}, 
        onRoomConfirm: (arg) => console.log(arg),
        onCorrectGuess: () => console.log("Guessed correctly"),
        onOpponentGuess:(arg) => console.log(arg)
        }

	bondzio.socketSetup(callbacks)

	const handleSend = () => {
            let input = document.getElementById("input").value;
	    bondzio.sendMessage(input);
	    messages.push({nickname: "Me", content: input});
	    messages = messages;
            document.getElementById("input").value = "";
	}

</script>

<body height="100%">
    <canvas id="canvas" style="border:3px solid #ff3e00;"/>
    <div id="chatDiv">
        <div id="Messages">
            {#each messages as message}
                <div class="message">
                <h2>{message.nickname}</h2>
                <p>{message.content}</p>
                </div>
            {/each}
            <input id="input"/>
            <button on:click={handleSend}> Send </button>
        </div>
    </div>
    <p style="display:none;" id="guessingText">Nickname is drawing!</p>
    <div style="display:none;" id="hintText">
        <button id="clearButton" on:click={() => clearCanvas()}>Clear</button>
        <button id="eraseButton" on:click={() => handleErase()}>{eraseButtonName}</button>
        <p id="drawingText">You draw!</p>
        <p id="drawingHeader">THING</p>
    </div>
</body>


<style>
    canvas{
        position: absolute;
    }

    #chatDiv{
        float: right;
        border: 1px;
        border-color: black;
        border-style: solid;
        width: 25%;
        height: 100%;
    }
    
    #guessingText{ 
        position: relative;
        top: 85%;
        left: 25%;
        bottom: auto;
        font-size: x-large;
        font-weight: bold;
    }

    #hintText{
        position: relative;
        bottom: 0;
        top:90%;
        left: 0;
        right: auto;
        width:70%;
        height: 10%;
    }

    #drawingText {
        position: relative;
        left: 20%;
        width: 10%;
    }

    #drawingHeader{
        position: relative;
        left: 60%;
        bottom:120%;
        
        width: 10%;
        font-size:xx-large;
        font-weight: bold;
    }
    
    #clearButton{
        float: right;
        position: relative;
        top: -50%;
    }

    #eraseButton{
        float:right;
        position: relative;
        top: 30%;
        right: -6%;
    }

    .message {
	    text-align: center;
	    background: rgba(100, 100, 100, 0.5);
	    padding: 0.5rem;
	    border-radius: 1rem;
    }

    .message:nth-child(2n){
        background: rgba(30, 30, 30, 0.5);
    }
</style>
