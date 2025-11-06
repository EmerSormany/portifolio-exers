function ePrimo(numero) {
    if (numero <= 1) {
        return false;
    }
    
    if (numero === 2) {
        return true;
    }
    
    if (numero % 2 === 0) {
        return false;
    }

    const limite = Math.sqrt(numero);
    for (let i = 3; i <= limite; i += 2) {
        if (numero % i === 0) {
            return false;
        }
    }

    return true;
}

function verificarPrimo(event) {
    event.preventDefault();

    const numero = parseInt(document.getElementById('numeroPrimo').value);

    const primo = ePrimo(numero);
    
    let mensagemResultado = '';
    if (primo) {
        mensagemResultado = `O número ${numero} é um número primo.`;
    } else {
        mensagemResultado = `O número ${numero} não é um número primo.`;
    }

    const resultadoHTML = `
        <h3>Verificação:</h3>
        <p>${mensagemResultado}</p>
    `;

    document.getElementById('container').innerHTML = '';
    document.getElementById('resultado').innerHTML = resultadoHTML;
}

function construirFormulario() {
    const container = document.getElementById('container');
    
    const formHTML = `
        <h3>Informe um número para verificar se é primo:</h3>
        <form id="formularioPrimo">
            <label for="numeroPrimo">Número:</label>
            <input type="number" id="numeroPrimo" min="1" step="1" required><br><br>
            
            <button type="submit">Verificar Primo</button>
        </form>
    `;

    container.innerHTML = formHTML;

    const formulario = document.getElementById('formularioPrimo');
    formulario.addEventListener('submit', verificarPrimo);
}

construirFormulario();