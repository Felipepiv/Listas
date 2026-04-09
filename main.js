// LOGIN
function acessar() {
    let loginEmail = document.getElementById('loginEmail')?.value;
    let loginSenha = document.getElementById('loginSenha')?.value;

    if (!loginEmail || !loginSenha) {
        alert("Favor preencher todos os campos");
    } else {
        window.location.href = 'cadastro.html';
    }
}

// LISTA (carrega do localStorage se existir)
var dadosLista = JSON.parse(localStorage.getItem('usuarios')) || [];

// SALVAR USUÁRIO
function salvarUser() {
    let input = document.getElementById('nomeUser');
    if (!input) return;

    let nomeUser = input.value.trim();

    if (nomeUser !== "") {
        dadosLista.push(nomeUser);

        input.value = ""; // limpa input

        atualizarTabela();
    } else {
        alert("Digite um nome válido");
    }
}

// ATUALIZAR TABELA
function atualizarTabela() {
    let tabela = document.getElementById('tabela');

    // evita erro no login.html
    if (!tabela) return;

    // salva no navegador
    localStorage.setItem('usuarios', JSON.stringify(dadosLista));

    // cabeçalho
    tabela.innerHTML = `
        <tr>
            <th>Nome Usuário</th>
            <th>Ações</th>
        </tr>
    `;

    // linhas
    dadosLista.forEach((nome, index) => {
        tabela.innerHTML += `
            <tr>
                <td>${nome}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editar(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="remover(${index})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

// EDITAR
function editar(index) {
    let novoNome = prompt("Digite o novo nome:", dadosLista[index]);

    if (novoNome && novoNome.trim() !== "") {
        dadosLista[index] = novoNome.trim();
        atualizarTabela();
    } else {
        alert("Nome inválido");
    }
}

// REMOVER
function remover(index) {
    if (confirm("Tem certeza que deseja excluir?")) {
        dadosLista.splice(index, 1);
        atualizarTabela();
    }
}

// CARREGAR AUTOMATICAMENTE AO ABRIR
window.onload = function () {
    atualizarTabela();
};