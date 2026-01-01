<script lang="ts">
	import { fly } from 'svelte/transition';

	let { data } = $props();
	const { post } = data;
</script>

{#snippet dateDisplay(dateString: string)}
	<time datetime={dateString}>
		{new Date(dateString).toLocaleDateString('zh-TW', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})}
	</time>
{/snippet}

<div class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
	<a
		href="/"
		class="mb-8 inline-flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			class="mr-1 h-4 w-4"
		>
			<path
				fill-rule="evenodd"
				d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
				clip-rule="evenodd"
			/>
		</svg>
		Back
	</a>

	<article
		in:fly={{ y: 20, duration: 600 }}
		class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
	>
		<header
			class="border-b border-slate-100 bg-slate-50/50 px-8 py-10 sm:px-12 dark:border-slate-800 dark:bg-slate-800/50"
		>
			<div class="flex flex-col gap-6">
				<div
					class="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-500 dark:text-slate-400"
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

				<h1
					class="text-3xl font-bold tracking-tight text-balance break-words hyphens-auto text-slate-900 sm:text-4xl md:text-5xl dark:text-white"
				>
					{post.title}
				</h1>
			</div>
		</header>

		<div class="px-8 py-12 sm:px-12">
			<div
				class="prose prose-lg prose-slate dark:prose-invert prose-headings:font-bold
        prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-blue-600
        dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl
        prose-img:shadow-md prose-pre:bg-slate-900
        prose-pre:shadow-lg dark:prose-pre:bg-slate-950/50 dark:prose-pre:border dark:prose-pre:border-slate-800 max-w-none"
			>
				{@html post.html}
			</div>
		</div>
	</article>
</div>
