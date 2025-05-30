let consultar = document.getElementById('consultar')
let res = document.getElementById('res')

consultar.addEventListener('click', () => {
    let id = Number(document.getElementById('id').value)

    res.innerHTML = ' '

    fetch(`http://localhost:8081/produto/${id}/consultar`)
        .then(resp => resp.json())
        .then(dado => {
            console.log(dado)
            res.innerHTML += `Capa: ${dado.capa} <br>`
            res.innerHTML += `Título: R$ ${dado.titulo} <br>`
            res.innerHTML += `Id: R$ ${dado.id} <br>`
            res.innerHTML += `Gênero: R$ ${dado.genero} <br>`
            res.innerHTML += `Data de lançamento: R$ ${dado.datadelancamento} <br>`
            res.innerHTML += `Nota: R$ ${dado.nota} <br>`
            res.innerHTML += `Quantidade: ${dado.quantidade} <br>`
            res.innerHTML += `Preço: ${dado.preco} <br>`
        })
        .catch((err) => {
            console.error('Erro ao listar os dados!', err)
        })
        })