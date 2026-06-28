# GeekCon Brasil 2026 - Portal de Eventos Geek

Website responsivo para divulgacao do evento **GeekCon Brasil 2026**, desenvolvido com HTML, CSS e JavaScript puro.

## Estrutura do Projeto

```
/
├── index.html          # Pagina Inicial (Home)
├── atracoes.html       # Pagina de Atracoes
├── cronograma.html     # Pagina de Cronograma
├── cadastro.html       # Pagina de Pre-Cadastro
├── css/
│   └── style.css       # Folha de estilos externa
├── js/
│   └── script.js       # JavaScript com as 4 funcionalidades
└── img/                # Pasta para imagens
```

## Paginas

### 1. Pagina Inicial (`index.html`)
- **Banner principal** com nome do evento, data e descricao
- **Botoes de acao**: "Inscreva-se" e "Ver Atracoes"
- **Contador de inscritos** ficticio com botao "Participar"
- **Secao "Sobre o Evento"** com 4 cards informativos (Grid 4 colunas)
- **Secao "Destaques"** com 3 cards (Flexbox)
- **Rodape** com navegacao, contato e redes sociais (Grid 4 colunas)

### 2. Pagina de Atracoes (`atracoes.html`)
- **8 atracoes** apresentadas em cards com Grid (`auto-fill, minmax(320px, 1fr)`)
- Cada card possui: imagem colorida com icone, nome, tipo, descricao
- **Botao "Mais Informacoes"** que exibe/oculta detalhes extras (Data, Local, Duracao e descricao completa)
- Layout responsivo: 3 colunas no desktop, 1 coluna no mobile

### 3. Pagina de Cronograma (`cronograma.html`)
- **4 dias de programacao** (Quinta a Domingo)
- Cada dia com uma **tabela** contendo colunas: Horario, Atividade, Local
- ~7 atividades por dia, totalizando 28 itens
- Linhas alternadas com cores diferentes (`nth-child(even)`)

### 4. Pagina de Pre-Cadastro (`cadastro.html`)
- **Formulario** com 5 campos: Nome, E-mail, Cidade, Faixa Etaria (select), Evento de Interesse (select)
- **Validacao JavaScript** com mensagens de erro individuais
- **Mensagem de sucesso** apos envio valido
- **Contador de inscritos** atualizado apos cadastro

## Requisitos CSS Implementados

| Requisito | Onde foi usado |
|---|---|
| **CSS externo** | `css/style.css` - arquivo unico para todas as paginas |
| **Seletores por tag** | `html`, `body`, `a`, `h1`-`h4`, `th`, `td`, `input`, `select`, `textarea`, `label` |
| **Seletores por classe** | `.container`, `.btn`, `.hero`, `.atracao-card`, `.section`, `.nav-links` |
| **Seletores por ID** | `#header`, `#navbar`, `#banner`, `#rodape`, `#cadastroForm`, `#themeToggle` |
| **Pseudo-classes** | `:hover`, `:focus`, `:active`, `:first-child`, `:last-child`, `:nth-child(even)`, `:not()` |
| **Pseudo-elementos** | `::before`, `::after` (underline de links, decoracoes) |
| **Google Fonts** | `Orbitron` (titulos) e `Inter` (corpo do texto) |
| **Font Awesome** | Icones em navegacao, cards, formulario, rodape (v6.5.1 via CDN) |
| **Position** | `fixed` (header/navbar), `absolute` (badges, overlays), `relative` (containers) |
| **Flexbox** | Navegacao, botoes do hero, destaques, alinhamentos internos |
| **Grid** | Cards de descricao (4 cols), atracoes (auto-fill), rodape (4 cols) |

## Funcionalidades JavaScript

### Funcionalidade 1 - Exibir/Ocultar Informacoes
**Arquivo:** `js/script.js` | **Pagina:** `atracoes.html`

Cada atracao possui um botao "Mais Informacoes" que, ao ser clicado:
- Mostra/esconde a secao `div.atracao-extra` usando a classe `.visivel`
- Altera o texto do botao entre "Mais Informacoes" e "Ocultar Informacoes"
- Troca o icone entre `fa-eye` e `fa-eye-slash`

