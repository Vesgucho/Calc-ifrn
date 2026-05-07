const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Médias e desvios
let provas = {
  matematica: { media: 50.1263, desvio: 23.9604 },
  portugues: { media: 53.9394, desvio: 24.1342 },
  redacao: { media: 62.2584, desvio: 20.1949 }
};

// Função de arredondamento inferior múltiplo de 5
function arredondarInferior5(x) {
  return Math.floor(x / 5) * 5;
}

// Endpoint para calcular
app.post('/calcular', (req, res) => {
  const { prova, escore, valor } = req.body;

  if (!prova || isNaN(escore) || (prova !== 'redacao' && isNaN(valor))) {
    return res.status(400).json({ error: 'Parâmetros inválidos.' });
  }

  const { media, desvio } = provas[prova];
  let resultado = {};

  if (prova === 'redacao') {
    let nota = ((escore - 500)/100) * desvio + media;
    nota = Math.max(0, Math.min(100, Math.round(nota))); // 0 a 100 e arredonda
    resultado = { nota: `${nota}.0` };
  } else {
    let notaCalculada = ((escore - 500)/100) * desvio + media;
    let notaFinal = arredondarInferior5(notaCalculada);
    let acertos = Math.floor(notaCalculada / valor);
    resultado = {
      nota: `${notaFinal}.0`,
      acertos: `${acertos}.0`
    };
  }

  res.json(resultado);
});

// Endpoint para atualizar médias/desvios
app.post('/configurar', (req, res) => {
  const { matematica, portugues, redacao } = req.body;
  if (matematica) provas.matematica = matematica;
  if (portugues) provas.portugues = portugues;
  if (redacao) provas.redacao = redacao;
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));