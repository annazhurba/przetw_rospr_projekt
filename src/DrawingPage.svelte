<script>
    import { onMount } from "svelte";
    import { handleCommand } from './commandParser'

    export let bondzio;
    export let roomName;
    export let roomPassword;
    export let nickname;
    export let category;
    export var isDrawingPlayer;
    export let winnerNickname;
    export let exitGame;
    export let callback;
    export let isFirstRound;
    let word;

    let mouseOffFlag = true

    const commandsDictionary = {
        alert: (arg) => alert(arg),
        guess: (arg) => {
            console.log(`Guessing: ${arg}`)
            bondzio.guess(arg)
        }
    }

    var isErasing = false;
    var eraseButtonName = "Erase";
    function loadDrawingPage(){
        if (isDrawingPlayer){ 
            document.getElementById("hintText").style.display = "block";
            document.getElementById("guessingText").style.display = "none";
            document.getElementById("sendMessageButton").style.display = "none";
            document.getElementById("input").style.display = "none";
            document.addEventListener('mousedown', start);
            document.addEventListener('mouseup', stop);

        } else {
            document.getElementById("guessingText").style.display = "block";
            document.getElementById("hintText").style.display = "none";
            document.getElementById("sendMessageButton").style.display = "block";
            document.getElementById("input").style.display = "block";
            document.removeEventListener('mousedown', start);
            document.removeEventListener('mouseup', stop);
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
            if(isDrawingPlayer) bondzio.sendDraw(coord);
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
            }
            loadDrawingPage();
            canvas = document.getElementById("canvas");
            ctx = canvas.getContext('2d');
            resize();
            let scrollbox = document.getElementById("Messages");
            scrollbox.scrollTop = scrollbox.scrollHeight
        });
        
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

	var messages = [];
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
        onNewWord: (arg) => console.log("new word"),
        onChatMessage: (arg) => {
		messages.push(arg)
		messages = messages
		}, 
        onRoomConfirm: (arg) => console.log(arg),
        onCorrectGuess: () => {
            isDrawingPlayer = true
            winnerNickname = nickname
            isFirstRound = false
            callback()
        },
        onOpponentGuess: (arg) => {
            isDrawingPlayer = false
            winnerNickname = arg
            isFirstRound = false
            callback()
        },
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

    function exitGameButton(){
        exitGame = true;
        callback();
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
    <button id="exitGameButton" on:click={exitGameButton}>Exit game</button>
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
        height: 85vh;
    }
    
    #guessingText{ 
        position: relative;
        top: 80vh;
        left: 25vw;
        bottom: auto;
        font-size: x-large;
        font-weight: bold;
        width: 40vw;
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
    
    #exitGameButton{
        position: absolute;
        left: 5vw;
        bottom: 1vh;
        background-color: #ff3e00;
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
