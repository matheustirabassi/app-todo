const elementoLista = document.querySelector('ul')
const elementoImput = document.querySelector('input')
const elementoBotao2 = document.getElementById('deletar tudo')

const tarefas = []

function mostrarTarefas() {
    elementoLista.innerHTML = null
    for (tarefa of tarefas) {
        const elementoTarefa = document.createElement('li')
        const textoTarefa = document.createTextNode(tarefa)

        const elementoLink = document.createElement('a')
        const pos = tarefas.indexOf(tarefa)

        const linkText = document.createTextNode('x')
        elementoLink.appendChild(linkText)
        elementoLink.setAttribute('href', '#')
        elementoLink.setAttribute('onclick', `removerTarefa(${pos})`)


        elementoTarefa.appendChild(textoTarefa)
        elementoLista.appendChild(elementoTarefa)
        elementoTarefa.appendChild(elementoLink)
    }
}

function adicionarTarefas() {
    const textoTarefa = elementoImput.value

    if (textoTarefa != '') {
        tarefas.push(textoTarefa)
    }
    mostrarTarefas()
    elementoImput.value = null
}

function removerTarefa(pos) {
    tarefas.splice(pos, 1)
    mostrarTarefas()
}

function deletarTudo() {
    while (tarefas.length != 0) {
        tarefas.pop()
    }
    mostrarTarefas()
}

elementoImput.onkeypress = function(e) {
    if (e.keyCode == 13) {
        adicionarTarefas()
    }
}

elementoBotao2.setAttribute('onclick', 'deletarTudo()')