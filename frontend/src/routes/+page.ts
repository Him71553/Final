import type { PageLoad } from './$types';

export interface Post {
    id: number;
    title: string;
    content: string;
    image_url?: string;
    created_at: string;
    owner_id: number;   
}

export const load: PageLoad = async ({ fetch }) => {
    const API_BASE = 'http://127.0.0.1:8000';

    try {
        const res = await fetch(`${API_BASE}/posts`);

        if (!res.ok) {
            throw new Error(`API 請求失敗: ${res.status} ${res.statusText}`);
        }

        const posts: Post[] = await res.json();
        posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        return {
            posts,
            error: null
        };

    } catch (err) {
        console.error(err);
        return {
            posts: [],
            error: '無法連線至伺服器，請稍後再試。'
        };
    }
};