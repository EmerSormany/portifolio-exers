function compararStrings(event) {
    event.preventDefault();

    const string1 = document.getElementById('string1').value;
    const string2 = document.getElementById('string2').value;

    let mensagemResultado = '';

    if (string1 === string2) {
        mensagemResultado = `Sucesso! As strings são iguais.`;
    } else {
        mensagemResultado = `Opa! As strings são diferentes.`;
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
        <h3>Informe Duas Strings para Comparação:</h3>
        <form id="formularioComparacao">
            <label for="string1">Primeira String:</label>
            <input type="text" id="string1" required><br><br>
            
            <label for="string2">Segunda String:</label>
            <input type="text" id="string2" required><br><br>
            
            <button type="submit">Comparar</button>
        </form>
    `;

    container.innerHTML = formHTML;

    const formulario = document.getElementById('formularioComparacao');
    formulario.addEventListener('submit', compararStrings);
}


construirFormulario();