```javascript
// Seleciona todos os botoes de toggle
var botoesToggle = document.querySelectorAll(".btn-toggle");
botoesToggle.forEach(function (botao) {
  botao.addEventListener("click", function () {
    var targetId = botao.getAttribute("data-target");
    var extraInfo = document.getElementById(targetId);
    extraInfo.classList.toggle("visivel");
    // Atualiza texto e icone do botao
  });
});
```

### Funcionalidade 2 - Validacao do Formulario
**Arquivo:** `js/script.js` | **Pagina:** `cadastro.html`

O formulario `#cadastroForm` valida ao enviar:
- **Nome**: minimo 3 caracteres
- **E-mail**: formato valido (regex)
- **Cidade**: minimo 2 caracteres
- **Faixa Etaria**: deve selecionar uma opcao
- **Evento**: deve selecionar uma opcao

Se invalido, mostra mensagens de erro em vermelho abaixo de cada campo.
Se valido, mostra mensagem de sucesso em verde e limpa o formulario.

```javascript
var cadastroForm = document.getElementById("cadastroForm");
cadastroForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // Valida cada campo
  // Se valido: mostra sucesso, incrementa contador, limpa formulario
});
```

### Funcionalidade 3 - Contador de Inscritos
**Arquivo:** `js/script.js` | **Paginas:** `index.html` e `cadastro.html`

- Inicia com valor padrao de **150**
- O botao "Participar" na pagina inicial incrementa o contador
- O envio do formulario de cadastro tambem incrementa
- O valor e salvo em `localStorage("contadorInscritos")` para persistir entre paginas e recarregamentos

```javascript
var contadorValor = 150;
var contadorSalvo = localStorage.getItem("contadorInscritos");
if (contadorSalvo) {
  contadorValor = parseInt(contadorSalvo);
}
// Ao clicar "Participar": contadorValor++, salva no localStorage
```

### Funcionalidade 4 - Alternancia de Tema
**Arquivo:** `js/script.js` | **Todas as paginas**

- Botao no header alterna entre tema escuro (padrao) e claro
- Adiciona/remove a classe `body.tema-claro`
- O CSS usa variaveis (`--cor-fundo`, `--cor-texto`, etc.) que mudam com a classe
- Preferencia salva em `localStorage("tema")` para persistir entre paginas
- Icone alterna entre lua (`fa-moon`) e sol (`fa-sun`)

```javascript
themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("tema-claro");
  var isClaro = document.body.classList.contains("tema-claro");
  localStorage.setItem("tema", isClaro ? "claro" : "escuro");
  // Atualiza icone
});
```

## Design e Cores

- **Cor primaria:** `#7c3aed` (roxo)
- **Cor secundaria:** `#06b6d4` (ciano)
- **Cor de acento:** `#f59e0b` (ambar)
- **Tema escuro:** fundo `#0f0f1a`, cards `#1a1a2e`
- **Tema claro:** fundo `#f1f5f9`, cards `#ffffff`

## Responsividade

O site utiliza 3 breakpoints:
- **992px**: ajustes para tablet (grid de 2 colunas)
- **768px**: menu mobile (hamburguer), grid de 1 coluna
- **480px**: reducao de fontes para telas pequenas

## Tecnologias Utilizadas

- **HTML5** - Estrutura semantica
- **CSS3** - Estilizacao com Grid, Flexbox, variaveis CSS, animacoes
- **JavaScript** (vanilla) - Interatividade sem frameworks
- **Google Fonts** - Orbitron e Inter
- **Font Awesome 6.5.1** - Icones via CDN

## Como Executar

1. Clone o repositorio
2. Abra o arquivo `index.html` no navegador

Ou use um servidor local:
```bash
python3 -m http.server 8080
# Acesse http://localhost:8080
```

## Autor

Desenvolvido como projeto da disciplina de Desenvolvimento de Sistemas.
