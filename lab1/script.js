
const array = ['a', 'b', 'c', 'd', 'e']

function chamarPop() {
    array.pop()

    document.getElementById('arrayContent').innerHTML = ''

    array.forEach(element => {
        document.getElementById("arrayContent").innerHTML += `
            <p>${element}</p>
            ` 
    });
}

function chamarShift() {
    array.shift()

    document.getElementById('arrayContent').innerHTML = ''

    array.forEach(element => {
        document.getElementById("arrayContent").innerHTML += `
            <p>${element}</p>
            ` 
    });
}

function chamarUnshift() {
    let nomeInput = document.getElementById("nome").value

    array.unshift(nomeInput)
    
    document.getElementById('arrayContent').innerHTML = ''

    array.forEach(element => {
        document.getElementById("arrayContent").innerHTML += `
            <p>${element}</p>
            ` 
    });
}

function chamarPush() {
        let nomeInput = document.getElementById("nome").value

        array.push(nomeInput)
        
        document.getElementById('arrayContent').innerHTML = ''

        array.forEach(element => {
            document.getElementById("arrayContent").innerHTML += `
                <p>${element}</p>
                ` 
        });
}

