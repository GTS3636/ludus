let cadastrar = document.getElementById('cadastrar')
let cancelar = document.getElementById('cancelar')
let res = document.getElementById('res')

let capa = document.getElementById('capa')
let titulo = document.getElementById('titulo')
let id = document.getElementById('id')
let genero = document.getElementById('genero')
let data_lancamento = document.getElementById('data_lancamento')
let nota = document.getElementById('nota')
let preco = document.getElementById('preco')
let quantidade = document.getElementById('quantidade')

cadastrar.addEventListener('click', (e) => {
    e.preventDefault();

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