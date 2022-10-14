//CONTROLE DE INTERFACE

let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-direita');
let numeros = document.querySelector('.d-1-3');

//CONTROLE DO AMBIENTE

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let contagemVotos = [];



function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHTML = '';
    numero = '';
    votoBranco = false;

    for(let i = 0; i < etapa.numeros; i++) {
        if(i === 0) {
            numeroHTML += '<div class="numero pisca"></div>';
        } else {
            numeroHTML += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}


function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    })
    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        let fotosHTML = '';
        for (let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHTML += `<div class="d-1-imagem small"><img src="../02 - Urna eletronica/images/${candidato.fotos[i].URL}">${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHTML += `<div class="d-1-imagem"><img src="../02 - Urna eletronica/images/${candidato.fotos[i].URL}">${candidato.fotos[i].legenda}</div>`;
            }
            
        }
        lateral.innerHTML = fotosHTML;

    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande">NÚMERO ERRADO</div><div class="aviso--grande pisca">VOTO NULO</div>';
    }
}



//CONTROLE DOS BOTÕES

function clicou(n) {
    let digito = document.querySelector('.numero.pisca');
    if (digito !== null) {
        digito.innerHTML = n;
        numero = `${numero}${n}`;

        
        digito.classList.remove('pisca');
        if(digito.nextElementSibling !== null) {
            digito.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
      
    }
}

function branco() {
    if(numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--branco pisca">VOTO EM BRANCO</div>';
    } else {
        alert('Para voto em BRANCO, nenhum número deve ter sido digitado!');
    }
}

/*  CASO QUEIRA LIBERAR O VOTO EM BRANCO, MESMO HAVENDO NÚMEROS DIGITADOS NA TELA:

 function branco() {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--branco pisca">VOTO EM BRANCO</div>';
        lateral.innerHTML = '';
    }
} */

function corrige () {
    comecarEtapa();
}

function confirma () {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(votoBranco === true) {
        votoConfirmado = true;
        contagemVotos.push({
            etapa: etapas[etapaAtual].titulo,
            contagemVotos: "Branco"
        });
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        contagemVotos.push({
            etapa: etapas[etapaAtual].titulo,
            contagemVotos: numero
        });
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante">FIM</div>';
            console.log(contagemVotos);
        }
    }
}



comecarEtapa();