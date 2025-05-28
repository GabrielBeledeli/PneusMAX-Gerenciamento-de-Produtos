document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o formulário de cadastro pelo ID
    const form = document.getElementById('formCadastro');

    // Busca o usuário logado no localStorage
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado'));
    if (usuarioLogado) {
        // Se existe, exibe o nome do usuário em um elemento com id 'nomeUsuario'
        document.getElementById('nomeUsuario').textContent = usuarioLogado.usuario;
    } else {
        // Se não existe usuário logado, redireciona para a página de login
        window.location.href = 'index_login.html';
    }

    // Adiciona listener para o evento de envio do formulário
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevê o comportamento padrão de recarregar a página

        // Coleta e limpa os valores dos campos do formulário
        const marca = document.getElementById('marca').value.trim();
        const modelo = document.getElementById('modelo').value.trim();
        const aro = parseInt(document.getElementById('aro').value);
        const medida = document.getElementById('medida').value.trim();
        const preco = parseFloat(document.getElementById('preco').value);
        const quantidade = parseInt(document.getElementById('quantidade').value);

        const largura = parseInt(document.getElementById('largura').value);
        const perfil = document.getElementById('perfil').value.trim();
        // Campos opcionais recebem valor padrão caso vazios
        const indicePeso = document.getElementById('indicePeso').value.trim() || 'Não Especificado';
        const indiceVelocidade = document.getElementById('indiceVelocidade').value.trim() || 'Não Especificado';
        const construcao = document.getElementById('construcao').value.trim();
        const terreno = document.getElementById('terreno').value.trim() || 'Não Especificado';
        const desenho = document.getElementById('desenho').value.trim();

        // Valida campos obrigatórios, alerta e interrompe se algum não preenchido ou inválido
        if (!marca || !modelo || !medida || !perfil || !construcao || !desenho || isNaN(aro) || isNaN(preco) || isNaN(quantidade) || isNaN(largura)) {
            alert('Preencha todos os campos obrigatórios.');
            return;
        }

        // Recupera os arrays armazenados no localStorage, ou inicializa vazios
        const pneus = JSON.parse(localStorage.getItem('pneus')) || [];
        const especificacoes = JSON.parse(localStorage.getItem('especificacoes')) || [];
        const logs = JSON.parse(localStorage.getItem('log_acoes')) || [];

        // Calcula novos IDs
        // Para especificações
        let ultimoIdEspecificacao = parseInt(localStorage.getItem('ultimoIdEspecificacao') || '0');
        const novoIdEspecificacao = ultimoIdEspecificacao + 1;
        localStorage.setItem('ultimoIdEspecificacao', novoIdEspecificacao.toString());

        // Para pneus
        let ultimoIdPneu = parseInt(localStorage.getItem('ultimoIdPneu') || '0');
        const novoIdPneu = ultimoIdPneu + 1;
        localStorage.setItem('ultimoIdPneu', novoIdPneu.toString());
        const novoIdLog = logs.length ? Math.max(...logs.map(l => l.id_log)) + 1 : 1;

        // Cria objeto de especificação com os dados coletados
        const novaEspecificacao = {
            id_especificacao: novoIdEspecificacao,
            largura,
            perfil,
            indice_peso: indicePeso,
            indice_velocidade: indiceVelocidade,
            tipo_construcao: construcao,
            tipo_terreno: terreno,
            desenho
        };

        // Cria objeto de pneu com os dados coletados e relaciona à especificação
        const novoPneu = {
            id_pneu: novoIdPneu,
            marca,
            modelo,
            aro,
            medida,
            preco,
            quantidade_estoque: quantidade,
            id_especificacao: novoIdEspecificacao
        };

        // Cria um registro de log para o cadastro do novo pneu
        const novoLog = {
            id_log: novoIdLog,
            id_pneu: novoIdPneu,
            id_usuario: usuarioLogado.id_usuario,
            acao: 'Cadastro',
            data_hora: new Date().toISOString()
        };

        // Adiciona os novos objetos aos arrays existentes
        especificacoes.push(novaEspecificacao);
        pneus.push(novoPneu);
        logs.push(novoLog);

        // Atualiza os dados no localStorage com os arrays atualizados
        localStorage.setItem('especificacoes', JSON.stringify(especificacoes));
        localStorage.setItem('pneus', JSON.stringify(pneus));
        localStorage.setItem('log_acoes', JSON.stringify(logs));

        // Informa sucesso ao usuário e limpa o formulário
        alert('Pneu cadastrado com sucesso!');
        form.reset();
    });
});
