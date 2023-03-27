<script>
    var isDrawing = false; //0 - guessing player, 1 - drawing player
    function loadDrawingPage(){
        if (isDrawing){ //TODO where do we know if the player is g or d from???
            document.getElementById("drawingText").style.display = "block";
            document.getElementById("drawingHeader").style.display = "block";
        } else {
            document.getElementById("guessingText").style.display = "block";
        }
    }
    //handling canvas

        var canvas 
        var ctx
        let coord = { x: 0, y: 0 };

        function resize() {
            ctx.canvas.width = window.innerWidth*0.7;
            ctx.canvas.height = window.innerHeight*0.8;
            alert(`Width: ${ctx.canvas.width}, height: ${ctx.canvas.height}`)
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
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#000000';
            ctx.moveTo(coord.x, coord.y);
            reposition(event);
            ctx.lineTo(coord.x, coord.y);
            ctx.stroke();
        }
        addEventListener("DOMContentLoaded", (event) => {
            canvas = document.getElementById("canvas");
            ctx = canvas.getContext('2d');
            resize();
        })
        document.addEventListener('mousedown', start);
        document.addEventListener('mouseup', stop);
        window.addEventListener('resize', resize);
</script>

<body height="100%">
    <canvas id="canvas" style="border:3px solid #ff3e00;"/>
    <div id="chatDiv">
        <!--chat-->
    </div>
    <p style="display: none;" id="guessingText">Nickname is drawing!</p>
    <div id="hintText">
        <p style="display: block;" id="drawingText">You draw!</p>
        <p style="display: block;" id="drawingHeader">THING</p>
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
        width: 27%;
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
        top: 85%;
        left: 30%;
        bottom: auto;
    }

    #drawingText {
        position: relative;
        top: 30%;
    }

    #drawingHeader{
        position: relative;
        top: 50%;
        right: 0.2%;
        font-size: x-large;
        font-weight: bold;
    }
    

</style>
