let apagar = document.getElementById('apagar')
let res = document.getElementById('res')

apagar.addEventListener('click', () => {
    let id = Number(document.getElementById('id').value)

    res.innerHTML = ' '

    fetch(`http://localhost:8081/produto/${id}/deletar`,  {
        method: 'DELETE'
    })
    .then(resp => {
        console.log(resp)
        console.log(resp.status)
        if(resp.status == 204){
            res.innerHTML += "Dados excluídos com sucesso! <br>"
        }else{
            resp.innerHTML += `Produto inexistente. Os dados não foram excluídos! <br>`
        }
    })
    .catch((err) => {
        console.error('Erro ao listar os dados!', err)

    })
})