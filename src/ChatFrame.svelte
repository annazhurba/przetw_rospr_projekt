<script>
    import Bondzio from "bondz.io/lib";


	var messages = [{nickname: "Test", content: "Some stuff"},
	{nickname: "Another", content: "Cool story"}];
	let bondzio = new Bondzio();
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
	}

</script>

<div id="Messages">
	{#each messages as message}
		<div class="message">
		<h2>{message.nickname}</h2>
		<p>{message.content}</p>
		</div>
	{/each}
	<input id="input"/>
        <button on:click={handleSend}> </button>
</div>

<style>
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
