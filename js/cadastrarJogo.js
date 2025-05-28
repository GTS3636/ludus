let cadastrar = document.getElementById('cadastrar');
let res = document.getElementById('res');

let cod = document.getElementById('cod')
let nome = document.getElementById('name')
let description = document.getElementById('description')
let developers = document.getElementById('developers')
let publisher = document.getElementById('publisher')
let price = document.getElementById('price')
let releaseDate = document.getElementById('releaseDate')
let quantity = document.getElementById('quantity')
let categories = document.getElementById('categories')

cadastrar.addEventListener('click', (e) => {
    e.preventDefault();

    if (!cod.value || !nome.value || !description.value || !developers.value || !publisher.value || !price.value || !releaseDate.value || !quantity.value || !categories.value) {
        alert("Por favor, preencha todos os campos!")
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
    console.log("Enviando para o backend:", valores);

    res.innerHTML = "Cadastrando...";

    fetch(`http://localhost:8081/jogos/cadastrar`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(valores)
    })
    .then(resp => {
        if (!resp.ok) {
            throw new Error(`Erro ${resp.status} - ${resp.statusText}`);
        }
        return resp.json();
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
        document.getElementById('gameForm').reset();
    })
    .catch((err) => {
        console.error('Erro ao gravar os dados no banco de dados!', err);
        res.innerHTML = 'Erro ao cadastrar jogo: ' + err.message;
    });
});