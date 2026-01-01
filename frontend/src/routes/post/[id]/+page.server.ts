import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { api } from '$lib/api.js';

export const load = async ({ params }) => {
	const postId = Number(params.id);

	if (isNaN(postId) || !Number.isInteger(postId)) {
		error(404, 'Post not found');
	}

	const res = await api.posts.getById(postId);

	if (!res.data) {
		error(404, 'Post not found');
	}

	const rawHtml = await marked(res.data.content, { async: true });
	const sanitizedHtml = DOMPurify.sanitize(rawHtml);

	return {
		post: {
			...res.data,
			html: sanitizedHtml
		}
	};
};
