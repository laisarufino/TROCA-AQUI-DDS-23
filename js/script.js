// =============================================
// JavaScript - GeekCon Brasil 2026
// Funcionalidades:
// 1. Exibir/ocultar informacoes de atracoes
// 2. Validacao do formulario + mensagem de sucesso
// 3. Contador de inscritos ficticio
// 4. Alteracao dinamica de tema (claro/escuro)
// =============================================

// ===== MENU MOBILE =====
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {
  menuToggle.addEventListener("click", function () {
    navbar.classList.toggle("open");
  });

  // Fechar menu ao clicar em um link
  const navLinks = navbar.querySelectorAll("a");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navbar.classList.remove("open");
    });
  });
}

// ===== HEADER COM SCROLL =====
const header = document.getElementById("header");

window.addEventListener("scroll", function () {
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});

// =============================================
// FUNCIONALIDADE 4: ALTERACAO DINAMICA DE TEMA
// =============================================
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Carregar tema salvo
function carregarTema() {
  var temaSalvo = localStorage.getItem("tema");
  if (temaSalvo === "claro") {
    document.body.classList.add("tema-claro");
    if (themeIcon) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    }
  }
}

carregarTema();

if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("tema-claro");

    var isClaro = document.body.classList.contains("tema-claro");
    localStorage.setItem("tema", isClaro ? "claro" : "escuro");

    if (themeIcon) {
      if (isClaro) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
      } else {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
      }
    }
  });
}

// =============================================
// FUNCIONALIDADE 1: EXIBIR/OCULTAR INFORMACOES
// =============================================
var botoesToggle = document.querySelectorAll(".btn-toggle");

botoesToggle.forEach(function (botao) {
  botao.addEventListener("click", function () {
    var targetId = botao.getAttribute("data-target");
    var extraInfo = document.getElementById(targetId);

    if (extraInfo) {
      extraInfo.classList.toggle("visivel");

      // Atualizar texto do botao
      var icone = botao.querySelector("i");
      if (extraInfo.classList.contains("visivel")) {
        if (icone) {
          icone.classList.remove("fa-eye");
          icone.classList.add("fa-eye-slash");
        }
        botao.childNodes[botao.childNodes.length - 1].textContent = " Ocultar Informacoes";
      } else {
        if (icone) {
          icone.classList.remove("fa-eye-slash");
          icone.classList.add("fa-eye");
        }
        botao.childNodes[botao.childNodes.length - 1].textContent = " Mais Informacoes";
      }
    }
  });
});

// =============================================
// FUNCIONALIDADE 3: CONTADOR DE INSCRITOS
// =============================================
var contadorValor = 150;

// Atualizar todos os contadores na pagina
function atualizarContadores() {
  var contadorHome = document.getElementById("contadorNumero");
  var contadorCadastro = document.getElementById("contadorNumeroCadastro");

  if (contadorHome) {
    contadorHome.textContent = contadorValor;
  }
  if (contadorCadastro) {
    contadorCadastro.textContent = contadorValor;
  }
}

// Carregar contador salvo
var contadorSalvo = localStorage.getItem("contadorInscritos");
if (contadorSalvo) {
  contadorValor = parseInt(contadorSalvo);
}
atualizarContadores();

// Botao "Participar" na home
var btnParticipar = document.getElementById("btnParticipar");

if (btnParticipar) {
  btnParticipar.addEventListener("click", function () {
    contadorValor++;
    localStorage.setItem("contadorInscritos", contadorValor);
    atualizarContadores();

    // Feedback visual
    btnParticipar.textContent = "Voce participou!";
    btnParticipar.disabled = true;
    btnParticipar.style.opacity = "0.7";

    setTimeout(function () {
      btnParticipar.innerHTML = '<i class="fa-solid fa-hand-point-up"></i> Participar';
      btnParticipar.disabled = false;
      btnParticipar.style.opacity = "1";
    }, 2000);
  });
}

// =============================================
// FUNCIONALIDADE 2: VALIDACAO DO FORMULARIO
// =============================================
var cadastroForm = document.getElementById("cadastroForm");

if (cadastroForm) {
  cadastroForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var valido = true;

    // Pegar campos
    var nome = document.getElementById("nome");
    var email = document.getElementById("email");
    var cidade = document.getElementById("cidade");
    var faixaEtaria = document.getElementById("faixaEtaria");
    var evento = document.getElementById("evento");

    // Pegar spans de erro
    var erroNome = document.getElementById("erroNome");
    var erroEmail = document.getElementById("erroEmail");
    var erroCidade = document.getElementById("erroCidade");
    var erroFaixa = document.getElementById("erroFaixa");
    var erroEvento = document.getElementById("erroEvento");

    // Limpar erros
    erroNome.textContent = "";
    erroEmail.textContent = "";
    erroCidade.textContent = "";
    erroFaixa.textContent = "";
    erroEvento.textContent = "";

    // Validar nome
    if (!nome.value.trim() || nome.value.trim().length < 3) {
      erroNome.textContent = "Por favor, informe seu nome completo (minimo 3 caracteres).";
      valido = false;
    }

    // Validar email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
      erroEmail.textContent = "Por favor, informe um e-mail valido.";
      valido = false;
    }

    // Validar cidade
    if (!cidade.value.trim() || cidade.value.trim().length < 2) {
      erroCidade.textContent = "Por favor, informe sua cidade.";
      valido = false;
    }

    // Validar faixa etaria
    if (!faixaEtaria.value) {
      erroFaixa.textContent = "Por favor, selecione sua faixa etaria.";
      valido = false;
    }

    // Validar evento de interesse
    if (!evento.value) {
      erroEvento.textContent = "Por favor, selecione um evento de interesse.";
      valido = false;
    }

    // Se tudo valido, mostrar sucesso
    if (valido) {
      var formSucesso = document.getElementById("formSucesso");
      formSucesso.textContent = "Pre-cadastro realizado com sucesso! Nos vemos no GeekCon 2026!";

      // Incrementar contador
      contadorValor++;
      localStorage.setItem("contadorInscritos", contadorValor);
      atualizarContadores();

      // Limpar formulario
      cadastroForm.reset();

      // Remover mensagem apos 5 segundos
      setTimeout(function () {
        formSucesso.textContent = "";
      }, 5000);
    }
  });
}
