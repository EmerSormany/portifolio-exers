
function calcularOperacoes(event) {
    event.preventDefault();

    const num1 = parseFloat(document.getElementById('numero1').value);
    const num2 = parseFloat(document.getElementById('numero2').value);

    const soma = num1 + num2;
    const subtracao = num1 - num2;
    const multiplicacao = num1 * num2;
    
    let divisao;
    if (num2 !== 0) {
        divisao = `Dividir ${num1} por ${num2} é igual a ${num1 / num2}.`;
    } else {
        divisao = `Não é possível dividir ${num1} por ${num2} porque o denomidador não pode ser zero.`;
    }

    const resultadoHTML = `
        <h3>Resultados das Operações:</h3>
        <ul>
            <li>Soma de ${num1} e ${num2} é igual a ${soma}.</li>
            <li>Subtrair ${num2} de ${num1} é igual a ${subtracao}.</li>
            <li>Multiplicar ${num1} por ${num2} é igual a ${multiplicacao}.</li>
            <li>${divisao}</li>
        </ul>
    `;

    document.getElementById('container').innerHTML = '';
    document.getElementById('resultado').innerHTML = resultadoHTML;
}


function construirFormulario() {
    const container = document.getElementById('container');
    
    const formHTML = `
        <h3>Informe dois números inteiros:</h3>
        <form id="formularioCalculadora">
            <label for="numero1">Primeiro Número:</label>
            <input type="number" id="numero1" required><br><br>
            
            <label for="numero2">Segundo Número:</label>
            <input type="number" id="numero2" required><br><br>
            
            <button type="submit">Calcular</button>
        </form>
    `;

    container.innerHTML = formHTML;

    const formulario = document.getElementById('formularioCalculadora');
    formulario.addEventListener('submit', calcularOperacoes);
}

construirFormulario();