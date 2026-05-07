# 📊 Calculadora IFRN-CNAT

Uma calculadora web simples e estilizada para estimar a **nota bruta** e a quantidade de **acertos estimados** a partir do **Escore Padronizado** utilizado no processo seletivo do IFRN.

---

## ✨ Funcionalidades

- Seleção entre:
  - Matemática
  - Português
  - Produção Textual
- Conversão automática de escore padronizado em nota bruta
- Estimativa de acertos baseada no valor da questão
- Interface moderna com tema roxo
- Sistema de configuração de média e desvio padrão
- Cálculo automático ao abrir a página

---

## 🖥️ Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript Vanilla

---

## 📐 Fórmula Utilizada

A nota é calculada usando a fórmula:

```math
Nota = \left(\frac{Escore - 500}{100}\right) \times Desvio + Média
```

Depois disso:

- A nota é arredondada para baixo em múltiplos de 5
- Os acertos estimados são calculados dividindo a nota pelo valor da questão

---

## 🎨 Interface

A calculadora possui:

- Design responsivo
- Cartões interativos para resultados
- Modal de configurações
- Tema inspirado nas cores do IFRN

---

## ⚙️ Configurações

A engrenagem no canto superior permite alterar:

- Média das provas
- Desvio padrão das provas

Isso facilita adaptar a calculadora para diferentes edições do processo seletivo.

---

## 🚀 Como Usar

1. Baixe o projeto
2. extraia e abra no seu editor de código-fonte
3. Escolha a matéria
4. Digite o escore
5. Informe o valor da questão (padrão 5)
6. Clique em **Calcular**

---

## 💡 Possíveis Melhorias Futuras

- Salvar configurações no navegador usando LocalStorage
- Tema claro/escuro
- Histórico de cálculos
- Responsividade mobile aprimorada
- Conversão automática de acertos para escore

---

## 👨‍💻 Autor

Projeto desenvolvido para auxiliar estudantes do IFRN.

---

## 📜 Licença

Este projeto está sob a licença MIT.  
Sinta-se livre para usar, modificar e compartilhar.
