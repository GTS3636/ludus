function deletarLastLogin(){
const userId = sessionStorage.getItem('loginInfo', JSON.stringify(sessionInfo))
fetch(`http://localhost:8081/users/${userId}/lastlogin`)
  .then(resp => {
    if (!resp.ok) throw new Error('Não foi possível deslogar o usuário.');
    return resp.json()
  })
  .then(data => {
    if(data.lastLogin != null){
        fetch("http://localhost:8081/login/lastlogin/deletar",{method: "POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data.lastLogin)})
        .then(resp=>resp.json())
        .then((dados)=>{
            if(dados.success){
                alert("Usuário deslogado com sucesso!")
            }
        })
        .catch((err)=>{
            console.error("Erro em deslogar o último usuário: ",err)
        })
    } else{
        console.log("Usuário deletado com sucesso!")
    }
    sessionStorage.removeItem('loginInfo')
  })
  .catch(err => console.error(err))
}
// Colocar um botão no HTML que ative essa função