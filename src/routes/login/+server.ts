import { VERCEL_URL } from '$env/static/private';
import { redirect, type ServerLoad } from '@sveltejs/kit';

export const GET: ServerLoad = async ({ locals: { supabase } }) => {
	console.log(`${VERCEL_URL}/auth/callback`);
	const result = await supabase.auth.signInWithOAuth({
		provider: 'github',
		options: {
			redirectTo: `${VERCEL_URL}/auth/callback`
		}
	});

	console.log({ result });

	// todo: sensible redirect fallback
	redirect(301, result.data.url ?? '/');
};
