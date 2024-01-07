<!-- src/routes/profile/+page.svelte -->
<script lang="ts">
	import type { RealtimePostgresInsertPayload } from '@supabase/supabase-js';
	import type { Database } from '../../DatabaseDefinitions.js';

	let { data } = $props();
	let { things: initial_things, user, supabase } = data;

	let things = $state(initial_things);

	// Listen to inserts
	supabase
		.channel('thing')
		.on(
			'postgres_changes',
			{ event: 'INSERT', schema: 'public', table: 'thing' },
			(payload: RealtimePostgresInsertPayload<Database['public']['Tables']['thing']['Row']>) =>
				things?.push(payload.new)
		)
		.subscribe();
</script>

<form method="POST" action="?/add_thing">
	<input type="text" name="name" />
	<button>Add Thing :)</button>
</form>

<pre>{JSON.stringify(things, null, 2)}</pre>
<pre>{JSON.stringify(user, null, 2)}</pre>
