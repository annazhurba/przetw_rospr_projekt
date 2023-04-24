<script>
    import { onMount } from "svelte";

    export let bondzio;
    export let roomName;
    export let roomPassword;
    export let nickname;
    export let category;
    export let isDrawing;
    var word ="ng";
    var isDrawingPlayer = isDrawing; //0 - guessing player, 1 - drawing player
    var isErasing = false;
    var eraseButtonName = "Erase";
    function loadDrawingPage(){
        if (isDrawingPlayer){ //TODO where do we know if the player is g or d from???
            document.getElementById("hintText").style.display = "block";
            document.getElementById("guessingText").style.display = "none";
            document.getElementById("sendMessageButton").style.display = "none";
            document.getElementById("input").style.display = "none";
        } else {
            document.getElementById("guessingText").style.display = "block";
            document.getElementById("hintText").style.display = "none";
            document.getElementById("sendMessageButton").style.display = "block";
            document.getElementById("input").style.display = "block";
        }
    }

    //handling canvas

        var canvas; 
        var ctx;
        let coord = { 
            prevX: 0,
            prevY: 0,
            x: 0, 
            y: 0,
        };

        function resize() {
            ctx.canvas.width = window.innerWidth*0.7;
            ctx.canvas.height = window.innerHeight*0.8;
        }

        function reposition(event) {
            coord.prevX = coord.x
            coord.prevY = coord.y
            coord.x = event.clientX - canvas.offsetLeft;
            coord.y = event.clientY - canvas.offsetTop;
            bondzio.sendDraw(coord);
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

        function renderDraw(prevCoords){
            ctx.beginPath();
            ctx.lineCap = 'round';
            if (!isErasing){
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#000000';
            } else {
                ctx.lineWidth = 15;
                ctx.strokeStyle = '#FFFFFF';

            }
            ctx.moveTo(prevCoords.x, prevCoords.y);
            ctx.lineTo(coord.x, coord.y);
            ctx.stroke();
        }
    
        onMount(async () => {
            bondzio.eat({
                roomName: roomName,
                password: roomPassword,
                action: 0 
            }).then(room => {
                console.log(room); 
            });
            if (isDrawingPlayer == true){
                word = bondzio.getNewWord(category);
                //console.log(word);
            }
            loadDrawingPage();
            canvas = document.getElementById("canvas");
            ctx = canvas.getContext('2d');
            resize();
            let scrollbox = document.getElementById("Messages");
            scrollbox.scrollTop = scrollbox.scrollHeight
        });
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


	var messages = [];
	//let bondzio = new Bondzio();
	bondzio.eat({
	roomName: roomName,
	password: roomPassword,
	action: 0 
	})
        bondzio.connect(nickname)

        let callbacks = {
        onDraw: (arg) => {
            let prevCoords = coord;
            coord = arg;
            renderDraw(prevCoords);
        },
        onConnect: (arg) => console.log(arg),
        onNewWord: (arg) => (word = arg),
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
        bondzio.guess(input);
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
            <button id="sendMessageButton" on:click={handleSend}> Send </button>
        </div>
    </div>
    <p style="display:none;" id="guessingText">Nickname is drawing!</p>
    <div style="display:none;" id="hintText">
        <button id="clearButton" on:click={() => clearCanvas()}>Clear</button>
        <button id="eraseButton" on:click={() => handleErase()}>{eraseButtonName}</button>
        <p id="drawingText">You draw!</p>
        <p id="drawingHeader">{word}</p>
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
        width: 25vw;
        height: 90vh;
    }
    
    #guessingText{ 
        position: relative;
        top: 80vh;
        left: 15vw;
        bottom: auto;
        font-size: x-large;
        font-weight: bold;
    }

    #hintText{
        position:absolute;
        bottom: 0;
        top:85vh;
        left: 0;
        right: auto;
        width:70vw;
        height: 10vh;
    }

    #drawingText {
        position: relative;
        left: 20vw;
        width: 10vw;
    }

    #drawingHeader{
        position: relative;
        left: 30vw;
        bottom:12vh;
        width: 30vw;
        font-size:xx-large;
        font-weight: bold;
    }
    
    #clearButton{
        float: right;
        background-color: lightgray;
    }

    #eraseButton{
        float:right;
        margin-right: 1%;
        background-color: lightgray;
    }

    #Messages{
        scroll-behavior: smooth;
        overflow-y: scroll;
        border: 0.1rem solid black;
        height:100%;
    }

    #sendMessageButton{
        position: relative;
        bottom: 0;
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
