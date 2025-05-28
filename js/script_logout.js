// Função para fazer logout removendo o usuário logado do localStorage e redirecionando para o login
function logout() {
  localStorage.removeItem('usuario_logado');
  window.location.href = 'index_login.html';
}

// Executa apenas quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado'));

  // Verifica se tem usuário logado
  if (usuarioLogado && usuarioLogado.usuario) {
    const nomeUsuarioEl = document.getElementById('nomeUsuario');
    if (nomeUsuarioEl) {
      nomeUsuarioEl.textContent = usuarioLogado.usuario;
    }
  } else {
    // Redireciona se não tiver login
    window.location.href = 'index_login.html';
  }

  // Adiciona o event listener de logout se o botão existir
  const btnLogout = document.getElementById('btnLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', logout);
  }
});
