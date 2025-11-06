function converterTemperatura(event) {
    event.preventDefault();

    const celsius = parseFloat(document.getElementById('tempCelsius').value);

    const fahrenheit = (celsius * 1.8) + 32;

    const celsiusFormatado = celsius.toFixed(2);
    const fahrenheitFormatado = fahrenheit.toFixed(2);

    const resultadoHTML = `
        <h3>Conversão Realizada:</h3>
        <p>
            Temperatura em Celsius: ${celsiusFormatado}°C
        </p>
        <p>
            Temperatura em Fahrenheit: ${fahrenheitFormatado}°F
        </p>
    `;

    document.getElementById('container').innerHTML = '';
    document.getElementById('resultado').innerHTML = resultadoHTML;
}

function construirFormulario() {
    const container = document.getElementById('container');
    
    const formHTML = `
        <h3>Informe a Temperatura em Graus Celsius:</h3>
        <form id="formularioTemperatura">
            <label for="tempCelsius">Temperatura (°C):</label>
            <input type="number" id="tempCelsius" step="any" required><br><br>
            
            <button type="submit">Converter para Fahrenheit</button>
        </form>
    `;

    container.innerHTML = formHTML;

    const formulario = document.getElementById('formularioTemperatura');
    formulario.addEventListener('submit', converterTemperatura);
}

construirFormulario();