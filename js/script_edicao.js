// Função para extrair query string
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Carregar dados do produto e preencher formulário
function carregarProduto() {
  const idPneu = parseInt(getQueryParam('id'));
  if (!idPneu) {
    alert('Produto inválido!');
    window.location.href = 'index_home.html';
    return;
  }

  const pneus = JSON.parse(localStorage.getItem('pneus')) || [];
  const especificacoes = JSON.parse(localStorage.getItem('especificacoes')) || [];

  // Buscar pneu pelo id_pneu
  const pneu = pneus.find(p => p.id_pneu === idPneu);
  if (!pneu) {
    alert('Produto não encontrado!');
    window.location.href = 'index_home.html';
    return;
  }

  // Buscar especificação pelo id_especificacao igual ao id da URL
  const espec = especificacoes.find(e => e.id_especificacao === idPneu) || {};

  // Preencher campos do produto
  document.getElementById('marca').value = pneu.marca;
  document.getElementById('modelo').value = pneu.modelo;
  document.getElementById('aro').value = pneu.aro;
  document.getElementById('medida').value = pneu.medida;
  document.getElementById('preco').value = pneu.preco;
  document.getElementById('quantidade_estoque').value = pneu.quantidade_estoque;

  // Preencher campos da especificação
  document.getElementById('largura').value = espec.largura || '';
  document.getElementById('perfil').value = espec.perfil || '';
  document.getElementById('indice_peso').value = espec.indice_peso || '';
  document.getElementById('indice_velocidade').value = espec.indice_velocidade || '';
  document.getElementById('tipo_construcao').value = espec.tipo_construcao || '';
  document.getElementById('tipo_terreno').value = espec.tipo_terreno || '';
  document.getElementById('desenho').value = espec.desenho || '';
}

// Salvar alterações no localStorage e atualizar log
function salvarAlteracoes(event) {
  event.preventDefault();

  const idPneu = parseInt(getQueryParam('id'));
  const pneus = JSON.parse(localStorage.getItem('pneus')) || [];
  const especificacoes = JSON.parse(localStorage.getItem('especificacoes')) || [];
  const logs = JSON.parse(localStorage.getItem('log_acoes')) || [];
  const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado')) || null;

  // Buscar pneu e especificação para atualizar
  const pneuIndex = pneus.findIndex(p => p.id_pneu === idPneu);
  if (pneuIndex === -1) {
    alert('Produto não encontrado!');
    return;
  }

  const especIndex = especificacoes.findIndex(e => e.id_especificacao === idPneu);

  // Pegar valores do formulário para pneu
  const updatedPneu = {
    ...pneus[pneuIndex],
    marca: document.getElementById('marca').value.trim(),
    modelo: document.getElementById('modelo').value.trim(),
    aro: parseInt(document.getElementById('aro').value),
    medida: document.getElementById('medida').value.trim(),
    preco: parseFloat(document.getElementById('preco').value),
    quantidade_estoque: parseInt(document.getElementById('quantidade_estoque').value),
  };

  // Pegar valores do formulário para especificação
  const updatedEspec = {
    id_especificacao: idPneu,  // id da URL, que corresponde ao id_especificacao
    largura: document.getElementById('largura').value.trim(),
    perfil: document.getElementById('perfil').value.trim(),
    indice_peso: document.getElementById('indice_peso').value.trim(),
    indice_velocidade: document.getElementById('indice_velocidade').value.trim(),
    tipo_construcao: document.getElementById('tipo_construcao').value.trim(),
    tipo_terreno: document.getElementById('tipo_terreno').value.trim(),
    desenho: document.getElementById('desenho').value.trim(),
  };

  // Atualizar arrays
  pneus[pneuIndex] = updatedPneu;

  if (especIndex !== -1) {
    especificacoes[especIndex] = updatedEspec;
  } else {
    especificacoes.push(updatedEspec);
  }

  localStorage.setItem('pneus', JSON.stringify(pneus));
  localStorage.setItem('especificacoes', JSON.stringify(especificacoes));

  // Atualizar log
  const novoIdLog = logs.length ? Math.max(...logs.map(l => l.id_log)) + 1 : 1;
  const novoLog = {
    id_log: novoIdLog,
    id_pneu: updatedPneu.id_pneu,
    id_usuario: usuarioLogado?.id_usuario || null,
    acao: 'Edição',
    data_hora: new Date().toISOString()
  };
  logs.push(novoLog);
  localStorage.setItem('log_acoes', JSON.stringify(logs));

  alert('Produto atualizado com sucesso!');
  window.location.href = 'index_home.html';
}

// Cancelar edição - voltar à home
function cancelarEdicao() {
  if (confirm('Deseja cancelar a edição? As alterações não serão salvas.')) {
    window.location.href = 'index_home.html';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  carregarProduto();

  document.getElementById('formEditarProduto').addEventListener('submit', salvarAlteracoes);
  document.getElementById('btnCancelar').addEventListener('click', cancelarEdicao);
});
