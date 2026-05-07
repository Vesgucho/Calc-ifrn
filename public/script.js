async function calcular() {
  const prova = document.getElementById('prova').value;
  const escore = parseFloat(document.getElementById('escore').value);
  const valor = parseFloat(document.getElementById('valor').value);

  const resposta = await fetch('/calcular', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prova, escore, valor })
  });

  const resultado = await resposta.json();

  let html = '';
  if (prova === 'redacao') {
    html = `<div class="card">📝 Nota Redação: ${resultado.nota} / 100</div>`;
  } else {
    html = `
      <div class="card">📊 Nota Bruta: ${resultado.nota}%</div>
      <div class="card">✅ Acertos Estimados: ${resultado.acertos}</div>
    `;
  }

  document.getElementById('resultado').innerHTML = html;
}