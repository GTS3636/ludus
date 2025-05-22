document.addEventListener('DOMContentLoaded', () => {
  const cadastroForm = document.querySelector('form')
  const cadastroButton = document.getElementById('cadastro-button')

  cadastroForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    cadastroButton.disabled = true
    cadastroButton.textContent = 'Cadastrando...'
    const user = document.getElementById('user').value.trim()
    const senha = document.getElementById('senha').value
    const dadosLogin = {nome: user, senha: senha}

    try {
      const response = await fetch('http://localhost:8081/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosLogin)
      })
      const result = await response.json()

      if (response.status === 201) {
        alert(result.message)
        window.location.href = 'index.html'
      } else {
        alert(result.message)
        return
      }
    } 
    
    catch (error) {
      console.error('Erro na requisição de cadastro:', error)
      alert('Não foi possível conectar ao servidor. Tente novamente mais tarde.')
    } 
    
    finally {
      cadastroButton.disabled = false
      cadastroButton.textContent = 'Conectar-se'
    }
  })
})