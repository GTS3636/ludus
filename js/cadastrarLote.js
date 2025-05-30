let cadastrar = document.getElementById('cadastrar');
let res = document.getElementById('res');

cadastrar.addEventListener('click', (e) => {
    e.preventDefault();
    res.innerHTML = 'Processando cadastro...';

    fetch('https://api.npoint.io/d7adce794c9085cc1659/games')
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error('Erro ao buscar dados dos jogos.');
            }
        })
        .then(async (data) => {
            if (!data || data.length === 0) {
                res.innerHTML = 'Nenhum jogo encontrado para cadastrar.';
                return;
            }

            res.innerHTML = '';

            for (const jogo of data) {
                const valores = {
                    cod: jogo.cod,
                    name: jogo.name,
                    price: jogo.price,
                    quantity: jogo.quantity,
                    release_date: jogo.release_date,
                    categories: jogo.categories,
                    capa: jogo.capa
                };

                try {
                    // *** AQUI ESTÁ A CORREÇÃO: troque /jogo/ por /jogos/ ***
                    const response = await fetch('http://localhost:3000/jogos/cadastrar', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(valores)
                    });

                    if (response.ok) {
                        res.innerHTML += `
                            **SUCESSO:** ID: ${jogo.id} | Nome: ${jogo.name} Cadastrado!<br>
                        `;
                    } else {
                        const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
                        throw new Error(`Falha ao cadastrar jogo ID ${jogo.id}: ${response.status} - ${errorData.message || response.statusText}`);
                    }
                } catch (err) {
                    res.innerHTML += `
                        **FALHA:** ID: ${jogo.id} | Nome: ${jogo.name} - ${err.message}<br>
                    `;
                    console.error(`Erro ao cadastrar jogo ID ${jogo.id}: ${err}`);
                }
            }
        })
        .catch((err) => {
            res.innerHTML = `**ERRO GERAL:** ${err.message}`;
            console.error(`Erro na operação em lote: ${err}`);
        });
});