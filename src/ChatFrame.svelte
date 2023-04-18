<script>
    import Bondzio from "bondz.io/lib";


	var messages = [{author: "Test", content: "Some stuff"},
	{author: "Another", content: "Cool story"}];
	let bondzio = new Bondzio();
	bondzio.eat({
	roomName: "test",
	password: '1234',
	action: 0 
	})
        bondzio.connect("Testowy")

</script>

<div id="Messages">
	{#each messages as message}
		<div class="message">
		<h2>{message.author}</h2>
		<p>{message.content}</p>
		</div>
	{/each}
        <button on:click={bondzio.sendMessage("Hej!!!")}> </button>
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
