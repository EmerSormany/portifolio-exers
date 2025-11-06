function contarPalavras(event) {
    event.preventDefault();

    const frase = document.getElementById('fraseInput').value;

    const palavras = frase.trim().split(/\s+/).filter(word => word.trim().length > 0);
    
    const totalPalavras = palavras.length;
    
    let mensagemResultado = '';
    if (totalPalavras === 0) {
        mensagemResultado = 'Parece que você não digitou nenhuma palavra.';
    } else if (totalPalavras === 1) {
        mensagemResultado = `A frase contém apenas 1 palavra.`;
    } else {
        mensagemResultado = `A frase contém um total de ${totalPalavras} palavras.`;
    }

    const resultadoHTML = `
        <h3>Análise da Frase:</h3>
        
        <p><strong>Frase Analisada:</strong> <em>"${frase}"</em></p>
        <p>${mensagemResultado}</p>
    `;

    document.getElementById('container').innerHTML = '';
    document.getElementById('resultado').innerHTML = resultadoHTML;
}

function construirFormulario() {
    const container = document.getElementById('container');
    
    const formHTML = `
        <h3>Informe a frase para contar as palavras:</h3>
        <form id="formularioFrase">
            <label for="fraseInput">Digite sua frase:</label><br>
            <textarea id="fraseInput" rows="4" cols="50" required placeholder="Ex: Esta frase tem cinco palavras."></textarea><br><br>
            
            <button type="submit">Contar Palavras</button>
        </form>
    `;

    container.innerHTML = formHTML;

    const formulario = document.getElementById('formularioFrase');
    formulario.addEventListener('submit', contarPalavras);
}

construirFormulario();