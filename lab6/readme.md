Quais são os principais métodos para criar, editar e remover elementos HTML usando Javascript?

Método,Descrição
document.createElement(tagName),"Cria um novo elemento HTML com a tag name especificada ('div', 'p', 'span', etc.). O elemento é criado, mas ainda não está no documento (DOM)."
element.appendChild(childElement),Adiciona um elemento criado (childElement) como o último filho de outro elemento (element) existente no DOM.
"element.append(element1, element2, ...)",Permite adicionar vários nós (elementos ou strings de texto) no final do element pai.
"element.prepend(element1, element2, ...)",Permite adicionar vários nós (elementos ou strings de texto) no início do element pai.
"element.insertAdjacentElement(position, element)","Insere um elemento em uma posição específica em relação a um elemento existente (ex: 'beforebegin', 'afterend', etc.)."