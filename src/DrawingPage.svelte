<script>
    import { onMount } from "svelte";
    import { handleCommand } from './commandParser'

    export let bondzio;
    export let roomName;
    export let roomPassword;
    export let nickname;
    export let category;
    export let isDrawing;
    export let word;
    export let winnerNickname;

    let mouseOffFlag = true

    const commandsDictionary = {
        alert: (arg) => alert(arg),
        guess: (arg) => {
            console.log(`Guessing: ${arg}`)
            bondzio.guess(arg)
        }
    }

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
            color: '#000000',
            strokeSize: 2
        };

        function resize() {
            ctx.canvas.width = window.innerWidth*0.7;
            ctx.canvas.height = window.innerHeight*0.8;
        }

        function reposition(event) {
            let newX = event.clientX - canvas.offsetLeft
            let newY = event.clientY - canvas.offsetTop
            if(!mouseOffFlag) {
                coord.prevX = coord.x
                coord.prevY = coord.y
            } else {
                coord.prevX = newX
                coord.prevY = newY
                mouseOffFlag = false;
            }
            coord.x = newX;
            coord.y = newY;
            bondzio.sendDraw(coord);
        }

        function start(event){
            document.addEventListener('mousemove', draw);
            reposition(event);
        }
        function stop(){
            document.removeEventListener('mousemove', draw);
            mouseOffFlag = true;
        }

        function draw(event){
            reposition(event);
            renderDraw();
        }

        function renderDraw(){
            ctx.beginPath();
            ctx.lineCap = 'round';
            ctx.strokeStyle = coord.color;
            ctx.lineWidth = coord.strokeSize;
            ctx.moveTo(coord.prevX, coord.prevY);
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
                coord.color = '#FFFFFF'
                coord.strokeSize = 15
            } else {
                eraseButtonName = "Erase";
                coord.color = '#000000'
                coord.strokeSize = 2
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
            coord = arg;
            renderDraw();
        },
        onConnect: (arg) => console.log(arg),
        onNewWord: (arg) => (word = arg),
        onChatMessage: (arg) => {
		messages.push(arg)
		messages = messages
		}, 
        onRoomConfirm: (arg) => console.log(arg),
        onCorrectGuess: () => (isDrawing = true, isDrawingPlayer = true, winnerNickname = nickname),
        onOpponentGuess:(arg) => (isDrawing = false, isDrawingPlayer = false, winnerNickname = arg),
        }

	bondzio.socketSetup(callbacks)

	const handleSend = () => {
        let input = document.getElementById("input").value;
        let commandsRes = handleCommand(commandsDictionary, input)
        if(commandsRes == null) {
            bondzio.sendMessage(input);
            messages.push({nickname: "Me", content: input});
	        messages = messages;
        }
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
        </div>
        <div id="sendMessageDiv">
            <input id="input"/>
            <button id="sendMessageButton" on:click={handleSend}> Send </button>
        </div>
    </div>
    <p style="display:none;" id="guessingText">Nickname is drawing!</p>
    <div style="display:none;" id="hintText">
        <button id="clearButton" on:click={clearCanvas}> Clear </button>
        <button id="eraseButton" on:click={handleErase}> {eraseButtonName} </button>
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

    #input{
        width:20vw;
        float: left;
    }

    #sendMessageButton{
        float: right;
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
