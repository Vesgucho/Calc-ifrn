const CHAVE_TEMA = "ifrn_tema";

const provas = {
  matematica: {
    media: 50.1263,
    desvio: 23.9604
  },

  portugues: {
    media: 53.9394,
    desvio: 24.1342
  },

  redacao: {
    media: 62.2584,
    desvio: 20.1949
  }
};

function arredondarInferior5(x) {
  return Math.floor(x / 5) * 5;
}

function calcular(mostrarErro = false) {

  const escore =
    parseFloat(
      document.getElementById("escore").value
    );

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

  const prova =
    document.getElementById("prova").value;

  const { media, desvio } = provas[prova];

  const notaCalculada =
    ((escore - 500) / 100) *
    desvio +
    media;

  const notaFinal =
    arredondarInferior5(notaCalculada);

  const acertos =
    Math.floor(notaCalculada / 5);

  document.getElementById("notaFinal")
    .textContent = `${notaFinal}%`;

  document.getElementById("notaReal")
    .textContent = notaCalculada.toFixed(2);

  document.getElementById("acertos")
    .textContent = acertos;
}

function limparResultado() {

  document.getElementById("notaFinal")
    .textContent = "--";

  document.getElementById("notaReal")
    .textContent = "--";

  document.getElementById("acertos")
    .textContent = "--";
}

function limparCampos() {

  document.getElementById("escore").value = "";

  limparResultado();

  mostrarToast("Campo limpo.");
}

function mostrarToast(texto) {

  const toast =
    document.getElementById("toast");

  toast.textContent = texto;

  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2300);
}

function alternarTema() {

  document.body.classList.toggle("light");

  const tema =
    document.body.classList.contains("light")
      ? "light"
      : "dark";

  localStorage.setItem(CHAVE_TEMA, tema);

  atualizarBotaoTema();
}

function carregarTema() {

  const tema =
    localStorage.getItem(CHAVE_TEMA);

  if (tema === "light") {
    document.body.classList.add("light");
  }

  atualizarBotaoTema();
}

function atualizarBotaoTema() {

  const claro =
    document.body.classList.contains("light");

  document.getElementById("themeButton")
    .textContent = claro ? "☾" : "☀";
}

document
  .getElementById("escore")
  .addEventListener("input", () => calcular());

window.addEventListener("load", () => {
  carregarTema();
});
