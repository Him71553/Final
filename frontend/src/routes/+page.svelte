<script>
  import { onMount } from 'svelte';
  import { theme } from '../themeStore.js'; 

  let currentTheme ='light';

  onMount(() => {
    theme.subscribe(value => {
      currentTheme = value;
      if (typeof document !== 'undefined') {
        document.body.classList.toggle('dark', currentTheme === 'dark');
      }
    });

    if (typeof window !== 'undefined' && !localStorage.getItem('theme')) {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme.set(prefersDark ? 'dark' : 'light');
    }
  });

  function toggleTheme() {
    theme.update(current => (current === 'dark' ? 'light' : 'dark'));
  }
</script>

<div class="app-container">
  
  <header class="global-header">
    <div class="header-left">
    </div>

    <div class="header-center">
      <div class="logo">
        <a href="/">Blog</a>
      </div>
    </div>

    <div class="header-right">
      <nav class="main-nav">
        <button class="theme-toggle" aria-label="切換深色/淺色模式" on:click={toggleTheme}>
          {#if currentTheme === 'dark'}
            <span class="icon-light">☀️</span>
          {:else}
            <span class="icon-dark">🌙</span>
          {/if}
        </button>

        <a href="/login" class="nav-link">登入</a>
        <a href="/register" class="nav-link button-register">註冊</a>
      </nav>
    </div>
  </header>

  <main class="main-content">
    <slot />
  </main>

</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: #f8f8f8;
    color: #333;
    line-height: 1.6;
    transition: background-color 0.3s, color 0.3s;
  }

  :global(body.dark) {
    background-color: #1a1a1a;
    color: #f0f0f0;
  }
  
  .global-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    
    /* === 霧面效果開始 === */
    
    /* 1. 將背景色改為半透明 */
    background-color: rgba(255, 255, 255, 0.8);
    
    /* 2. 邊框也改為半透明 */
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    
    /* 3. 核心：模糊背景 */
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); /* 支援 Safari */
    
    /* === 霧面效果結束 === */
    
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  :global(body.dark) .global-header {
    /* 深色模式的半透明背景 */
    background-color: rgba(42, 42, 42, 0.8);
    /* 深色模式的半透明邊框 */
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  .header-left, .header-right {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .header-left {
    justify-content: flex-start;
  }

  .header-center {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .header-right {
    justify-content: flex-end;
  }

  .logo a {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    color: #222;
  }
  :global(body.dark) .logo a {
    color: #f0f0f0;
  }

  .main-nav {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  .nav-link {
    text-decoration: none;
    color: #555;
    font-weight: 500;
    transition: color 0.2s;
  }
  .nav-link:hover {
    color: #007bff;
  }
  :global(body.dark) .nav-link {
     color: #ccc;
  }
  :global(body.dark) .nav-link:hover {
    color: #9cdbff;
  }

  .button-register {
    background-color: #007bff;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: background-color 0.2s;
  }

  .button-register:hover {
    background-color: #0056b3;
  }

  .theme-toggle {
    background: none;
    border: 1px solid #ccc;
    border-radius: 50%;
    width: 38px;
    height: 38px;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s, border-color 0.2s;
  }
  .theme-toggle:hover {
    background-color: #eee;
  }
  :global(body.dark) .theme-toggle {
    border-color: #555;
    background-color: #333;
    color: #f0f0f0;
  }
  :global(body.dark) .theme-toggle:hover {
    background-color: #444;
  }

  .main-content {
    padding-top: 1rem;
  }


  @media (max-width: 768px) {
    .global-header {
      flex-direction: column;
      padding: 1rem;
      gap: 1rem;
    }
    .header-left, .header-center, .header-right {
      width: 100%;
      justify-content: center;
    }
    .main-nav {
      justify-content: center;
      width: 100%;
    }
  }
</style>