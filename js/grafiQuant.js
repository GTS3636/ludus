const graf = document.getElementById("graf")
let gravar = document.getElementById("gravar")
let myChart
let arrayNomes = []
let arrayQuants = []
let arrayValor = []
gravar.addEventListener("click", ()=>{
    arrayNomes = [ ]
    arrayQuants = [ ]
    arrayValor = [ ]
    fetch("https://api.npoint.io/d7adce794c9085cc1659")
    .then(resp=>resp.json())
    .then(data =>{
        data.games.forEach(produto => { // Se espera chegar o jogo Minecraft
            arrayNomes.push(produto.name)
            arrayQuants.push(produto.quantity)
            arrayValor.push(produto.price)
        })
        if(myChart){
            myChart.destroy()
        }
        myChart = new Chart(graf, {
            type: 'bar',
            data:{
                labels: arrayNomes,
                datasets: [{
                    label: 'Quantidade',
                    data: arrayQuants,
                    borderWidth: 3,
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.7)', // Teal vibrante
                        'rgba(54, 162, 235, 0.7)', // Azul claro
                        'rgba(153, 102, 255, 0.7)', // Lavanda
                        'rgba(255, 159, 64, 0.7)',  // Laranja suave
                        'rgba(255, 99, 132, 0.7)',  // Rosa suave
                        'rgba(201, 203, 207, 0.7)' // Cinza claro para mais itens
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(201, 203, 207, 1)'
                    ],
                    hoverBackgroundColor: [ // Cores mais escuras ao passar o mouse
                        'rgba(75, 192, 192, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(201, 203, 207, 1)'
                    ],
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins:{
                    legend:{
                        labels:{
                            font:{
                                size: 14
                            }
                        }
                    }
                },
                title: {
                        display: true,
                        text: 'Quantidade de Jogos', // Título mais descritivo
                        font: {
                            size: 18,
                            weight: 'bold'
                        },
                        color: '#333' // Cor do título
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo do tooltip
                        titleColor: '#fff', // Cor do título do tooltip
                        bodyColor: '#fff', // Cor do corpo do tooltip
                        padding: 10,
                        displayColors: true, // Exibe a cor da barra no tooltip
                        boxPadding: 4
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)' // Linhas de grade mais claras
                        },
                        ticks: {
                            font: {
                                size: 12
                            },
                            color: '#555' // Cor dos números do eixo Y
                        }
                    },
                    x: {
                        grid: {
                            display: false // Remove as linhas de grade verticais para um visual mais limpo
                        },
                        ticks: {
                            font: {
                                size: 12
                            },
                            color: '#555' // Cor dos nomes do eixo X
                        }
                    }
            }
        })
    })
    .catch((err)=>{
        console.error((err))
    })
    if(Chart.getChart(graf)){
        chart.getChart(graf).destroy()
    }
})