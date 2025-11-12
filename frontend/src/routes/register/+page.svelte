<script>
  let username = '';
  let email = '';
  let password = '';
  let confirmPassword = '';

  function handleSubmit() {
    if (password !== confirmPassword) {
      alert('密碼和確認密碼不相符！');
      return;
    }
    // 1. 呼叫 FastAPI 的 /users/register (或類似) 端點
    // 2. 傳送 username, email, password
    // 3. 處理成功 (e.g., 自動登入或導向到登入頁)
    // 4. 處理錯誤 (e.g., email 已被註冊)
    console.log('註冊中...', { username, email, password });
  }
</script>

<div class="register-page-container">
  <div class="register-form-wrapper">
    <h1 class="register-title">建立您的帳號</h1>
    
    <form class="register-form" on:submit|preventDefault={handleSubmit}>
      <div class="form-group">
        <label for="username">使用者名稱</label>
        <input 
          type="text" 
          id="username" 
          bind:value={username} 
          required 
          placeholder="您希望被如何稱呼"
        >
      </div>

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
          minlength="8"
          placeholder="至少 8 個字元"
        >
      </div>

      <div class="form-group">
        <label for="confirmPassword">確認密碼</label>
        <input 
          type="password" 
          id="confirmPassword" 
          bind:value={confirmPassword} 
          required 
          placeholder="再次輸入密碼"
        >
      </div>
      
      <button type="submit" class="submit-button">註冊</button>
      
      <div class="extra-links">
        <a href="/login">已經有帳號了? 前往登入</a>
      </div>
    </form>
  </div>
</div>

<style>
  .register-page-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 4rem 2rem;
    min-height: 80vh;
  }

  .register-form-wrapper {
    width: 100%;
    max-width: 420px;
    padding: 2.5rem;
    
    /* 淺色模式 */
    background-color: #ffffff;
    border: 1px solid #eaeaea;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    
    border-radius: 12px;
    text-align: center;
  }
  
  /* 深色模式 */
  :global(body.dark) .register-form-wrapper {
    background-color: #2a2a2a;
    border-color: #3a3a3a;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .register-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }
  
  .register-form {
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
    box-sizing: border-box;
    
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
    text-align: center;
    font-size: 0.9rem;
  }
  
  .extra-links a {
    color: #007bff;
    text-decoration: none;
  }
  
  .extra-links a:hover {
    text-decoration: underline;
  }
</style>