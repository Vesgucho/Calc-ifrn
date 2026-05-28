const CHAVE_TEMA = "ifrn_tema";

const provas = {
  matematica: { media: 50.1263, desvio: 23.9604 },
  portugues: { media: 53.9394, desvio: 24.1342 },
  redacao: { media: 62.2584, desvio: 20.1949 }
};

function arredondarInferior5(x) {
  return Math.floor(x / 5) * 5;
}

function arredondarAcertos(valor) {
  const inteiro = Math.floor(valor);
  const decimal = valor - inteiro;
  return decimal >= 0.6 ? inteiro + 1 : inteiro;
}

function atualizarVisibilidadeCards() {
  const prova = document.getElementById("prova").value;
  const cardNotaFinal = document.getElementById("cardNotaFinal");
  const cardNotaReal = document.getElementById("cardNotaReal");
  const cardAcertos = document.getElementById("cardAcertos");

  if (prova === "redacao") {
    cardNotaReal.style.display = "block";
    cardNotaFinal.style.display = "none";
    cardAcertos.style.display = "none";
  } else {
    cardNotaReal.style.display = "none";
    cardNotaFinal.style.display = "none";
    cardAcertos.style.display = "block";
  }
}

function calcular(mostrarErro = false) {
  const escore = parseFloat(document.getElementById("escore").value);

  if (isNaN(escore)) {
    limparResultado();
    if (mostrarErro) {
      mostrarToast("Digite um escore válido.");
    }
    return;
  }

  if (escore < 0) {
    mostrarToast("O escore não pode ser negativo.");
    return;
  }

  const prova = document.getElementById("prova").value;
  const { media, desvio } = provas[prova];

  const notaCalculada = ((escore - 500) / 100) * desvio + media;
  const notaFinal = arredondarInferior5(notaCalculada);
  const acertos = arredondarAcertos(notaCalculada / 5);

  if (prova === "matematica" || prova === "portugues") {
    if (acertos > 40) {
      document.getElementById("acertos").textContent = "Inválido";
      abrirAlertaCentral("O valor de acertos não pode ser maior que 40.");
      return;
    }
    document.getElementById("acertos").textContent = acertos;
  } else if (prova === "redacao") {
    if (notaCalculada > 100) {
      document.getElementById("notaReal").textContent = "Inválido";
      abrirAlertaCentral("A nota estimada não pode ser maior que 100.");
      return;
    }
    document.getElementById("notaReal").textContent = notaCalculada.toFixed(2);
  }
  
  document.getElementById("notaFinal").textContent = `${notaFinal}%`;
}

function abrirAlertaCentral(mensagem) {
  document.getElementById("textoAlerta").textContent = mensagem;
  document.getElementById("modalAlerta").classList.add("show");
}

function fecharAlertaOk() {
  document.getElementById("modalAlerta").classList.remove("show");
  limparCampos();
}

function limparResultado() {
  document.getElementById("notaFinal").textContent = "--";
  document.getElementById("notaReal").textContent = "--";
  document.getElementById("acertos").textContent = "--";
}

function limparCampos() {
  document.getElementById("escore").value = "";
  limparResultado();
}

function mostrarToast(texto) {
  const toast = document.getElementById("toast");
  toast.textContent = texto;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2300);
}

function abrirModalConfig() {
  document.getElementById("media_matematica").value = provas.matematica.media;
  document.getElementById("desvio_matematica").value = provas.matematica.desvio;
  
  document.getElementById("media_portugues").value = provas.portugues.media;
  document.getElementById("desvio_portugues").value = provas.portugues.desvio;
  
  document.getElementById("media_redacao").value = provas.redacao.media;
  document.getElementById("desvio_redacao").value = provas.redacao.desvio;

  document.getElementById("modalConfig").classList.add("show");
}

function fecharModalConfig() {
  document.getElementById("modalConfig").classList.remove("show");
}

function salvarConfiguracoes() {
  const mMat = parseFloat(document.getElementById("media_matematica").value);
  const dMat = parseFloat(document.getElementById("desvio_matematica").value);
  const mPor = parseFloat(document.getElementById("media_portugues").value);
  const dPor = parseFloat(document.getElementById("desvio_portugues").value);
  const mRed = parseFloat(document.getElementById("media_redacao").value);
  const dRed = parseFloat(document.getElementById("desvio_redacao").value);

  if ([mMat, dMat, mPor, dPor, mRed, dRed].some(isNaN)) {
    mostrarToast("Certifique-se de preencher todos os parâmetros.");
    return;
  }

  provas.matematica.media = mMat;
  provas.matematica.desvio = dMat;
  provas.portugues.media = mPor;
  provas.portugues.desvio = dPor;
  provas.redacao.media = mRed;
  provas.redacao.desvio = dRed;

  fecharModalConfig();
  mostrarToast("Todas as configurações salvas!");
  calcular();
}

function alternarTema() {
  document.body.classList.toggle("light");
  const tema = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem(CHAVE_TEMA, tema);
  atualizarBotaoTema();
}

function carregarTema() {
  const tema = localStorage.getItem(CHAVE_TEMA);
  if (tema === "light") {
    document.body.classList.add("light");
  }
  atualizarBotaoTema();
}

function atualizarBotaoTema() {
  const claro = document.body.classList.contains("light");
  document.getElementById("themeButton").textContent = claro ? "☾" : "☀";
}

document.getElementById("escore").addEventListener("input", () => calcular());

window.addEventListener("load", () => {
  carregarTema();
  atualizarVisibilidadeCards();
});
