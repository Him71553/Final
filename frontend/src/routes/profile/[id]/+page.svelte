<script lang="ts">
	import { getContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { resolve } from '$app/paths';
	import { USER_KEY, type UserState } from '$lib/user.svelte';

	let { data } = $props();
	const userState = getContext<UserState>(USER_KEY);

	const isOwnProfile = $derived(userState.isLoggedIn() && userState.current.id === data.profile.id);
</script>

<div class="mx-auto max-w-4xl" in:fade={{ duration: 400 }}>
	<header
		class="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
	>
		<div class="flex flex-col items-center gap-6 sm:flex-row">
			<div
				class="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-4xl font-black text-white shadow-xl shadow-blue-500/20"
			>
				{data.profile.username.substring(0, 1).toUpperCase()}
			</div>
			<div class="flex-1 text-center sm:text-left">
				<h1 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
					{data.profile.username}
				</h1>
				<p class="mt-1 text-slate-500 dark:text-slate-400">
					已發表 {data.posts.length} 篇文章
				</p>
			</div>
			{#if isOwnProfile}
				<button
					class="rounded-xl border border-slate-200 px-6 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
				>
					編輯個人資料
				</button>
			{/if}
		</div>
	</header>

	<div class="space-y-6">
		<div class="flex items-center justify-between">
			<h2 class="text-xl font-bold text-slate-800 dark:text-slate-200">發布的文章</h2>
		</div>

		{#if data.posts.length > 0}
			<div class="grid gap-4">
				{#each data.posts as post, i (post.id)}
					<a
						href={resolve(`/post/${post.id}`)}
						in:fly={{ y: 20, duration: 400, delay: i * 100 }}
						class="group block rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500"
					>
						<div class="flex items-start justify-between">
							<div class="flex-1">
								<h3
									class="text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400"
								>
									{post.title}
								</h3>
								<div class="mt-3 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
									<span class="flex items-center gap-1">
										<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
											/>
										</svg>
										{new Date(post.created_at).toLocaleDateString('zh-TW', {
											year: 'numeric',
											month: 'long',
											day: 'numeric'
										})}
									</span>
								</div>
							</div>
							<div
								class="rounded-full bg-slate-50 p-2 text-slate-400 transition-colors group-hover:bg-blue-50 group-hover:text-blue-500 dark:bg-slate-800 dark:group-hover:bg-blue-900/30"
							>
								<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<div
				class="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 py-20 dark:border-slate-800"
			>
				<div class="rounded-full bg-slate-100 p-4 dark:bg-slate-800">
					<svg
						class="h-8 w-8 text-slate-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
						/>
					</svg>
				</div>
				<p class="mt-4 font-medium text-slate-500 dark:text-slate-400">尚無發布的文章</p>
			</div>
		{/if}
	</div>
</div>