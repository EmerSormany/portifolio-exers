
function verificarParOuImpar(event) {
    event.preventDefault();

    const numero = parseFloat(document.getElementById('numeroInput').value);

    let mensagemResultado = '';
    
    if (numero % 2 === 0) {
        mensagemResultado = `O número ${numero} é par.`;
    } else {
        mensagemResultado = `O número ${numero} é ímpar.`;
    }

    const resultadoHTML = `
        <h3> Análise Matemática:</h3>
        <p>${mensagemResultado}</p>
    `;

    document.getElementById('container').innerHTML = '';
    document.getElementById('resultado').innerHTML = resultadoHTML;
}

function construirFormulario() {
    const container = document.getElementById('container');
    
    const formHTML = `
        <h3>Informe um Número Inteiro:</h3>
        <form id="formularioParImpar">
            <label for="numeroInput">Número:</label>
            <input type="number" id="numeroInput" step="any" required><br><br>
            
            <button type="submit">Verificar</button>
        </form>
    `;

    container.innerHTML = formHTML;

    const formulario = document.getElementById('formularioParImpar');
    formulario.addEventListener('submit', verificarParOuImpar);
}

construirFormulario();