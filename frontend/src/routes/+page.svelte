<script lang="ts">
	import { fly, fade } from 'svelte/transition';

	let { data } = $props();
</script>

{#snippet dateDisplay(dateString: string)}
	<time
		datetime={dateString}
		class="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-blue-600/80 uppercase dark:text-blue-400/80"
	>
		<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2.5"
				d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
			/>
		</svg>
		{new Date(dateString).toLocaleDateString('zh-TW', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})}
	</time>
{/snippet}

<div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-20">
	<header class="mb-16 text-center sm:text-left">
		<h1 class="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
			最新文章
		</h1>
	</header>

	<div class="grid gap-6 md:grid-cols-2 lg:gap-8">
		{#each data.data as post, i (post.id)}
			<article
				in:fly={{ y: 30, duration: 500, delay: i * 150 }}
				class="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500
        hover:-translate-y-1 hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/10
        dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/30"
			>
				<div
					class="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-blue-500/5 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100 dark:bg-blue-400/10"
				></div>

				<div class="flex flex-col gap-4">
					<div
						class="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500 sm:text-sm dark:text-slate-400"
					>
						{@render dateDisplay(post.created_at)}

						<span class="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>

						<div class="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="h-3.5 w-3.5 text-blue-500/80"
							>
								<path
									d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z"
								/>
							</svg>
							<span>{post.username}</span>
						</div>
					</div>

					<h2 class="truncate text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
						<a
							href={`/post/${post.id}`}
							class="before:absolute before:inset-0 focus:outline-none"
							title={post.title}
						>
							<span
								class="bg-gradient-to-r from-blue-600 to-blue-600 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 group-hover:bg-[length:100%_2px] dark:from-blue-400 dark:to-blue-400"
							>
								{post.title}
							</span>
						</a>
					</h2>
				</div>
			</article>
		{/each}
	</div>

	{#if data.data.length === 0}
		<div
			in:fade
			class="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-4 py-12 text-center dark:border-slate-800 dark:bg-slate-900/30"
		>
			<div class="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
				<svg
					class="h-12 w-12 text-slate-300 dark:text-slate-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
					/>
				</svg>
			</div>
			<h3 class="mt-6 text-xl font-bold text-slate-900 dark:text-white">靜候內容更新</h3>
			<p class="mt-3 max-w-xs text-slate-500 dark:text-slate-400">
				目前還沒有發布任何內容，請稍後再回來查看。
			</p>
		</div>
	{/if}
</div>
