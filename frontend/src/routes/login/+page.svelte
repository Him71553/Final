<script>
  let email = '';
  let password = '';

  function handleSubmit() {
    // 這裡就是我們要串接後端 (FastAPI) 的地方
    // 1. 呼叫 FastAPI 的 /token 端點
    // 2. 獲取 JWT Token
    // 3. 將 Token 存起來 (例如 localStorage)
    // 4. 導向到管理後台 (e.g., /admin/dashboard)
    console.log('登入中...', { email, password });
  }
</script>

<div class="login-page-container">
  <div class="login-form-wrapper">
    <h1 class="login-title">登入</h1>
    
    <form class="login-form" on:submit|preventDefault={handleSubmit}>
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          bind:value={email} 
          required 
          placeholder="your@email.com"
        >
      </div>
      
      <div class="form-group">
        <label for="password">密碼</label>
        <input 
          type="password" 
          id="password" 
          bind:value={password} 
          required 
          placeholder="••••••••"
        >
      </div>
      
      <button type="submit" class="submit-button">登入</button>
      
      <div class="extra-links">
        <a href="/forgot-password">忘記密碼?</a>
        <span>|</span>
        <a href="/register">還沒有帳號? 註冊一個</a>
      </div>
    </form>
  </div>
</div>

<style>
  .login-page-container {
    display: flex;
    justify-content: center;
    align-items: flex-start; /* 改為 flex-start 讓它從上面開始 */
    padding: 4rem 2rem;
    min-height: 80vh;
  }

  .login-form-wrapper {
    width: 100%;
    max-width: 420px;
    padding: 2.5rem;
    
    /* 這裡我們使用 :global 來讀取深淺模式的變數 */
    /* 淺色模式 */
    background-color: #ffffff;
    border: 1px solid #eaeaea;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    
    border-radius: 12px;
    text-align: center;
  }
  
  /* 深色模式 */
  :global(body.dark) .login-form-wrapper {
    background-color: #2a2a2a;
    border-color: #3a3a3a;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .login-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .form-group {
    text-align: left;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .form-group input {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box; /* 確保 padding 不會影響寬度 */
    
    /* 深淺模式的 input 樣式 */
    background-color: #fff;
    color: #333;
  }
  
  :global(body.dark) .form-group input {
    background-color: #333;
    color: #f0f0f0;
    border-color: #555;
  }
  
  .form-group input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.2);
  }

  .submit-button {
    padding: 0.8rem 1rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .submit-button:hover {
    background-color: #0056b3;
  }
  
  .extra-links {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
  }
  
  .extra-links a {
    color: #007bff;
    text-decoration: none;
  }
  
  .extra-links a:hover {
    text-decoration: underline;
  }
  
  .extra-links span {
    color: #ccc;
  }

</style>