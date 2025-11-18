// /routes/+page.ts
import type { PageLoad } from './$types';

// 這是 Markdown frontmatter 的型別
interface PostMetadata {
	title: string;
	date: string;
	excerpt: string;
}

// 這是我們傳給 +page.svelte 的最終 Post 型別
export interface Post {
	metadata: PostMetadata;
	slug: string; // 這是 URL 用的
}

export const load: PageLoad = async () => {
	// 1. 使用 Vite 的 import.meta.glob 功能，
	//    動態且立即('eager: true')匯入所有 /lib/posts/ 下的 .md 檔案
	const postFiles = import.meta.glob<true, string, { metadata: PostMetadata }>(
		'/src/lib/posts/*.md',
		{ eager: true }
	);

	// 2. 遍歷匯入的檔案模組
	const posts: Post[] = Object.entries(postFiles)
		.map(([path, module]) => {
			// 從檔案路徑解析 slug
			// e.g., /src/lib/posts/my-first-post.md -> my-first-post
			const slug = path.split('/').pop()?.replace('.md', '') ?? '';

			return {
				metadata: module.metadata, // 這是 .md 檔案中的 frontmatter
				slug: slug
			};
		})
		.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
	return {
		posts: posts
	};
};