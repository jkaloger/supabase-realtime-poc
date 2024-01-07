<!-- src/routes/profile/+page.svelte -->

<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { RealtimePostgresInsertPayload } from '@supabase/supabase-js';
	import type { Database } from '../../DatabaseDefinitions.js';

	export let data;
	let { user, supabase } = data;

	$: things = data.things;

	// Listen to inserts
	$: supabase
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

<h1>Things</h1>
<div>
	{#if things}
		{#each things as thing}
			<Card.Root>
				<Card.Header>
					<Card.Title>{thing.name}</Card.Title>
					<Card.Description>Card Description</Card.Description>
				</Card.Header>
				<Card.Content>
					<p>Card Content</p>
				</Card.Content>
				<Card.Footer>
					<p>Card Footer</p>
				</Card.Footer>
			</Card.Root>
		{/each}
	{/if}
</div>
<pre>{JSON.stringify(user, null, 2)}</pre>
