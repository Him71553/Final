import { api } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const userId = Number(params.id);

	if (isNaN(userId)) {
		throw error(400, '無效的使用者 ID');
	}

	try {
		// 並行獲取使用者資訊與該使用者的文章列表
		const [userRes, postsRes] = await Promise.all([
			api.user.getUser(userId),
			api.user.getUserPosts(userId)
		]);

		return {
			profile: userRes.data,
			posts: postsRes.data
		};
	} catch (err) {
		console.error(err);
		throw error(404, '找不到該使用者或連線失敗');
	}
};