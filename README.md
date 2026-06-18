# 📊 Calculadora IFRN

https://vesgucho.github.io/Calc-ifrn/

---

## ✨ Funcionalidades

- **Exibição Condicional de Resultados:**
  - Ao selecionar **Matemática** ou **Português**, a interface foca e exibe exclusivamente o card de **Acertos**.
  - Ao selecionar **Produção Textual**, o sistema oculta os acertos e exibe apenas a **Nota Estimada**.
- **Validação com Bloqueio de Estouro:**
  - Para Matemática e Português, o limite máximo é de **40 acertos**.
  - Para Produção Textual (Redação), a nota máxima estimada é **100**.
  - Caso o escore inserido gere um valor acima desses limites, os cartões mostram a mensagem `Inválido` e uma caixa de diálogo surge no centro da tela alertando o usuário. Ao clicar em **OK**, os campos e resultados são limpos automaticamente.
- **Gerenciamento Unificado de Parâmetros:** O modal da engrenagem permite visualizar e alterar simultaneamente as médias e os desvios padrões de todas as três disciplinas em um só lugar.

---

## 📐 Fórmula Utilizada

A nota inicial é calculada aplicando as regras estatísticas do Escore Padronizado do IFRN:

```math
Nota = \left(\frac{Escore - 500}{100}\right) \times Desvio + Média
