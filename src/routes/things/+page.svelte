<!-- src/routes/profile/+page.svelte -->
<script lang="ts">
	let { data } = $props();
	let { things: initial_things, supabase } = data;

	let things = $state(initial_things);

	// Create a function to handle inserts
	const handleInserts = (payload) => {
		things.push(payload.new);
	};

	// Listen to inserts
	supabase
		.channel('thing')
		.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'thing' }, handleInserts)
		.subscribe();
</script>

<form method="POST" action="?/add_thing">
	<input type="text" name="name" />
	<button>Add Thing :)</button>
</form>

<pre>{JSON.stringify(things, null, 2)}</pre>
<pre>{JSON.stringify(user, null, 2)}</pre>
