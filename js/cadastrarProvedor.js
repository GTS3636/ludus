let consultar = document.getElementById('consultar')
let adicionar = document.getElementById('adicionar')
let res = document.getElementById('res')
let cod = document.getElementById('cod')
let nome = document.getElementById('name')
let description = document.getElementById('description')
let developers = document.getElementById('developers')
let publisher = document.getElementById('publisher')
let price = document.getElementById('price')
let releaseDate = document.getElementById('releaseDate')
let quantity = document.getElementById('quantity')
let categories = document.getElementById('categories')
let currentJogoId = null
consultar.addEventListener('click', (e) => {
    e.preventDefault()
    let inputId = document.getElementById('inputId').value
    if (!inputId) {
        res.innerHTML = "Por favor, digite o ID do jogo para consultar!"
        res.className = 'error'
        return;
    }
    currentJogoId = Number(inputId)
    res.innerHTML = "Consultando..."
    res.className = ''
    cod.value = ''
    nome.value = ''
    description.value = ''
    developers.value = ''
    publisher.value = ''
    price.value = ''
    releaseDate.value = ''
    quantity.value = ''
    categories.value = ''
    fetch(`https://api.npoint.io/d7adce794c9085cc1659/games/${currentJogoId-1}`)
        .then((resp) => {
            if (!resp.ok) {
                if (resp.status === 404) {
                    throw new Error('Jogo não encontrado na NPoint API!')
                }
                throw new Error(`Erro ${resp.status} - ${resp.statusText}`)
            }
            return resp.json()
        })
        .then((dados) => {
            console.log("Dados do jogo consultado (NPoint):", dados)
            res.innerHTML = "Jogo encontrado! Verifique os campos e clique em Cadastrar."
            cod.value = dados.cod
            nome.value = dados.name
            description.value = dados.description
            developers.value = dados.developer
            publisher.value = dados.publisher
            price.value = dados.price
            releaseDate.value = dados.release_date  
            quantity.value = dados.quantity
            categories.value = dados.categories
        })
        .catch((err) => {
            console.error('Erro ao listar dados (NPoint):', err)
            res.innerHTML = `Erro ao consultar jogo: ${err.message}`
            res.className = 'error'
            reset()
        })
})
function reset(){
    cod.value = '' 
    nome.value = ''
    description.value = ''
    developers.value = ''
    publisher.value = ''
    price.value = ''
    releaseDate.value = ''
    quantity.value = ''
    categories.value = ''
    currentJogoId = null
}
adicionar.addEventListener('click', (e) => {
    e.preventDefault()
    if (!cod.value || !nome.value || !description.value || !developers.value || !publisher.value || !price.value || !releaseDate.value || !quantity.value || !categories.value) {
        alert("Por favor, preencha todos os campos para atualização!")
        return
    }
    const valores = {
        cod: cod.value,
        name: nome.value,
        description: description.value,
        developers: developers.value,
        publisher: publisher.value,
        price: parseFloat(price.value),
        releaseDate: releaseDate.value,
        quantity: parseInt(quantity.value),
        categories: categories.value
    }
    console.log("Enviando para o backend (Atualização):", valores);
    res.innerHTML = "Atualizando...";
    res.className = ''
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
            <p>Código: ${dadosGrav.cod}</p>
            <p>Nome: ${dadosGrav.name}</p>
            <p>Descrição: ${dadosGrav.description}</p>
            <p>Desenvolvedores: ${dadosGrav.developers}</p>
            <p>Publicadora: ${dadosGrav.publisher}</p>
            <p>Preço em Dólares: ${dadosGrav.price}</p>
            <p>Data de lançamento: ${dadosGrav.releaseDate}</p>
            <p>Quantidade disponível: ${dadosGrav.quantity}</p>
            <p>Categorias: ${dadosGrav.categories}</p>
        `
        reset()
    })
    .catch((err) => {
        console.error('Erro ao gravar os dados no banco de dados!', err)
        res.innerHTML = 'Erro ao cadastrar jogo: ' + err.message
    })
})