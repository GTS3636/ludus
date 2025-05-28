let atualizarBT = document.getElementById('atualizar') 
let adicionar = document.getElementById('adicionar')

let capa = document.getElementById('capa').value
let titulo = document.getElementById('titulo').value
let cod = document.getElementById('cod').value
let genero = document.getElementById('genero').value
let dt_lanc = document.getElementById('dt_lanc').value
let nota = document.getElementById('nota').value

adicionar.addEventListener('click', (e)=>{
    e.preventDefault()
    inputId = Number(document.getElementById('inputId').value)

    // res.innerHTML = ''

    fetch(`http://localhost:8081/jogos/${inputId.value}`)
        .then((resp) => resp.json)
        .then((dado) => {
            console.log(dado)

            capa.value = dado.capa
            titulo.value = dado.titulo
            genero.value = dado.genero
            dt_lanc.value = dado.dt_lanc
            nota.value = dado.nota

        })
        .catch((err) => {
            console.log('Erro ao listar dados!!', err)
        })

})

atualizarBT.addEventListener('click', (e)=>{
    e.preventDefault()
    const valores = {
        capa: capa.value,
        titulo: titulo.value,
        genero: genero.value ,
        dt_lanc: dt_lanc.value,
        nota: nota.value 
    }

    console.log(valores)

    fetch(`http://localhost:8081/jogos/${InputId}/atualizar`,{
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(valores)
    })

    .then((resp) => resp.json())
    .then((dadosGrav) => {
        console.log(dadosGrav)
            document.getElementById('capa').value = "";        
            document.getElementById('titulo').value = "";        
            document.getElementById('cod').value = "";        
            document.getElementById('genero').value = "";        
            document.getElementById('dt_lanc').value = "";        
            document.getElementById('nota').value = "";      
    })
    .catch((err)=>{
        console.error('Erro ao gravar os dados no banco de dados!', err)
    })
})