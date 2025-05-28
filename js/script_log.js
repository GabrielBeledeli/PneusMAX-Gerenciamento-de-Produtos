document.addEventListener('DOMContentLoaded', () => {
  // Pega o array de logs do localStorage, ou um array vazio caso não exista
  const logAcoes = JSON.parse(localStorage.getItem('log_acoes') || '[]');
  // Pega o array de usuários do localStorage, ou vazio
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  // Pega o array de pneus do localStorage, ou vazio
  const pneus = JSON.parse(localStorage.getItem('pneus') || '[]');

  // Seleciona o elemento tbody da tabela onde os logs serão exibidos
  const tbody = document.getElementById('tbody-log');
  // Limpa o conteúdo atual da tabela para evitar duplicação
  tbody.innerHTML = '';

  // Para cada registro de log, cria uma linha na tabela
  logAcoes.forEach(log => {
    // Busca o usuário correspondente ao id_usuario do log
    const usuario = usuarios.find(u => u.id_usuario === log.id_usuario);
    // Busca o pneu correspondente ao id_pneu do log (pode ser undefined)
    const pneu = pneus.find(p => p.id_pneu === log.id_pneu);

    // Cria o elemento tr (linha da tabela)
    const tr = document.createElement('tr');

    // Define o conteúdo da linha, usando dados do log, pneu e usuário
    tr.innerHTML = `
      <td data-label="ID Log">${log.id_log}</td>
      <td data-label="ID Pneu">${log.id_pneu || '-'}</td>
      <td data-label="Usuário">${usuario ? usuario.usuario : 'Desconhecido'}</td>
      <td data-label="Ação">${log.acao}</td>
      <td data-label="Data/Hora">${new Date(log.data_hora).toLocaleString()}</td>
    `;

    // Adiciona a linha criada ao corpo da tabela
    tbody.appendChild(tr);
  });
});
