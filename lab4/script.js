let meuArray = [10,2,3,-1]
const arrayNomes = ['Fernanada','Rodrigo','Ricardo', 'Diogo']

exibirArray()

function exibirArray(){
  document.getElementById("meuArray").innerHTML = ""
  meuArray.map((valor)=>{
    const novoQuadro = criarDiv(valor)
    document.getElementById("meuArray").appendChild(novoQuadro)
  })
  console.log(meuArray)

}

function criarDiv(valor){ 
  const novaDiv = document.createElement("div")
  novaDiv.className = "min-w-10 bg-blue-300 shadow-md rounded m-4 p-1"

  const texto = document.createElement("h1")
  texto.className = "text-center"
  texto.innerText = typeof(valor) === 'object' ? valor['nome'] : valor
    
  novaDiv.appendChild(texto)
  return novaDiv
}

const handlerDobrarNumeros = (elemento) => {
    if (elemento) {
        meuArray = dobrarNumeros(meuArray, Number(elemento))
    } else {
        meuArray = dobrarNumeros(meuArray)
    }
    exibirArray() 
}

const dobrarNumeros = (array, multiplicador=2) => {
    for(let i = 0; i < array.length; i++){
        array[i] = array[i] * multiplicador
    }
    return array
}

const handlerFiltrarMaioresQueDois = (parametro) => {
    if (parametro) {
        meuArray = filtrarMaioresQueDois(meuArray, Number(parametro))
    } else {
        meuArray = filtrarMaioresQueDois(meuArray)
    }
    exibirArray()
}

const filtrarMaioresQueDois = (array, parametro=2) => {
    const resultado = []
    array.forEach(element => {
        if (element > parametro) {
            resultado.push(element)
        }
    });
    return resultado
}

const handlerPrimeiroMaiorQueDois = (parametro) => {
    if (parametro) {
        meuArray = primeiroMaiorQueDois(meuArray, Number(parametro))
    } else {        
        meuArray = primeiroMaiorQueDois(meuArray)
    }
    exibirArray()
}

const primeiroMaiorQueDois = (array, parametro=2) => {
    let maiorQueParametro = []
    for (let i = 0; i < array.length; i++) {
        if (array[i] > parametro) {
            maiorQueParametro.push(array[i])
            break
        }
    }
    return maiorQueParametro
}

const handlerSomarTodos = () => {
    meuArray = somarTodos(meuArray)
    exibirArray()
}

const somarTodos = (array) => {
    let soma = 0
    array.forEach(element => {
        soma += element
    });
    return [soma]
}

const handlerAdicionarUm = (elemento) => {
    if (elemento) {
        meuArray = adicionarUm(meuArray, Number(elemento))
    } else {
        meuArray = adicionarUm(meuArray)
    }
    exibirArray()
}

const adicionarUm = (array, e=1)=> {
    array.forEach((element, i) => {
        array[i] = element + e
    })
    return array
}

const handlerCriarObjetos = () => {
    meuArray = criarObjetos(arrayNomes)
    exibirArray()
}

const criarObjetos = (array) => {
    const objetos = []
    array.forEach(element => {
        objetos.push({nome: element})
    });
    return objetos
}

const handlerLogarPares = () => {
    logarPares(meuArray)
    exibirArray()
}

const logarPares = (array) => {
    array.forEach(element => {
        if ((element % 2) === 0) {
            console.log(element);
        }
    });
}