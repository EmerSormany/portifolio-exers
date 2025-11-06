function calcularSalarioAnual(event) {
    event.preventDefault();

    const salarioMensal = parseFloat(document.getElementById('salarioMensal').value);
    const mesesTrabalhados = parseInt(document.getElementById('mesesTrabalhados').value);

    const salarioAnual = salarioMensal * mesesTrabalhados;

    // toLocaleString para formata o número como moeda no padrão brasileiro
    const salarioAnualFormatado = salarioAnual.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    const resultadoHTML = `
        <h3>Resultado do Cálculo:</h3>
        
        <ul>
            <li>Salário Mensal Informado: R$ ${salarioMensal.toFixed(2).replace('.', ',')}</li>
            <li>Meses Trabalhados: ${mesesTrabalhados}</li>
            <li>Salário Anual (Total Recebido): ${salarioAnualFormatado}</li>
        </ul>
    `;

    document.getElementById('container').innerHTML = '';
    document.getElementById('resultado').innerHTML = resultadoHTML;
}

function construirFormulario() {
    const container = document.getElementById('container');
    
    const formHTML = `
        <h3>Calcular Salário Anual:</h3>
        <form id="formularioSalario">
            <label for="salarioMensal">Salário Mensal (R$):</label>
            <input type="number" id="salarioMensal" step="0.01" required><br><br>
            
            <label for="mesesTrabalhados">Meses Trabalhados:</label>
            <input type="number" id="mesesTrabalhados" min="1" max="12" required><br><br>
            
            <button type="submit">Calcular Salário Anual</button>
        </form>
    `;

    container.innerHTML = formHTML;

    const formulario = document.getElementById('formularioSalario');
    formulario.addEventListener('submit', calcularSalarioAnual);
}

construirFormulario();