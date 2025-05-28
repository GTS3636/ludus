let consultar = document.getElementById('consultar')
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

consultar.addEventListener('click', (e) => {
    e.preventDefault();
    let id = document.getElementById('id').value
    if (!id) {
        res.innerHTML = "Por favor, digite o ID do jogo para consultar!";
        res.className = 'error'
        return
    }
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
    fetch(`http://localhost:8081/jogos/${id}/consultar`)
        .then(resp => {
            if (!resp.ok) {
                if (resp.status === 404) {
                    throw new Error(`Jogo com ID ${id} não encontrado!`)
                }
                throw new Error(`Erro ${resp.status} - ${resp.statusText}`)
            }
            return resp.json()
        })
        .then((dados) => {
            console.log("Dados recebidos:", dados)
            cod.value = dados.cod
            nome.value = dados.name
            description.value = dados.description
            developers.value = dados.developers
            publisher.value = dados.publisher
            price.value = dados.price
            releaseDate.value = dados.releaseDate
            quantity.value = dados.quantity
            categories.value = dados.categories
            res.innerHTML = `<strong>Jogo com ID ${id} encontrado!</strong>`
            res.className = ''
        })
        .catch(err => {
            console.error("Erro ao consultar o jogo:", err)
            res.innerHTML = `Erro: ${err.message}`
            res.className = 'error'
        })
})