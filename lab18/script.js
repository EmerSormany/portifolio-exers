function encontrarMaiorNumero(event) {
    event.preventDefault();

    const num1 = parseFloat(document.getElementById('numero1').value);
    const num2 = parseFloat(document.getElementById('numero2').value);
    const num3 = parseFloat(document.getElementById('numero3').value);

    let maior = 0;
    let mensagemResultado = '';

    if (num1 >= num2 && num1 >= num3 && num1 !== num2 && num1 !== num3) {
        maior = num1;
        mensagemResultado = `O Primeiro Número (${num1}) é o maior.`;
    } else if (num2 >= num1 && num2 >= num3 && num2 !== num1 && num2 !== num3) {
        maior = num2;
        mensagemResultado = `O Segundo Número (${num2}) é o maior.`;
    } else if (num3 >= num1 && num3 >= num2 && num3 !== num1 && num3 !== num2) {
        maior = num3;
        mensagemResultado = `O Terceiro Número (${num3}) é o maior.`;
    } else {
        mensagemResultado = 'Há números iguais entre os maiores.';
    }
    
    const resultadoHTML = `
        <h3>Conclusão da Análise:</h3>
        <p>Números digitados: ${num1}, ${num2}, ${num3}</p>
        <p>${mensagemResultado}</p>
    `;

    document.getElementById('container').innerHTML = '';
    document.getElementById('resultado').innerHTML = resultadoHTML;
}

function construirFormulario() {
    const container = document.getElementById('container');
    
    const formHTML = `
        <h3>Informe Três Números:</h3>
        <form id="formularioComparacao">
            <label for="numero1">Primeiro Número (A):</label>
            <input type="number" id="numero1" step="any" required><br><br>
            
            <label for="numero2">Segundo Número (B):</label>
            <input type="number" id="numero2" step="any" required><br><br>
            
            <label for="numero3">Terceiro Número (C):</label>
            <input type="number" id="numero3" step="any" required><br><br>
            
            <button type="submit">Encontrar o Maior</button>
        </form>
    `;

    container.innerHTML = formHTML;

    const formulario = document.getElementById('formularioComparacao');
    formulario.addEventListener('submit', encontrarMaiorNumero);
}

construirFormulario();