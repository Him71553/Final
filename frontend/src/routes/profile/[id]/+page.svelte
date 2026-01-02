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

<div class="space-y-8">
	<div class="flex items-center justify-between">
		<h2 class="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-200">發布的文章</h2>
	</div>

	{#if data.posts.length > 0}
		<div class="grid gap-6 md:grid-cols-2 lg:gap-8">
			{#each data.posts as post, i (post.id)}
				<article
					in:fly={{ y: 30, duration: 500, delay: i * 150 }}
					class="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/30"
				>
					<div
						class="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-blue-500/5 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100 dark:bg-blue-400/10"
					></div>

					<div class="relative flex flex-col gap-4">
						<div class="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-blue-600/80 uppercase dark:text-blue-400/80">
							<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							{new Date(post.created_at).toLocaleDateString('zh-TW', {
								year: 'numeric',
								month: 'short',
								day: 'numeric'
							})}
						</div>

						<h3 class="truncate text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
							<a
								href="/post/{post.id}"
								class="before:absolute before:inset-0 focus:outline-none"
								title={post.title}
							>
								<span class="bg-gradient-to-r from-blue-600 to-blue-600 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 group-hover:bg-[length:100%_2px] dark:from-blue-400 dark:to-blue-400">
									{post.title}
								</span>
							</a>
						</h3>
					</div>
				</article>
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