// Seleciona o botão do menu e o header
const menuToggle = document.getElementById("menu-toggle");
const header = document.querySelector("header");

// Ao clicar no botão, alterna a classe que mostra/esconde o menu
menuToggle.addEventListener("click", () => {
    header.classList.toggle("menu-ativo");
});
