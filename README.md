
# 📛 PneusMAX – Sistema de Gestão de Pneus

## 🧾 Descrição

**PneusMAX** é um sistema web para gerenciamento de estoque de pneus, permitindo cadastro, edição, exclusão e visualização de produtos. O sistema oferece autenticação de usuários, interface moderna e intuitiva, dashboard com gráficos interativos, registro de logs de ações e controle completo dos dados via `localStorage` do navegador.
---

## 🚀 Funcionalidades

- **Login e autenticação básica:** Usuários fixos, validados via `localStorage`.
- **Cadastro de pneus:** Formulário completo com especificações técnicas.
- **Edição e exclusão:** Alteração e remoção de produtos com confirmação.
- **Listagem de produtos:** Tabela dinâmica e responsiva com todas as informações.
- **Dashboard com gráficos:** Visualização de dados do estoque usando Chart.js.
- **Logs de ações:** Histórico detalhado de cadastros, edições e exclusões.
- **Responsividade:** Layout adaptável para desktop e dispositivos móveis.
- **Design moderno:** Interface clara, com header e footer fixos.

---

## 🧪 Tecnologias Utilizadas

- **HTML5**  
- **CSS3**  
- **JavaScript (puro/vanilla)**  
- **Chart.js** (para gráficos interativos)
- **Armazenamento local:** `localStorage` do navegador

---

## 📦 Organização do Projeto

```bash
│
├── assets/                      # Imagens, ícones e logo do sistema
│
├── css/                         # Arquivos de estilos
│   ├── style_login.css
│   ├── style_dashboard.css
│   ├── style_header_footer.css
│   ├── style_cadastro.css
│   ├── style_estoque.css
│   ├── style_edicao.css
│   ├── style_exclusao.css
│   └── style_log.css
│
├── js/                          # Scripts JavaScript
│   ├── script_login.js
│   ├── script_logout.js
│   ├── script_header_mobile.js
│   ├── script_cadastro.js
│   ├── script_estoque.js
│   ├── script_edicao.js
│   ├── script_exclusao.js
│   ├── script_dashboard.js
│   └── script_log.js
│
├── index_login.html            # Tela de login
├── index_home.html             # Tela principal (estoque)
├── index_cadastro.html         # Cadastro de pneus
├── index_edicao.html           # Edição de pneus
├── index_exclusao.html         # Confirmação de exclusão
├── index_dashboard.html        # Dashboard com gráficos
└── index_log.html              # Histórico de ações (log)
```

---

## 👥 Usuários/Senhas Padrão para Login

- **Usuário 1:** `gabriel_hul` **Senha:** `gabriel123`  
- **Usuário 2:** `caio_gemin` **Senha:** `caio123`
- **Usuário 3:** `teste_di` **Senha:** `teste123`

*(Esses usuários são inseridos automaticamente no `localStorage` caso não existam.)*

---

## 🔧 Como Executar o Projeto

1. **Abra o sistema pelo link: 
2. **Faça login** usando um dos usuários padrão acima.
3. **Navegue** pelas funcionalidades do sistema normalmente.

> **Observação:**  
> O sistema é totalmente front-end. Todos os dados são salvos no `localStorage` do navegador.

---

## 📊 Dados e Simulação

- **Todos os dados** (pneus, especificações, usuários, logs) são armazenados localmente no navegador.
- **Não há backend**: as informações persistem apenas no navegador do usuário.
- **Logs de ações**: Cada cadastro, edição ou exclusão de pneu é registrado e pode ser consultado na tela de log.

---

## 📱 Responsividade

- O sistema se adapta automaticamente para **mobile** e **desktop**.
- Utiliza **grid responsivo** para tabelas e gráficos.
- **Header e footer fixos** garantem navegação consistente em qualquer dispositivo.

---

## 🗂️ Demais arquivos do Projeto

O projeto **PneusMAX** foi desenvolvido para um trabalho academico: Desafio Integrador 2025.1 - Engenharia de Software (3 Periodo), o projeto também acompanha um conjunto completo de artefatos de modelagem UML e banco de dados, que podem ser encontrados no repositório principal do projeto, clicando [aqui](https://github.com/GabrielBeledeli/Desafio-Integrador-2025.1---Engenharia-de-Software-3-Periodo.git).

---

## 🧠 Autores

- **Gabriel Beledeli Hul**
- **Caio Eduardo Gemin Guarienti**

Engenharia de Software 3A  
Centro Universitário Campo Real

> Projeto desenvolvido para fins acadêmicos e aprendizado.

---

**Sinta-se à vontade para explorar, testar e adaptar o PneusMAX!** 🚗🛞
