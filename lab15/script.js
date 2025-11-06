function verificarMaioridade(event) {
    event.preventDefault();

    const idade = parseInt(document.getElementById('idadeUsuario').value);

    let mensagemResultado = '';
    
    if (idade >= 18) {
        mensagemResultado = `Com ${idade} anos, você é considerado maior de idade.`;
    } else {
        mensagemResultado = `Com ${idade} anos, você ainda é considerado menor de idade.`;
    }

    const resultadoHTML = `
        <h3>Verificação de Idade:</h3>
        <p>${mensagemResultado}</p>
    `;

    document.getElementById('container').innerHTML = '';
    document.getElementById('resultado').innerHTML = resultadoHTML;
}

function construirFormulario() {
    const container = document.getElementById('container');
    
    const formHTML = `
        <h3>Informe a sua idade:</h3>
        <form id="formularioIdade">
            <label for="idadeUsuario">Sua Idade:</label>
            <input type="number" id="idadeUsuario" min="0" step="1" required><br><br>
            
            <button type="submit">Verificar Maioridade</button>
        </form>
    `;

    container.innerHTML = formHTML;

    const formulario = document.getElementById('formularioIdade');
    formulario.addEventListener('submit', verificarMaioridade);
}

construirFormulario();