
function aplicarOperadoresLogicos(event) {
    event.preventDefault();

    const strValor1 = document.getElementById('valorBooleano1').value;
    const strValor2 = document.getElementById('valorBooleano2').value;

    const A = strValor1 === 'true';
    const B = strValor2 === 'true';

    const resultadoAND = A && B;
    const resultadoOR = A || B;
    
    const resultadoNOT_A = !A;
    const resultadoNOT_B = !B;

    const resultadoHTML = `
        <h3>Análise Lógica:</h3>

        <p>Valores Selecionados:</p>
        <ul>
            <li>Valor A: ${A}</li>
            <li>Valor B: ${B}</li>
        </ul>

        <table border="1">
            <thead>
                <tr>
                    <th>Operação Lógico</th>
                    <th>Fórmula</th>
                    <th>Resultado</th>
                    <th>Explicação</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>e</td>
                    <td>A && B</td>
                    <td>${resultadoAND}</td>
                    <td>Verdadeiro apenas se A e B forem verdadeiros.</td>
                </tr>
                <tr>
                    <td>ou</td>
                    <td>A || B</td>
                    <td>${resultadoOR}</td>
                    <td>Precisa que apenas um valor seja verdadeiro.</td>
                </tr>
                <tr>
                    <td>negação de A</td>
                    <td>!A</td>
                    <td>${resultadoNOT_A}</td>
                    <td>Inverte o valor de A.</td>
                </tr>
                 <tr>
                    <td>negação de B</td>
                    <td>!B</td>
                    <td>${resultadoNOT_B}</td>
                    <td>Inverte o valor de B.</td>
                </tr>
            </tbody>
        </table>
    `;

    document.getElementById('container').innerHTML = '';
    document.getElementById('resultado').innerHTML = resultadoHTML;
}

function construirFormulario() {
    const container = document.getElementById('container');
    
    const formHTML = `
        <h3>Selecione dois valores Booleanos:</h3>
        <form id="formularioLogico">
            <label for="valorBooleano1">Valor A:</label>
            <select id="valorBooleano1">
                <option value="true">True</option>
                <option value="false">False</option>
            </select>
            
            <label for="valorBooleano2">Valor B:</label>
            <select id="valorBooleano2">
                <option value="true">True</option>
                <option value="false" selected>False</option>
            </select><br><br>
            
            <button type="submit">Aplicar Lógica</button>
        </form>
    `;

    container.innerHTML = formHTML;

    const formulario = document.getElementById('formularioLogico');
    formulario.addEventListener('submit', aplicarOperadoresLogicos);
}

construirFormulario();