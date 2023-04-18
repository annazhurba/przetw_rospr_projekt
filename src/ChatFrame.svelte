<script>
	var messages = [{author: "Test", content: "Some stuff"},
	{author: "Another", content: "Cool story"}];

</script>

<div id="Messages">
	{#each messages as message}
		<div class="message">
		<h2>{message.author}</h2>
		<p>{message.content}</p>
		</div>
	{/each}

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
