import { redirect } from "@sveltejs/kit";

export async function load({ parent }) {
	const { supabase, session } = await parent();
	if (!session) {
		throw redirect(303, '/')
	}

	const { data: things } = await supabase.from('things').select('*');

	return {
		user: session.user,
		things
	}
}
