const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const botaoIniciar = document.querySelector(".app__card-primary-button");
const displayTempo = document.querySelector("#timer");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const startPauseBt = document.querySelector("#start-pause");
const iniciarOuPausaBtIcone = document.querySelector('.app__card-primary-button')
const tempoNaTela =  document.querySelector('#timer')

const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("./sons/luna-rise-part-one.mp3");
//new Audio cria um objeto audio
const audioPlay = new Audio("./sons/play.wav");
const audioPausa = new Audio("./sons/pause.mp3");
const audioTempoFinalizado = new Audio("./sons/beep.mp3");


musica.loop = true; //musica fica em  loop



//temporizador
let tempoDecorridoEmSegundos = 1500; //25 minutos 
let intervaloId = null;


/*Refatorado
focoBt.addEventListener('click', () => {
     html.setAttribute('data-contexto', 'foco')
     banner.setAttribute('src', './imagens/foco.png')
     /* setAttribute recebe dois atribute, o primeiro é qual elemento vc qer alterar, e o segundo é oque eu qero inserir quando eu estiver clicado em focoBt
});

curtoBt.addEventListener("click", () => {
  html.setAttribute("data-contexto", "descanso-curto");
  banner.setAttribute('src', './imagens/descanso-curto.png')
  
});

longoBt.addEventListener("click", () => {
    html.setAttribute("data-contexto", "descanso-longo");
    banner.setAttribute('src', '/imagens/descanso-longo.png')

});*/

//Apos refatorar, como temos o mesmo nome foco pra foto e mudando de cor podemos fazer assim

musicaFocoInput.addEventListener("change", () => {
  //funcao anonima
  //change é um evento para trabalhar input true ou false
  if (musica.paused) {
    //se musica tiver pausada, da play
    musica.play();
  } else {
    //play e pause sao metodos
    musica.pause(); //se nao pausa
  }
});

focoBt.addEventListener("click", () => {
  alterarContexto("foco");
  //tempoDecorridoEmSegundos = 1500
  focoBt.classList.add("active");
  
});

curtoBt.addEventListener("click", () => {
  alterarContexto("descanso-curto");
  //tempoDecorridoEmSegundos = 300; // 5 * 60 5minutos x 60 segundos
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  alterarContexto("descanso-longo");
  //tempoDecorridoEmSegundos = 900;
  longoBt.classList.add("active");
  
});

function alterarContexto(contexto) {
  
  zerar();
  botoes.forEach(function (botao) {
    //O forEach() serve para percorrer todos os elementos de uma lista, executando uma função para cada um deles.
    botao.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagens/${contexto}.png`);
  switch (contexto) {
    case "foco": //innerHTML faz mudando de texto, para incrementar += usado para fazer lista
    tempoDecorridoEmSegundos = 1500;
      titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      tempoDecorridoEmSegundos = 300;
      titulo.innerHTML = `Que tal das uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
    case "descanso-longo":
      tempoDecorridoEmSegundos = 900; //15 minutos  = 15 *60
      titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;

    default:
      break;
  }
  mostrarTempo();
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    //audioTempoFinalizado.play(); //audio executado quando cronometro finaliza

    alert("Tempo finalizado!");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1; //vai diminuindo o 5
  mostrarTempo()
};

startPauseBt.addEventListener("click", iniciarOuPausar);
//pegando o botao , e chamando a funcao

function iniciarOuPausar() {
  if (intervaloId) {
    audioPausa.play(); //audio executado quando o cronometro for pausado
    zerar();
    return;
  }
  audioPlay.play(); // audio executado quando o cronometro inicia
  intervaloId = setInterval(contagemRegressiva, 1000);
  //setInterval(função, tempo)
  //metodo setInterval executo algo em um determinado tempo, ele recebe 2 parametro, primeiro ele qer saber qual metodo vc qer executar, no caso é nossa funcao , e segundo ele qer saber em quanto tempo qer q seja executado, e qeremos q seja executado a cada 1 segundo. 1000 é em milesegundo que da 1 segundo, ele recebe sempre em milesegundo
  //Execute a função contagemRegressiva a cada 1000 ms (1 segundo)."É como um despertador que toca de 1 em 1 segundo
  iniciarOuPausarBt.textContent = "Pausar";
  iniciarOuPausaBtIcone.setAttribute('src', `./imagens/pause.png`)
}

function zerar() {
  clearInterval(intervaloId);
  //clearInterval  interrompe algum codigo no caso ele interrompe o interloId
  iniciarOuPausarBt.textContent = "Começar"; //textContent nao podemos colocar tags, somente texto, com innerHTML sim
  intervaloId = null;
}

function mostrarTempo(){
  const tempo = new Date(tempoDecorridoEmSegundos * 1000) // 1000 é 1000 milesegundos
  const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second:'2-digit'})
  tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo() // aqi a funcao fica sempre mostrando na tela