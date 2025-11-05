let meuArray = [10,2,3,-1]

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
  texto.innerText = valor

  novaDiv.appendChild(texto)
  return novaDiv
}

function handlerPush(e){
  meuArray.push(Number(e))
  exibirArray()
}

function handlerSort(){
  meuArray.sort((a,b)=>a-b)
  exibirArray()
}

function handlerPesquisa(valor, tipo) {
  let resultadoPesquisa = {}
  if (tipo) {
    resultadoPesquisa = pesquisa(valor)
  } else {
    resultadoPesquisa = pesquisaBinaria(valor)
  }
  console.log(resultadoPesquisa);
  
  if (resultadoPesquisa.encontrado) {
    document.getElementById("resultado_pesquisa").innerText = `Valor ${valor} encontrado em ${resultadoPesquisa.iteracoes} iterações.`
  }
}

function pesquisa(valor) {
  let count = 0; 
  for (let i = 0; i < meuArray.length; i++) {
    count++;
    if (meuArray[i] === Number(valor)) {
      return {encontrado: true, iteracoes: count}
    } 
  }
  return {encontrado: false, iteracoes: count}
}

function pesquisaBinaria(valor) {
  let inicio = 0;
  let fim = meuArray.length - 1;
  let count = 0;
  while (inicio <= fim) {
    count++;
    const meio = Math.floor((inicio + fim) / 2);
    if (meuArray[meio] === Number(valor)) {
      return {encontrado: true, iteracoes: count}
    } else if (meuArray[meio] < Number(valor)) {
      inicio = meio + 1;
    } else {
      fim = meio - 1;
    }
  }
  return {encontrado: false, iteracoes: count}
}