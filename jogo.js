var timerId = null //variavel que armazena a chamada da função TimeOut
function IniciaJogo(){
	var url = window.location.search;
	var nivel_jogo = url.replace("?","");

	var tempo_segundos = 0 ;
	//1 facíl = 120s
	if(nivel_jogo == 1){
		tempo_segundos=120;
	}
	//2 normal = 60s
	else if(nivel_jogo==2){
		tempo_segundos=60;
	}
	//3 difícil = 30s
	else{
		tempo_segundos=30;
	}
	//inserindo segundos no spam
	document.getElementById('cronometro').innerHTML =  tempo_segundos;

	//criando balões
	var qntd_baloes = 60;
	CriarBaloes(qntd_baloes);

	//imprimir quantidade de balões inteiros
	document.getElementById('baloes_inteiros').innerHTML = qntd_baloes;
	//imprimir quantidade de balões estourados
	var qntd_baloes_estourados = 0;
	document.getElementById('baloes_estourados').innerHTML =  qntd_baloes_estourados

	//iniciar cronometro
	Contagem_Tempo(tempo_segundos+1);

	//alert(tempo_segundos);
}


function CriarBaloes(qntd_baloes){
	for (var i = 1; i <=qntd_baloes; i++) {
		var balao = document.createElement("img"); //torna a variavel uma tag
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		balao.id= 'b'+i;
		balao.onclick = function(){ Estourar(this); };
		document.getElementById('cenario').appendChild(balao);
	}

}

function Contagem_Tempo(segundos){
	segundos = segundos -1;
	if (segundos == -1) {
		clearTimeout(timerId); //para a função do setTimeout
		GamerOver();
		return false;
	}
	document.getElementById('cronometro').innerHTML = segundos;
	timerId = setTimeout("Contagem_Tempo("+segundos+")",1000);

}

function GamerOver(){
	alert('Fim de jogo! você não conseguiu estourar todos balões a tempo.');
	RemoveEventosBaloes();
}

function Estourar(e){
	var id_balao = e.id;
	document.getElementById(id_balao).setAttribute("onclick","");
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
	Pontuacao(-1);
}

function Pontuacao(acao){
	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados  = document.getElementById('baloes_estourados').innerHTML;
	
	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);
	
	
	baloes_inteiros =  baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;
	
	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	SituacaoJogo(baloes_inteiros);
}

function SituacaoJogo(i){
	if (i==0) {
		alert("Parabéns, você conseguiu estourar todos os balões a tempo");
		PararJogo();
	}
}

function PararJogo(){
	clearTimeout(timerId);
}

function RemoveEventosBaloes() {
    var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}

function Reset(){
	window.location.href = 'index.html';
}