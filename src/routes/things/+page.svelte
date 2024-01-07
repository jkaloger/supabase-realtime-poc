<!-- src/routes/profile/+page.svelte -->

<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
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

<div class="sticky flex h-16 items-center justify-center gap-2 bg-slate-500 px-4">
	<img src={user?.user_metadata?.avatar_url} alt="profile pic" class="h-8 w-8 rounded-full" />
	<div class="self-center">
		<h1 class="text-sm text-white">{user?.email}</h1>
	</div>
	<div class="grow" />
	<form method="POST" action="?/add_thing">
		<div class="mx-auto my-4 flex gap-2">
			<Input type="text" placeholder="Thing Name" name="name" />
			<Button>Add Thing :)</Button>
		</div>
	</form>
</div>

<div class="m-4 grid grid-cols-2 gap-4">
	<div class="flex flex-col gap-2">
		{#if things}
			{#each things as thing}
				<Card.Root>
					<Card.Header>
						<Card.Title>{thing.name}</Card.Title>
						<Card.Description><Badge>{thing.created_by}</Badge></Card.Description>
					</Card.Header>
				</Card.Root>
			{/each}
		{/if}
	</div>
</div>
