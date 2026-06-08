const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const botaoIniciar = document.querySelector(".app__card-primary-button");
const displayTempo = document.querySelector("#timer");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
//readFile() é um metodo
musica.loop(true) //musica fica em  loop

const duracaoFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescansoLongo = 900;

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

musicaFocoInput.addEventListener('change', () =>{ //funcao anonima
  //change é um eventopara trabalhar input true ou false
  if (musica.paused){//se musica tiver pausada, da play 
    musica.play()
  }else{//play e pause sao metodos
    musica.pause() //se nao pausa
  }
})

focoBt.addEventListener("click", () => {
  alterarContexto("foco");
  focoBt.classList.add('active')
});

curtoBt.addEventListener("click", () => {
  alterarContexto("descanso-curto");
  curtoBt.classList.add('active')
});

longoBt.addEventListener("click", () => {
  alterarContexto("descanso-longo");
  longoBt.classList.add('active')
});

function alterarContexto(contexto) {
  botoes.forEach(function (contexto){
    //O forEach() serve para percorrer todos os elementos de uma lista, executando uma função para cada um deles.
    contexto.classList.remove("active");
  })
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagens/${contexto}.png`);
  switch (contexto) {
    case "foco": //innerHTML faz mudando de texto, para incrementar += usado para fazer lista 
      titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      titulo.innerHTML = `Que tal das uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;

    default:
      break;
  }
}
