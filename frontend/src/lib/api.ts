import { PUBLIC_API_URL } from '$env/static/public';

export interface User {
	id: number;
	username: string;
}

interface Post {
	id: number;
	title: string;
	content: string;
	created_at: string;
	owner_id: number;
	username: string;
}

async function send<T>(
	method: string,
	endpoint: string,
	data?: object
): Promise<{ message: string; data: T }> {
	const options: RequestInit = { method, credentials: 'include' };

	if (data) {
		options.headers = { 'Content-Type': 'application/json' };
		options.body = JSON.stringify(data);
	}

	const res = await fetch(`${PUBLIC_API_URL}${endpoint}`, options);

	if (!res.ok) {
		throw new Error(`API request failed with status ${res.status}`);
	}

	return res.json();
}

export const api = {
	auth: {
		register: (data: { username: string; password: string }) =>
			send<void>('POST', '/auth/register', data),
		login: (data: { username: string; password: string }) =>
			send<User>('POST', '/auth/login', data),
		logout: () => send<void>('POST', '/auth/logout')
	},
	user: {
		me: () => send<User>('GET', '/user/me'),
		getMyPosts: () => send<Post[]>('GET', '/user/me/posts'),
		getUser: (id: number) => send<User>('GET', `/user/${id}`),
		getUserPosts: (id: number) => send<Post[]>('GET', `/user/${id}/posts`)
	},
	posts: {
		list: (page: number) =>
			send<Omit<Post, 'content' | 'owner_id'>[]>('GET', `/posts/?page=${page}`),
		getById: (id: number) => send<Post>('GET', `/posts/${id}`),
		create: (data: Pick<Post, 'title' | 'content' | 'owner_id'>) =>
			send<Post>('POST', '/posts', data),
		edit: (id: number, data: Partial<Pick<Post, 'title' | 'content'>>) =>
			send<Post>('PUT', `/posts/${id}`, data),
		delete: (id: number) => send<void>('DELETE', `/posts/${id}`)
	}
};
