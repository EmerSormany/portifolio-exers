function calcularCirculo(event) {
    event.preventDefault();

    const raio = parseFloat(document.getElementById('raioCirculo').value);

    if (raio <= 0) {
        document.getElementById('resultado').innerHTML = '<p style="color: red;">Não existe círculo com raio menor ou igual a zero.</p>';
        return;
    }

    const area = Math.PI * (raio * raio);
    const perimetro = 2 * Math.PI * raio;

    const resultadoHTML = `
        <h3>Resultados para um Raio de ${raio}:</h3>

        <p>Área: ${area.toFixed(2)}</p> 
        <p>Perímetro: ${perimetro.toFixed(2)}</p>
    
        <p>Valores foram arredondados para 2 casas decimais.</p>
    `;

    document.getElementById('container').innerHTML = '';
    document.getElementById('resultado').innerHTML = resultadoHTML;
}

function construirFormulario() {
    const container = document.getElementById('container');
    
    const formHTML = `
        <h3>Informe o Raio do Círculo:</h3>
        <form id="formularioCirculo">
            <label for="raioCirculo">Raio (R):</label>
            <input type="number" id="raioCirculo" step="any" required><br><br>
            
            <button type="submit">Calcular Área e Perímetro</button>
        </form>
    `;

    container.innerHTML = formHTML;

    const formulario = document.getElementById('formularioCirculo');
    formulario.addEventListener('submit', calcularCirculo);
}

construirFormulario();