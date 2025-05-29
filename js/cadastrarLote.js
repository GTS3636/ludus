let cadastrar = document.getElementById('cadastrar')
let consultar = document.getElementById('consultar')
let cancelar = document.getElementById('cancelar')
let res = document.getElementById('res')

cadastrar.addEventListener('click',(e)=>{
    e.preventDefault()

    fetch('http://https://api.npoint.io/d7adce794c9085cc1659/games/')
    .then(resp=>resp.json())
    .then((data)=>{
        data.forEach(jogo => {
            let capa = jogo.capa
            let titulo = jogo.name
            let id = jogo.cod
            let genero = jogo.categories
            let data_lancamento = jogo.release_date
            let nota = jogo.nota
            let preco = jogo.price
            let quantidade = jogo.quantity

            const valores = {
                cod: id,
                name: titulo,
                price: preco,
                quantity: quantidade,
                release_date: data_lancamento,
                categories: genero,
                capa: capa,
                nota: nota
            }

            console.log("Enviando para o backend:", valores)
            res.innerHTML += "Cadastrando..."

            fetch(`http://localhost:8081/jogos/cadastrar`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(valores)
            })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error(`Erro ${resp.status} - ${resp.statusText}`)
                }
                return resp.json()
            })
            .then(dadosGrav => {
                res.innerHTML = `
                    <strong>Jogo cadastrado com sucesso!</strong><br>
                    <img src="${dadosGrav.capa}">
                    <p>Título: ${dadosGrav.name}</p>
                    <p>ID: ${dadosGrav.cod}</p>
                    <p>Gênero: ${dadosGrav.categories}</p>
                    <p>Data de Lançamento: ${dadosGrav.release_date}</p>
                    <p>Nota: ${dadosGrav.nota}</p>
                    <p>Preço: ${dadosGrav.price}</p>
                    <p>Quantidade: ${dadosGrav.quantity}</p>
                `
            })
            .catch((err) => {
                console.error('Erro ao gravar os dados no banco de dados:', err)
                res.innerHTML += 'Erro ao cadastrar jogo: ' + err.message
            })
        })
    })
})