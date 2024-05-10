
let url = "https://raw.githubusercontent.com/Vhutuy/PalavrasSemAcento/main/ListadePalavraSemAcento.txt";

// Função para carregar a lista de palavras
async function carregarListaDePalavras() {
    try {
        let resposta = await fetch(url);
        let texto = await resposta.text();
        return texto.split("\n").map(palavra => palavra.trim());
    } catch (erro) {
        console.error("Erro ao carregar a lista de palavras:", erro);
        return [];
    }
}

// Função para escolher uma palavra aleatória da lista
async function escolherPalavraAleatoria() {
    try {
        let listaPalavras = await carregarListaDePalavras();
        if (listaPalavras.length > 0) {
            let indiceAleatorio = Math.floor(Math.random() * listaPalavras.length);
            return listaPalavras[indiceAleatorio];
        } else {
            console.error("A lista de palavras está vazia.");
            return null;
        }
    } catch (erro) {
        console.error("Erro ao escolher uma palavra aleatória:", erro);
        return null;
    }
}

let palavraAlvo = "raios"

escolherPalavraAleatoria().then(palavra => {
    if (palavra !== null) {
        console.log("Palavra alvo:", palavra);
        palavraAlvo = palavra;
    } else {
        alert("Não foi possível escolher uma palavra aleatória.");
        return
    }
});


let tentativas = 1;
let palavraCampo = document.getElementById("palavra");


// Função para comparar e exibir o resultado da tentativa
function verificarTentativa() {

    //Verificação Inicial da Palavra digitada
    if (tentativas > 5) {
        encerrar(false, tentativas)
        return
    }

    let palavra = document.getElementById("palavra").value;

    if (palavra.length < 5) {
        alert("A palavra deve conter 5 letras!");
        return
    }

    if (palavra.length > 5) {
        alert("A palavra deve conter 5 letras!");
        return
    }

    if (palavra.includes("ç") || palavra.includes("Ç")) {
        alert("Evite o uso de Ç")
        return
    }

    let conteinerTentativaId = "container-Tentativa" + tentativas
    let conteinerTentativa = document.getElementById(conteinerTentativaId).style.display = "flex"

    // CASO VERDE

    let casosVerde = 0
    if (palavra[0] == palavraAlvo[0]) {
        casosVerde++;
    }
    if (palavra[1] == palavraAlvo[1]) {
        casosVerde++;
    }
    if (palavra[2] == palavraAlvo[2]) {
        casosVerde++;
    }
    if (palavra[3] == palavraAlvo[3]) {
        casosVerde++;
    }
    if (palavra[4] == palavraAlvo[4]) {
        casosVerde++;
    }

    //Inicio do for para cada letra e sua definição
    for (let i = 0; i < 5; i++) {

        let campoLetraId = "caixaTentativa" + tentativas + "Espaco" + (i + 1);
        let letraId = "tentativa" + tentativas + "Espaco" + (i + 1);

        let campoLetra = document.getElementById(campoLetraId);
        let letra = document.getElementById(letraId);


        if (palavra[i].toUpperCase() == palavraAlvo[i].toUpperCase()) {
            letra.innerHTML = palavra[i].toUpperCase();
            letra.style.color = "white";
            campoLetra.style.backgroundColor = "#9ADE7B";
            alterarAlfabeto(palavra[i], "#9ADE7B", "white", 1);
            continue;
        }

        //CASO AMARELO
        let amarela = false
        let vezesQueAparecePalavraAlvo = 0;
        for (let j = 0; j < palavraAlvo.length; j++) {
            if (palavra[i] === palavraAlvo[j]) {
                amarela = true;
                vezesQueAparecePalavraAlvo++;
            }
        }

        let vezesQueAparecePalavra = 0
        if (palavra[i] == palavra[0]) {
            vezesQueAparecePalavra++;
        }
        if (palavra[i] == palavra[1]) {
            vezesQueAparecePalavra++;
        }
        if (palavra[i] == palavra[2]) {
            vezesQueAparecePalavra++;
        }
        if (palavra[i] == palavra[3]) {
            vezesQueAparecePalavra++;
        }
        if (palavra[i] == palavra[4]) {
            vezesQueAparecePalavra++;
        }


        let vezesApareFrente = 0
        for (let k = 1; k < palavraAlvo.length; k++) {
            if (palavra[i] == palavraAlvo[i + k]) {
                amarela = true;
                vezesApareFrente++;
            }

        }

        let vezesQueJaApareceu = 0
        if (palavra[i] == palavra[i]) {
            vezesQueJaApareceu++;
        }
        if (palavra[i] == palavra[i - 1]) {
            vezesQueJaApareceu++;
        }
        if (palavra[i] == palavra[i - 2]) {
            vezesQueJaApareceu++;
        }
        if (palavra[i] == palavra[i - 3]) {
            vezesQueJaApareceu++;
        }
        if (palavra[i] == palavra[i - 4]) {
            vezesQueJaApareceu++;
        }


        //CASO AMARELO/CINZA

        if (amarela && palavra[i].toUpperCase() != palavraAlvo[i].toUpperCase() && i != 4 && vezesQueJaApareceu == vezesQueAparecePalavra && vezesQueJaApareceu <= vezesQueAparecePalavraAlvo) {
            letra.innerHTML = palavra[i].toUpperCase();
            letra.style.color = "white";
            campoLetra.style.backgroundColor = "#EEF296"
            alterarAlfabeto(palavra[i], "#EEF296", "white", 1)
            continue;
        }

        //CASO AMARELO PARA A ÚLTIMA LETRA
        if (i == 4 && amarela && palavra[i].toUpperCase() != palavraAlvo[i].toUpperCase() && casosVerde != vezesQueAparecePalavraAlvo) {
            letra.innerHTML = palavra[i].toUpperCase();
            letra.style.color = "white";
            campoLetra.style.backgroundColor = "#EEF296";
            alterarAlfabeto(palavra[i], "#EEF296", "white", 1);
            continue;
        }

        //CASO CINZA
        if (amarela == false || vezesQueAparecePalavra >= vezesQueAparecePalavraAlvo) {
            letra.innerHTML = palavra[i].toUpperCase();
            letra.style.color = "#333333";
            campoLetra.style.backgroundColor = "gray"
            campoLetra.style.opacity = "0.6"
            alterarAlfabeto(palavra[i], "#333333", "gray", 0.6)
        }
    }

    //vitoria
    if (palavra == palavraAlvo) {
        encerrar(true, tentativas)
    }
    tentativas += 1;
}

