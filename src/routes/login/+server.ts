import { redirect, type ServerLoad } from '@sveltejs/kit';

export const GET: ServerLoad = async ({ locals: { supabase } }) => {
	const result = await supabase.auth.signInWithOAuth({
		provider: 'github',
		options: {
			redirectTo: 'http://localhost:5173/auth/callback'
		}
	});

	console.log({ result });

	// todo: sensible redirect fallback
	redirect(301, result.data.url ?? '/');
};
