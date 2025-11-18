<script lang="ts">
	import { resolve } from '$app/paths';
	import '../app.css';

	// 模擬 $user store (與前一版相同)
	import { writable } from 'svelte/store';
	const user = writable<{ username: string; avatar?: string } | null>(null);

	function handleLogout() {
		$user = null;
		console.log('使用者已登出');
	}
</script>

<div class="min-h-screen bg-slate-900">
	<header class="flex items-start justify-between p-4">
		<div class="flex-1"></div>
		<a
			href={resolve('/')}
			class="
        block px-8 py-2 text-4xl font-bold text-white shadow-lg no-underline transition 
         hover:bg-red-800
      "
		>
			Blog
		</a>

		<div class="flex-1 flex flex-col items-end gap-4">
			{#if $user}
				<div class="flex items-center gap-3">
					<button
						on:click={handleLogout}
						class="
              rounded-md px-4 py-1.5 font-medium text-white transition
              bg-blue-600 hover:bg-blue-700
            "
					>
						登出
					</button>
					<div
						class="
              flex h-10 w-10 items-center justify-center rounded-full font-bold
              bg-blue-600 text-white ring-2 ring-blue-400
            "
					>
						{$user.username.substring(0, 1)}
					</div>
				</div>
			{:else}
				<nav class="flex items-center gap-2">
					<a
						href={resolve('/login')}
						class="
              rounded-md px-4 py-1.5 font-medium text-white transition
              bg-blue-600 hover:bg-blue-700
            "
					>
						登入
					</a>
					<a
						href={resolve('/register')}
						class="
              rounded-md px-4 py-1.5 font-medium text-white transition
              bg-blue-600 hover:bg-blue-700
            "
					>
						註冊
					</a>
				</nav>
			{/if}

			<a
				href={resolve('/post')}
				class="
          rounded-md px-4 py-1.5 font-medium text-white transition
          bg-green-600 hover:bg-green-700
        "
			>
				發表文章
			</a>
		</div>
	</header>

	<main class="pt-4">
		<slot />
	</main>
</div>