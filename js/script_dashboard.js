const pneus = JSON.parse(localStorage.getItem('pneus')) || [];
const logs = JSON.parse(localStorage.getItem('log_acoes')) || [];

// Gráfico 1 - Estoque por Marca
function graficoEstoqueMarca() {
  const dados = {};
  pneus.forEach(p => {
    dados[p.marca] = (dados[p.marca] || 0) + p.quantidade_estoque;
  });

  new Chart(document.getElementById('graficoMarca'), {
    type: 'pie',
    data: {
      labels: Object.keys(dados),
      datasets: [{
        data: Object.values(dados),
        backgroundColor: ['#CF291D', '#ECECEC', '#1D1D1D', '#777']
      }]
    }
  });
}

// Gráfico 2 - Estoque por Aro
function graficoEstoqueAro() {
  const dados = {};
  pneus.forEach(p => {
    dados[p.aro] = (dados[p.aro] || 0) + p.quantidade_estoque;
  });

  new Chart(document.getElementById('graficoAro'), {
    type: 'bar',
    data: {
      labels: Object.keys(dados),
      datasets: [{
        label: 'Qtd em Estoque',
        data: Object.values(dados),
        backgroundColor: '#CF291D'
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// Gráfico 3 - Produtos com Estoque Baixo (< 5)
function graficoEstoqueBaixo() {
  const baixos = pneus.filter(p => p.quantidade_estoque < 5);

  new Chart(document.getElementById('graficoEstoqueBaixo'), {
    type: 'bar',
    data: {
      labels: baixos.map(p => p.modelo),
      datasets: [{
        label: 'Qtd Estoque',
        data: baixos.map(p => p.quantidade_estoque),
        backgroundColor: 'rgba(255, 0, 0, 0.6)'
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// Gráfico 4 - Tendência de Alterações por Dia
function graficoTendenciaAlteracoes() {
  const alteracoesPorDia = {};

  logs.forEach(log => {
    const dia = new Date(log.data_hora).toISOString().split('T')[0];
    alteracoesPorDia[dia] = (alteracoesPorDia[dia] || 0) + 1;
  });

  const dias = Object.keys(alteracoesPorDia).sort();

  new Chart(document.getElementById('graficoAlteracoes'), {
    type: 'line',
    data: {
      labels: dias,
      datasets: [{
        label: 'Alterações por Dia',
        data: dias.map(d => alteracoesPorDia[d]),
        borderColor: '#CF291D',
        fill: false,
        tension: 0.2
      }]
    }
  });
}

// Inicializa todos os gráficos
graficoEstoqueMarca();
graficoEstoqueAro();
graficoEstoqueBaixo();
graficoTendenciaAlteracoes();
