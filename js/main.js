const elementoLista = document.querySelector('ul')
const elementoImput = document.querySelector('input')
const btnExcluirTudo = document.querySelector('#btnDeletarTudo').setAttribute('onclick', 'deletarTudo()')
const janelaEdicao = document.querySelector('#janelaEdicao')
const janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo')
const janelaEdicaoFundoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar')
const btnAtualizarTarefa = document.querySelector('#btnAtualizarTarefa')

janelaEdicaoBtnFechar.addEventListener('click', (e) => {
    alternarJanelaEdicao();
    mostrarTarefas()
});
elementoImput.addEventListener('keypress', (e) => {
    if (e.which == 13) {
        adicionarTarefas()
    }
})



let tarefas = []

function mostrarTarefas() {
    elementoLista.innerHTML = null
    for (tarefa of tarefas) {
        const checkBoxTarefa = document.createElement('checkbox')
        checkBoxTarefa.classList.add('cbTarefa')
        const label = document.createElement('label')
        label.setAttribute('for', 'scales')
        
        checkBoxTarefa.appendChild(label)
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
        btnExcluir.setAttribute('onclick', `removerTarefa(${posTarefa})`)


        lstTarefa.appendChild(txtTarefa)
        lstTarefa.appendChild(checkBoxTarefa)
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
    alternarJanelaEdicao()
    document.querySelector('#inputTarefaEdicao').setAttribute('placeholder', tarefas[posTarefa])
    btnAtualizarTarefa.addEventListener('click', function (e){
        e.preventDefault()
        tarefas[posTarefa] = document.querySelector('#inputTarefaEdicao').value
        btnAtualizarTarefa.removeEventListener('click', () => null)
        mostrarTarefas()
    })
    
}

function deletarTudo() {
    if (tarefas != 0) {
        let confirmacao = window.confirm('tem certeza que deseja excluir tudo?')
        if (confirmacao) {
            while (tarefas.length != 0) {
                tarefas.pop()
            }
            elementoImput.value = null;
            mostrarTarefas()
        }
    }
}

function alternarJanelaEdicao() {
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}