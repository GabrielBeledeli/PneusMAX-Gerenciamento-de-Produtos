// Aguarda o carregamento do DOM para executar o código
document.addEventListener('DOMContentLoaded', () => {
    // Obtém o parâmetro 'id' da URL
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));

    // Recupera os arrays de pneus e especificações do localStorage
    const pneus = JSON.parse(localStorage.getItem('pneus') || '[]');
    const especificacoes = JSON.parse(localStorage.getItem('especificacoes') || '[]');

    // Busca o pneu pelo id e sua especificação correspondente
    const pneu = pneus.find(p => p.id_pneu === id);
    const espec = especificacoes.find(e => e.id_especificacao === pneu?.id_especificacao) || {};

    // Seleciona o elemento da tabela onde os dados serão exibidos
    const tbody = document.getElementById('linha-pneu');

    // Se o pneu não for encontrado, exibe mensagem de erro na tabela
    if (!pneu) {
        tbody.innerHTML = `<tr><td colspan="14">Produto não encontrado.</td></tr>`;
        return;
    }

    // Preenche a tabela com os dados do pneu e suas especificações
    tbody.innerHTML = `
        <tr>
            <td data-label="ID">${pneu.id_pneu}</td>
            <td data-label="Marca">${pneu.marca}</td>
            <td data-label="Modelo">${pneu.modelo}</td>
            <td data-label="Aro">${pneu.aro}</td>
            <td data-label="Medida">${pneu.medida}</td>
            <td data-label="Preço">R$ ${pneu.preco.toFixed(2)}</td>
            <td data-label="Estoque">${pneu.quantidade_estoque}</td>
            <td data-label="Largura">${espec.largura || '-'}</td>
            <td data-label="Perfil">${espec.perfil || '-'}</td>
            <td data-label="Índice de Peso">${espec.indice_peso || '-'}</td>
            <td data-label="Índice de Velocidade">${espec.indice_velocidade || '-'}</td>
            <td data-label="Tipo de Construção">${espec.tipo_construcao || '-'}</td>
            <td data-label="Tipo de Terreno">${espec.tipo_terreno || '-'}</td>
            <td data-label="Desenho">${espec.desenho || '-'}</td>
        </tr>
    `;
});

// Função chamada ao confirmar a exclusão do pneu
function confirmarExclusao() {
    // Obtém o parâmetro 'id' da URL
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));

    // Recupera os arrays de pneus, especificações e logs do localStorage
    let pneus = JSON.parse(localStorage.getItem('pneus') || '[]');
    let especificacoes = JSON.parse(localStorage.getItem('especificacoes') || '[]');
    let logs = JSON.parse(localStorage.getItem('log_acoes') || '[]');
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado'));

    // Busca o pneu pelo id
    const pneu = pneus.find(p => p.id_pneu === id);
    if (!pneu) {
        alert('Produto não encontrado.');
        return;
    }

    // Remove o pneu e sua especificação dos arrays
    pneus = pneus.filter(p => p.id_pneu !== id);
    especificacoes = especificacoes.filter(e => e.id_especificacao !== pneu.id_especificacao);

    // Cria um novo log de exclusão
    const novoIdLog = logs.length ? Math.max(...logs.map(l => l.id_log)) + 1 : 1;
    const novoLog = {
        id_log: novoIdLog,
        id_pneu: pneu.id_pneu,
        id_usuario: usuarioLogado?.id_usuario || null,
        acao: 'Exclusão',
        data_hora: new Date().toISOString()
    };
    logs.push(novoLog);

    // Atualiza os dados no localStorage
    localStorage.setItem('pneus', JSON.stringify(pneus));
    localStorage.setItem('especificacoes', JSON.stringify(especificacoes));
    localStorage.setItem('log_acoes', JSON.stringify(logs));

    // Exibe mensagem de sucesso e redireciona para a página inicial
    alert('Produto excluído com sucesso!');
    window.location.href = 'index_home.html';
}