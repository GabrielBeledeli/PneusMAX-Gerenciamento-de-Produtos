// Verifica se a chave "usuarios" já existe no localStorage
if (!localStorage.getItem('usuarios')) {
  // Se não existir, cria com os dados iniciais
  const usuariosIniciais = [
    { id_usuario: 1, usuario: "gabriel_hul", senha: "gabriel123" },
    { id_usuario: 2, usuario: "caio_gemin", senha: "caio123" },
    { id_usuario: 3, usuario: "teste_di", senha: "teste123"}
  ];
  localStorage.setItem('usuarios', JSON.stringify(usuariosIniciais));
  console.log("Usuários padrão inseridos no localStorage.");
}

document.getElementById('loginForm').addEventListener('submit', function (e) {
  // Impede o comportamento padrão do formulário (recarregar a página)
  e.preventDefault();

  // Pega o valor digitado no campo usuário, removendo espaços em branco no início e no fim
  const usuarioDigitado = document.getElementById('usuario').value.trim();
  // Pega o valor digitado no campo senha, removendo espaços em branco no início e no fim
  const senhaDigitada = document.getElementById('senha').value.trim();
  // Referência ao elemento onde serão exibidas mensagens de erro
  const erroMsg = document.getElementById('erro-login');

  // Busca a lista de usuários armazenada no localStorage (ou retorna array vazio se não existir)
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Procura na lista de usuários um que tenha usuário e senha iguais aos digitados
  const usuarioValido = usuarios.find(u => u.usuario === usuarioDigitado && u.senha === senhaDigitada);

  if (usuarioValido) {
    // Se encontrou usuário válido, salva as credenciais no localStorage (pode ser para controle de sessão)
    localStorage.setItem('usuario_logado', JSON.stringify({
      id_usuario: usuarioValido.id_usuario,
      usuario: usuarioValido.usuario,
      senha: usuarioValido.senha
    }));
    // Redireciona para a página principal do sistema
    window.location.href = 'index_home.html';
  } else {
    // Se não encontrou usuário válido, exibe mensagem de erro na tela
    erroMsg.textContent = "Usuário ou senha inválidos.";
  }
});
