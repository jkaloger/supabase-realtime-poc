<!-- src/routes/profile/+page.svelte -->
<script lang="ts">
	export let data;

	const { user, things } = data;
</script>

<form method="POST" action="?/add_thing">
	<input type="text" name="name" />
	<button>Add Thing :)</button>
</form>

<pre>{JSON.stringify(things, null, 2)}</pre>
<pre>{JSON.stringify(user, null, 2)}</pre>
