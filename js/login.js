document.addEventListener('DOMContentLoaded', () => {
  const loginForm   = document.querySelector('form')
  const loginButton = document.getElementById('login-button')

  const userId = sessionStorage.getItem('loginInfo', JSON.stringify(sessionInfo))
  if(userId){
    fetch(`http://localhost:8081/users/${userId}/lastlogin`)
    .then(resp => {
      if (!resp.ok) throw new Error('Último usuário não encontrado')
      return resp.json()
    })
    .then((data)=>{
      const lastLoginUser = data.lastLogin
      if(lastLoginUser != null){
        window.location.href = "index.html"
      }
    })
  }
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginButton.disabled    = true
    loginButton.textContent = 'Conectando...'

    const nome  = document.getElementById('user').value.trim()
    const senha = document.getElementById('senha').value

    try {
      const resp   = await fetch('http://localhost:8081/users/login/check', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ nome, senha })
      })
      const { success, lastLogin } = await resp.json()

      if (success) {
        // 1) monta objeto de sessão
        const sessionInfo = { nome, lastLogin }
        // 2) armazena em sessionStorage
        sessionStorage.setItem('loginInfo', JSON.stringify(sessionInfo))
        // 3) redireciona
        window.location.href = 'index.html'
      } else {
        alert('Credenciais inválidas!')
      }
    } catch (err) {
      console.error(err)
      alert('Erro de conexão.')
    } finally {
      loginButton.disabled    = false
      loginButton.textContent = 'Conectar-se'
    }
  })
})