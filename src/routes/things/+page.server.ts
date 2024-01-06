import type { Action, ServerLoad } from '@sveltejs/kit'
import type { RequestEvent } from './$types';

export const load: ServerLoad = async ({ locals: { getSession, supabase } }) => {
	const data = await supabase.from('thing').select('*')
	const session = await getSession();

	return {
		user: session?.user,
		things: data.data
	}
}

export const actions = {
	add_thing: async ({ request, locals: { supabase, getSession } }: RequestEvent) => {
		const data = await request.formData();
		const user = await getSession();

		const name = data.get('name');
		const result = await supabase.from('thing').insert({ name: name, created_by: user?.user.email ?? '' })
		console.log({ result })

		return { success: true };
	}
}
