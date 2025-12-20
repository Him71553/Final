import { api } from '$lib/api';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const jwtToken = cookies.get('token');

	if (!jwtToken) {
		return {
			message: 'User not logged in',
			data: null
		};
	}

	return api.user.me();
};
