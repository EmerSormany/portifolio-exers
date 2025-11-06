function compararNumeros(event) {
    event.preventDefault();

    const num1 = parseFloat(document.getElementById('numero1').value);
    const num2 = parseFloat(document.getElementById('numero2').value);


    let mensagemResultado = '';
    
    if (num1 > num2) {
        mensagemResultado = `${num1} é maior que ${num2}.`;
    } else if (num1 < num2) {
        mensagemResultado = `${num1} é menor que ${num2}.`;
    } else {
        mensagemResultado = `Os números são iguais! Ambos são ${num1}.`;
    }

    const resultadoHTML = `
        <h3>Resultado da Comparação:</h3>
        <p>${mensagemResultado}</p>
    `;

    document.getElementById('container').innerHTML = '';
    document.getElementById('resultado').innerHTML = resultadoHTML;
}

function construirFormulario() {
    const container = document.getElementById('container');
    
    const formHTML = `
        <h3>Informe dois números:</h3>
        <form id="formularioComparacao">
            <label for="numero1">Primeiro Número (A):</label>
            <input type="number" id="numero1" step="any" required><br><br>
            
            <label for="numero2">Segundo Número (B):</label>
            <input type="number" id="numero2" step="any" required><br><br>
            
            <button type="submit">Comparar A com B</button>
        </form>
    `;

    container.innerHTML = formHTML;

    const formulario = document.getElementById('formularioComparacao');
    formulario.addEventListener('submit', compararNumeros);
}


construirFormulario();