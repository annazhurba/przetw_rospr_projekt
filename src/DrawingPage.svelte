<script>
    import ChatFrame from "./ChatFrame.svelte";
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
</script>

<body height="100%">
    <canvas id="canvas" style="border:3px solid #ff3e00;"/>
    <div id="chatDiv">
        <ChatFrame />
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
    }

    #eraseButton{
        float:right;
        position: relative;
        top:50%;
        right: -4%;
    }
</style>
