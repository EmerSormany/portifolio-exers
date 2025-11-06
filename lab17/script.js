function gerarTabuada(event) {
    event.preventDefault();

    const numero = parseInt(document.getElementById('numeroTabuada').value);

    let tabuadaHTML = `<h3>Tabuada de 10 de ${numero}:</h3><ul>`;

    for (let i = 1; i <= 10; i++) {
        const resultado = numero * i;
        
        tabuadaHTML += `
            <li>
                ${numero} x ${i} = ${resultado}
            </li>
        `;
    }

    tabuadaHTML += `</ul>`;

    document.getElementById('container').innerHTML = '';
    document.getElementById('resultado').innerHTML = tabuadaHTML;
}

function construirFormulario() {
    const container = document.getElementById('container');
    
    const formHTML = `
        <h3>Informe um número para gerar a tabuada de multiplicação:</h3>
        <form id="formularioTabuada">
            <label for="numeroTabuada">Número:</label>
            <input type="number" id="numeroTabuada" step="1" required><br><br>
            
            <button type="submit">Gerar Tabuada</button>
        </form>
    `;

    container.innerHTML = formHTML;

    const formulario = document.getElementById('formularioTabuada');
    formulario.addEventListener('submit', gerarTabuada);
}

construirFormulario();