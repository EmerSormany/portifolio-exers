function processarBoasVindas(event) {
    event.preventDefault();

    const nome = document.getElementById('nomeUsuario').value;
    const idade = +document.getElementById('idadeUsuario').value;

    const container = document.getElementById('container');

    container.innerHTML = '';
    const mensagem = document.createElement('h2');

    mensagem.innerHTML = `Olá, ${nome}! Você tem ${idade} anos. Seja bem-vindo(a)!`;
    container.appendChild(mensagem);
}

function construirFormulario() {
    const container = document.getElementById('container');
    const formHTML = `
        <h3>Por favor, preencha seus dados:</h3>
        <form id="formularioUsuario">
            <label for="nomeUsuario">Nome:</label>
            <input type="text" id="nomeUsuario" required><br><br>
            
            <label for="idadeUsuario">Idade:</label>
            <input type="number" id="idadeUsuario" required><br><br>
            
            <button type="submit">Enviar Dados</button>
        </form>
    `;

    container.innerHTML = formHTML;
    const formulario = document.getElementById('formularioUsuario');
    formulario.addEventListener('submit', processarBoasVindas);
}

construirFormulario();