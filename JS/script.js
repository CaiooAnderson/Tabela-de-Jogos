var treinadores = [
    {
        treinador:'Caio',
        imagem:'../img/caio.png',
        vitoria:0,
        derrota:0,
        bonus:0,
        pontos:0,
        posicao:0,
        elementos:['Noturno', 'Noturno', 'Noturno']
    }
]

let elementosSorteadosGlobal = [];
var tiposDeElementos = ['Água', 'Fogo', 'Grama', 'Elétrico', 'Gelo', 'Lutador', 'Voador', 'Psíquico', 'Veneno', 'Terra', 'Pedra', 'Inseto', 'Fantasma', 'Noturno', 'Aço', 'Fada', 'Dragão', 'Normal']; 

var imagensElementos = {
    'Água': '../img/water.svg',
    'Fogo': '../img/fire.svg',
    'Grama': '../img/grass.svg',
    'Elétrico': '../img/electric.svg',
    'Gelo': '../img/ice.svg',
    'Lutador': '../img/fighting.svg',
    'Voador': '../img/flying.svg',
    'Psíquico': '../img/psychic.svg',
    'Veneno': '../img/poison.svg',
    'Terra': '../img/ground.svg',
    'Pedra': '../img/rock.svg',
    'Inseto': '../img/bug.svg',
    'Fantasma': '../img/ghost.svg',
    'Noturno': '../img/dark.svg',
    'Aço': '../img/steel.svg',
    'Fada': '../img/fairy.svg',
    'Dragão': '../img/dragon.svg',
    'Normal': '../img/normal.svg'
}

var elementoTabela = document.getElementById('tabelaJogadores');

exibirNaTela()

function exibirNaTela() {

    atualizarPosicao();
    elementoTabela.innerHTML = "";

    treinadores.forEach(function (treinador, index) {
        const elementosSorteados = treinador.elementos.length > 0 ? treinador.elementos : sortearElementos(3);

        treinador.elementos = elementosSorteados.slice();

        const elementosHTML = elementosSorteados.map(elemento => `<img class="imgElemento ${elemento.toLowerCase()}" src="${imagensElementos[elemento]}" alt="${elemento}">`).join('');

        treinador.elementosHTML = elementosHTML;

        elementoTabela.innerHTML += `
        <tr>
            <td><img class='imgTreinador' src="${treinador.imagem}" alt="${treinador.treinador}">${elementosHTML}</td>
            <td>${treinador.vitoria}</td>
            <td>${treinador.derrota}</td>
            <td>${treinador.bonus}</td>
            <td>${treinador.pontos}</td>
            <td><button class="victory" onClick="adicionarVitoria(${index})">Vitória</button></td>
            <td><button class="lose" onClick="adicionarDerrota(${index})">Derrota</button></td>
            <td><button class="bonus" onClick="adicionarBonus(${index})">Bônus</button></td>
            <td><button class="reset" onClick="zerarValores(${index})">Resetar</button></td>
            <td><button class="remove" onClick="removerTreinador(${index})">Remover</button></td>
        </tr>`;
    });
}

function adicionarVitoria(index) {
    treinadores[index].vitoria++
    treinadores[index].pontos = treinadores[index].pontos + 3
    atualizarPosicao()
    exibirNaTela()
}

function adicionarDerrota(index) {
    treinadores[index].derrota++
    treinadores[index].pontos = treinadores[index].pontos - 1
    atualizarPosicao()
    exibirNaTela()
}

function adicionarBonus(index) {
    treinadores[index].bonus++
    treinadores[index].pontos = treinadores[index].pontos + 2
    atualizarPosicao()
    exibirNaTela()
}

function zerarValores(index) {
    treinadores[index].vitoria = 0;
    treinadores[index].derrota = 0;
    treinadores[index].bonus = 0;
    treinadores[index].pontos = 0;
    atualizarPosicao()
    exibirNaTela()
}

function atualizarPosicao() {
    treinadores.sort(function(a,b) {
        return b.pontos - a.pontos;
    });

    treinadores.forEach(function(treinador, index) {
        treinador.posicao = index + 1;
    });
}

function removerTreinador(index) {
    treinadores.splice(index, 1)
    exibirNaTela()
}

function adicionarTreinador(index) {
    var nomeTreinador = document.getElementById('addTreinador').value;
    var imagemTreinador = document.getElementById('addImagem').value;

    // Verifica se uma URL de imagem foi fornecida
    if (!imagemTreinador) {
        // Se não houver URL, define uma imagem padrão
        imagemTreinador = 'https://user-images.githubusercontent.com/63087888/87461299-8582b900-c60e-11ea-82ff-7a27a51859d0.png'; // Substitua 'URL_DA_IMAGEM_PADRAO' pela URL da imagem padrão desejada
    }

    var elementosSorteados = elementosSorteadosGlobal;

    var novoTreinador = {
        treinador: nomeTreinador,
        imagem: imagemTreinador,
        vitoria: 0,
        derrota: 0,
        bonus: 0,
        pontos: 0,
        posicao: 0,
        elementos: elementosSorteados,
        elementosHTML: elementosSorteados.map(elemento => `<img class="imgElemento ${elemento.toLowerCase()}" src="${imagensElementos[elemento]}" alt="${elemento}">`).join('')
    };

    treinadores.push(novoTreinador);
    exibirNaTela();
    limparDados();

    const divResultado = document.getElementById('resultado');
    divResultado.innerHTML = '';
}

function limparDados() {

    document.getElementById('addTreinador').value = '';
    document.getElementById('addImagem').value = '';
}

function sortearElementos(quantidade, elementosExistentes = []) {
    var elementosSorteados = [];

    var tiposDisponiveis = tiposDeElementos.slice();

    elementosExistentes.forEach(elemento => {
        var index = tiposDisponiveis.indexOf(elemento);
        if (index !== -1) {
            tiposDisponiveis.splice(index, 1);
        }
    });

    while (elementosSorteados.length < quantidade) {
        var elementoSorteado = tiposDisponiveis[Math.floor(Math.random() * tiposDisponiveis.length)];
        elementosSorteados.push(elementoSorteado);
    }
    return elementosSorteados;
}


function exibirImagens(elementos, index) {
    const elementoTabela = document.getElementById('tabelaJogadores');

    const elementosHTML = elementos.map(elemento => `<img class="imgElemento ${elemento.toLowerCase()}" src="${imagensElementos[elemento]}" alt="${elemento}">`).join('');

    treinadores[index].elementos = elementos;
    
    const row = elementoTabela.rows[index + 1];
    if (row) {
        const tdElementos = row.cells[0];
        tdElementos.innerHTML = `<img class='imgTreinador' src="${treinadores[index].imagem}" alt="${treinadores[index].treinador}">${elementosHTML}`;
    }
}

function demonstrarElementos(index) {
    const quantidadeSorteada = 3;
    const ultimosElementos = treinadores[index].elementos || [];
    const resultados = sortearElementos(quantidadeSorteada, ultimosElementos);
    
    elementosSorteadosGlobal = resultados;

    const elementosHTML = resultados.map(elemento => `
        <img class="imgElemento ${elemento.toLowerCase()}" src="${imagensElementos[elemento]}" alt="${elemento}">
    `).join('');

    const divResultado = document.getElementById('resultado');
    divResultado.innerHTML = elementosHTML;
}

document.getElementById("elementos").addEventListener("click", function() {
    const indexDoUltimoTreinador = treinadores.length - 1;
    demonstrarElementos(indexDoUltimoTreinador);
});
