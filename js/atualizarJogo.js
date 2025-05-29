let atualizarBT = document.getElementById('atualizar')
let adicionar = document.getElementById('adicionar')

let currentJogoId = null
adicionar.addEventListener('click', (e) => {
    e.preventDefault()
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
    let inputId = document.getElementById('inputId').value
    if (!inputId) {
        alert("Por favor, digite o ID do jogo para consultar!");
        return;
    }
    currentJogoId = Number(inputId)
    res.innerHTML = "Consultando..."
    fetch(`http://localhost:8081/jogos/${currentJogoId}/consultar`)
        .then((resp) => {
            if (!resp.ok) {
                if (resp.status === 404) {
                    throw new Error('Jogo não encontrado!')
                }
                throw new Error(`Erro ${resp.status} - ${resp.statusText}`)
            }
            return resp.json()
        })
        .then((dados) => {
            console.log("Dados do jogo consultado:", dados)
            res.innerHTML = "Jogo encontrado! Verifique os campos e clique em Atualizar."
            cod.value = dados.cod
            nome.value = dados.name
            description.value = dados.description
            developers.value = dados.developers
            publisher.value = dados.publisher
            price.value = dados.price
            releaseDate.value = dados.releaseDate
            quantity.value = dados.quantity
            categories.value = dados.categories
        })
        .catch((err) => {
            console.error('Erro ao listar dados:', err);
            res.innerHTML = `Erro ao consultar jogo: ${err.message}`;
            // Limpa os campos se houver erro
            document.getElementById('updateGameForm').reset();
            cod.value = '';
            nome.value = '';
            description.value = '';
            developers.value = '';
            publisher.value = '';
            price.value = '';
            releaseDate.value = '';
            quantity.value = '';
            categories.value = '';
            currentJogoId = null; // Reseta o ID
        });
})
atualizarBT.addEventListener('click', (e) => {
    e.preventDefault()
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
    if (!currentJogoId) {
        alert("Por favor, consulte um jogo primeiro!");
        return;
    }
    if (!cod.value || !nome.value || !description.value || !developers.value || !publisher.value || !price.value || !releaseDate.value || !quantity.value || !categories.value) {
        alert("Por favor, preencha todos os campos para atualização!")
        return;
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
    console.log("Enviando para o backend (Atualização):", valores)
    res.innerHTML = "Atualizando..."
    fetch(`http://localhost:8081/jogos/${currentJogoId}/atualizar`, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(valores)
    })
    .then((resp) => {
        if (!resp.ok) {
            throw new Error(`Erro ${resp.status} - ${resp.statusText}`)
        }
        if (resp.status === 204) {
            return null
        }
        return resp.json()
    })
    .then((dadosGrav) => {
        console.log("Dados gravados:", dadosGrav);
        res.innerHTML = `
            <strong>Jogo atualizado com sucesso!</strong><br>
            <p>Código: ${dadosGrav ? dadosGrav.cod : valores.cod}</p>
            <p>Nome: ${dadosGrav ? dadosGrav.name : valores.name}</p>
            <p>Descrição: ${dadosGrav ? dadosGrav.description : valores.description}</p>
            <p>Desenvolvedores: ${dadosGrav ? dadosGrav.developers : valores.developers}</p>
            <p>Publicadora: ${dadosGrav ? dadosGrav.publisher : valores.publisher}</p>
            <p>Preço em Dólares: ${dadosGrav ? dadosGrav.price : valores.price}</p>
            <p>Data de lançamento: ${dadosGrav ? dadosGrav.releaseDate : valores.releaseDate}</p>
            <p>Quantidade disponível: ${dadosGrav ? dadosGrav.quantity : valores.quantity}</p>
            <p>Categorias: ${dadosGrav ? dadosGrav.categories : valores.categories}</p>
        `
        document.getElementById('updateGameForm').reset()
        currentJogoId = null
    })
    .catch((err) => {
        console.error('Erro ao gravar os dados no banco de dados:', err)
        res.innerHTML = 'Erro ao atualizar jogo: ' + err.message
    })
})