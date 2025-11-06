
function calcularRaizQuadrada(event) {
    event.preventDefault();

    const numero = parseFloat(document.getElementById('numeroInput').value);

    const raiz = Math.sqrt(numero);

    const resultadoHTML = `
        <h3>Raiz Quadrada Calculada:</h3>
        
        <p>Número Original: ${numero}</p>
        <p>Raiz Quadrada: ${raiz.toFixed(4).replace('.', ',')}</p>        
        <p>Resultado formatado com 4 casas decimais.</p>
    `;

    document.getElementById('container').innerHTML = '';
    document.getElementById('resultado').innerHTML = resultadoHTML;
}

function construirFormulario() {
    const container = document.getElementById('container');
    
    const formHTML = `
        <h3>Informe um número para calcular a Raiz Quadrada:</h3>
        <form id="formularioRaiz">
            <label for="numeroInput">Número:</label>
            <input type="number" id="numeroInput" min="0" step="any" required><br><br>
            
            <button type="submit">Calcular Raiz</button>
        </form>
    `;

    container.innerHTML = formHTML;

    const formulario = document.getElementById('formularioRaiz');
    formulario.addEventListener('submit', calcularRaizQuadrada);
}

construirFormulario();