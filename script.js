
let palavraAlvo = "raios";
let tentativas = 1;
let palavraCampo = document.getElementById("palavra");


// Função para comparar e exibir o resultado da tentativa
function verificarTentativa() {

    //Verificação Inicial da Palavra digitada
    if (tentativas > 5) {
        encerrar(false, tentativas)
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

    //Inicio do for para cada letra e sua definição
    for (let i = 0; i < 5; i++) {

        let campoLetraId = "caixaTentativa" + tentativas + "Espaco" + (i + 1);
        let letraId = "tentativa" + tentativas + "Espaco" + (i + 1);

        let campoLetra = document.getElementById(campoLetraId);
        let letra = document.getElementById(letraId);

        // CASO VERDE
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
        if (palavra[i] == palavraAlvo[0]) {
            amarela = true;
            vezesQueAparecePalavraAlvo++;
        }
        if (palavra[i] == palavraAlvo[1]) {
            amarela = true;
            vezesQueAparecePalavraAlvo++;
        }
        if (palavra[i] == palavraAlvo[2]) {
            amarela = true;
            vezesQueAparecePalavraAlvo++;
        }
        if (palavra[i] == palavraAlvo[3]) {
            amarela = true;
            vezesQueAparecePalavraAlvo++;
        }
        if (palavra[i] == palavraAlvo[4]) {
            amarela = true;
            vezesQueAparecePalavraAlvo++;
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

        //vezes que ja apareceu na plavra
        let vezesQeJaApareceu = 0
        if (palavra[i] == palavra[i-1]) {
            vezesQeJaApareceu ++;
        }
        if (palavra[i] == palavra[i-2]) {
            vezesQeJaApareceu ++;
        }
        if (palavra[i] == palavra[i-3]) {
            vezesQeJaApareceu ++;
        }
        if (palavra[i] == palavra[i-4]) {
            vezesQeJaApareceu ++;
        }
        if (palavra[i] == palavra[i]) {
            vezesQeJaApareceu ++;
        }
        console.log("====================================== tentativa: " + i + " " + palavra[i])
        console.log("vezes que aparece palavra alvo: " + vezesQueAparecePalavraAlvo)
        console.log("vezes que ja apareceu: " + vezesQeJaApareceu)
        console.log("vezes que aparece palavra: " + vezesQueAparecePalavra)

    

        //CASO AMARELO
        if (amarela == true && palavra[i].toUpperCase() != palavraAlvo[i].toUpperCase() && vezesQeJaApareceu < vezesQueAparecePalavraAlvo) {
            letra.innerHTML = palavra[i].toUpperCase();
            letra.style.color = "white";
            campoLetra.style.backgroundColor = "#EEF296"
            alterarAlfabeto(palavra[i], "#EEF296", "white", 1)
            continue;
        }

        //CASO CINZA
        if (amarela == false || vezesQueAparecePalavra >= vezesQueAparecePalavraAlvo || letasAFrente == true) {
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
            espaco.innerHTML = "Você surpreendeu! À primeira vista, acredito que ninguém esperava por isso."
        }
        if (tentativa == 2) {
            espaco.innerHTML = "Segundo lugar? É apenas o primeiro dos perdedores!"
        }
        if (tentativa == 3) {
            espaco.innerHTML = "Na média, você não alcançou nada. Mas, francamente, não esperava-se nada de você."
        }
        if (tentativa == 4) {
            espaco.innerHTML = "Já vi desempenhos superiores. Aprimore-se!"
        }
        if (tentativa == 5) {
            espaco.innerHTML = "Ufa! Será que é difícil ou o problema está em você?"
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

campo.addEventListener("keypress", function(event) {

    if(event.key == "Enter") {
        verificarTentativa();
    }
});
