<script>
	var messages = [{author: "Test", content: "Some stuff"}];

</script>

<div id="Messages">
	{#each messages as message}
		<div id="message">
		<h2>{message.author}</h2>
		<p>{message.content}</p>
		</div>
	{/each}

</div>