// Função para alterar alfabeto
function alterarAlfabeto(letra, cor, corfonte, opacidade) {
    let caixaLetraId = "caixaLetra" + letra.toUpperCase();

    let caixaLetra = document.getElementById(caixaLetraId);
    caixaLetra.style.backgroundColor = cor;
    caixaLetra.style.color = corfonte;
    caixaLetra.style.opacity = opacidade;
}

// Função para encerrar o jogo

function encerrar(valor, tentativa) {
    let box = document.getElementById("restartBox")
    let espaco = document.getElementById("textoMotivacao")

    if (localStorage.getItem('vitorias') === null || localStorage.getItem('derrotas') === null) {
        // Se não existirem, cria-los com valor 0
        localStorage.setItem('vitorias', '0');
        localStorage.setItem('derrotas', '0');
    }

    if (valor == true) {
        box.style.display = "flex"
        if (tentativa == 1) {
            espaco.innerHTML = "A palavra era: " + palavraAlvo + " Você surpreendeu! À primeira vista, acredito que ninguém esperava por isso."
        }
        if (tentativa == 2) {
            espaco.innerHTML = "A palavra era: " + palavraAlvo + " Segundo lugar? É apenas o primeiro dos perdedores!"
        }
        if (tentativa == 3) {
            espaco.innerHTML = "A palavra era: " + palavraAlvo + "Na média, você não alcançou nada. Mas, francamente, não esperava-se nada de você."
        }
        if (tentativa == 4) {
            espaco.innerHTML = "A palavra era: " + palavraAlvo + " Já vi desempenhos superiores. Aprimore-se!"
        }
        if (tentativa == 5) {
            espaco.innerHTML = "A palavra era: " + palavraAlvo + " Ufa! Será que é difícil ou o problema está em você?"
        }

        let vitorias = parseInt(localStorage.getItem('vitorias'))
        localStorage.setItem('vitorias', vitorias + 1);
    } else {
        box.style.display = "flex"
        espaco.innerHTML = "5 tentativas e ainda assim não conseguiu? Parece que o problema e você."

        let derrotas = parseInt(localStorage.getItem('derrotas'))
        localStorage.setItem('derrotas', derrotas + 1);
    }
}
// Função para Reiniciar o jogo
function reiniciar() {

    window.location.reload();

}

//Apertar Enter
let campo = document.getElementById("palavra")

campo.addEventListener("keypress", function (event) {

    if (event.key == "Enter") {
        verificarTentativa();
    }
});

