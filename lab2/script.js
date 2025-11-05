
const array = ['a', 'b', 'c', 'd', 'e']

const attHTML = (array) => {
    document.getElementById('arrayContent').innerHTML = ''
    array.forEach(element => {
        document.getElementById("arrayContent").innerHTML += `
            <p>${element}</p>
            ` 
    });
}

const push = (array, elemento) => {
    const novoArray = array.slice(0, array.length)
    novoArray[novoArray.length] = elemento
    
    for (let i = 0; i < novoArray.length; i++) {
        array[i] = novoArray[i]
    }
    
    attHTML(array)
}

const unshift = (array, elemento) => {
    const novoArray = array.slice()
    
    array[0] = elemento
    for (let i = 1; i < novoArray.length + 1; i++) {
        array[i] = novoArray[i - 1]
    }

    attHTML(array)
}

const shift = (array) => {
    const primeiroElemento = array[0]

    const novoArray = array.slice(1)
    
    for (let i = 0; i < novoArray.length; i++) {
        array[i] = novoArray[i]
    }
    array.length = array.length - 1

    attHTML(array)

    document.getElementById('removido').innerHTML = `
        <p>Removido Agora: ${primeiroElemento}</p>
    `
}

const pop = (array) => {
    const ultimo = array.slice(-1)[0]

    array.length = array.length - 1

    attHTML(array)

    document.getElementById('removido').innerHTML = `
        <p>Removido Agora: ${ultimo}</p>
    `
}
