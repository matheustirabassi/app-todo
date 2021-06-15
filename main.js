const elementoLista = document.querySelector('ul')
const elementoImput = document.querySelector('input')
const btnExcluirTudo = document.querySelector('#btnDeletarTudo')

elementoImput.addEventListener('keypress', (e) => {
    if (e.which == 13) {
        adicionarTarefas()
    }
})

btnExcluirTudo.setAttribute('onclick', 'deletarTudo()')

const tarefas = []

function mostrarTarefas() {
    elementoLista.innerHTML = null
    for (tarefa of tarefas) {
        const lstTarefa = document.createElement('li')
        const txtTarefa = document.createTextNode(tarefa)
        const posTarefa = tarefas.indexOf(tarefa)

        const btnEditar = document.createElement('button')
        btnEditar.classList.add('btnEditar')
        const icnEditar = document.createElement('i')
        icnEditar.setAttribute('class', 'fa fa-pencil')
        btnEditar.appendChild(icnEditar)
        btnEditar.setAttribute('onclick', `editarTarefa(${posTarefa})`)

        const btnExcluir = document.createElement('button')
        btnExcluir.classList.add('btnExcluir')
        const icnExcluir = document.createElement('i')
        icnExcluir.setAttribute('class', 'fa fa-trash')
        btnExcluir.appendChild(icnExcluir)
        btnExcluir.setAttribute('href', '#')
        btnExcluir.setAttribute('onclick', `removerTarefa(${posTarefa})`)


        lstTarefa.appendChild(txtTarefa)
        elementoLista.appendChild(lstTarefa)
        lstTarefa.appendChild(btnEditar)
        lstTarefa.appendChild(btnExcluir)


    }
}

function adicionarTarefas() {
    const txtTarefa = elementoImput.value

    if (txtTarefa != '') {
        tarefas.push(txtTarefa)
    } else {
        alert("O texto não pode ser vazio")
    }
    elementoImput.value = null
    mostrarTarefas()

}

function removerTarefa(posTarefa) {
    tarefas.splice(posTarefa, 1)
    mostrarTarefas()

}

function editarTarefa(posTarefa) {
    alert(posTarefa)

}

function deletarTudo() {
    while (tarefas.length != 0) {
        tarefas.pop()
    }
    elementoImput.value = null;
    mostrarTarefas()
}