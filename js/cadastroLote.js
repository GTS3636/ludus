let cadastrar = document.getElementById('cadastrar')
let res = document.getElementById('res')
cadastrar.addEventListener('click',(e)=>{
    e.preventDefault()
    fetch('http://https://api.npoint.io/d7adce794c9085cc1659/games/')
    .then(resp=>{
        if(resp.ok){
            return resp.json
        }else{
            throw new Error('Erro na requisição de dados.')
        }
    })
    .then((data)=>{
        data.forEach(jogo => {
            res.innerHTML += `ID: ${jogo.id} | Nome: ${jogo.name} | Preço: ${jogo.price} | Quantidade: ${jogo.quantity} | Data de lançamento: ${jogo.release_date} | Gêneros: ${jogo.categories} | Imagem: <img src="${jogo.capa}">`
        })
    })
    .catch((err)=>{
        res.innerHTML = `Erro ao cadastrar em lote.`
        console.error(`Erro em cadastrar o lote: ${err}`)
    })
})