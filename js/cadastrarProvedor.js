let cadastrar = document.getElementById('cadastrar')
let consultar = document.getElementById('consultar')
let cancelar = document.getElementById('cancelar')
let res = document.getElementById('res')

consultar.addEventListener('click', (e) => {
    e.preventDefault()
    fetch('http://https://api.npoint.io/d7adce794c9085cc1659/games/0')
    .then(resp=>resp.json())
    .then((data)=>{
        document.getElementById('capa').value = data.capa
        document.getElementById('titulo').value = data.name
        document.getElementById('id').value = data.cod
        document.getElementById('genero').value = data.categories
        document.getElementById('data_lancamento').value = data.release_date
        document.getElementById('nota').value = data.nota
        document.getElementById('preco').value = data.price
        document.getElementById('quantidade').value = data.quantity
        res.innerHTML = "Dados pegos com sucesso! Dê uma olhada antes de cadastrar."
    })
    .catch((err)=>{
        res.innerHTML = "Erro ao pegar os dados"
        console.error('Ocorreu um erro em pegar os dados: ',err)
    })
})
cadastrar.addEventListener('click',(e)=>{
    e.preventDefault()

    let capa = document.getElementById('capa')
    let titulo = document.getElementById('titulo')
    let id = document.getElementById('id')
    let genero = document.getElementById('genero')
    let data_lancamento = document.getElementById('data_lancamento')
    let nota = document.getElementById('nota')
    let preco = document.getElementById('preco')
    let quantidade = document.getElementById('quantidade')

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
    res.innerHTML = "Cadastrando..."
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
        limpar()
    })
    .catch((err) => {
        console.error('Erro ao gravar os dados no banco de dados!', err)
        res.innerHTML = 'Erro ao cadastrar jogo: ' + err.message
    })
})
function limpar(){
    document.getElementById('capa').value = ' '
    document.getElementById('titulo').value = ' '
    document.getElementById('id').value = ' '
    document.getElementById('genero').value = ' '
    document.getElementById('data_lancamento').value = ' '
    document.getElementById('nota').value = ' '
    document.getElementById('preco').value = ' '
    document.getElementById('quantidade').value = ' '
}
cancelar.addEventListener('click',(e)=>{
    e.preventDefault()
    limpar()
})