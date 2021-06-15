const elementoLista = document.querySelector('ul')
const elementoImput = document.querySelector('#imputTarefaPrincipal')
const btnExcluirTudo = document.querySelector('#btnDeletarTudo').setAttribute('onclick', 'deletarTudo()')
const janelaEdicao = document.querySelector('#janelaEdicao')
const janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo')
const janelaEdicaoFundoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar')
const btnAtualizarTarefa = document.querySelector('#btnAtualizarTarefa')
const btnTarefasEmAndamento = document.querySelector('#tarefasEmAndamento')
const btnTarefasConcluidas = document.querySelector('#tarefasConcluidas')
const btnTodasAsTarefas = document.querySelector('#todasAsTarefas')
elementoImput.value = null
janelaEdicaoBtnFechar.addEventListener('click', (e) => {
    alternarJanelaEdicao();
    mostrarTarefas()
})

elementoImput.addEventListener('keypress', (e) => {
    if (e.which == 13) {
        adicionarTarefas()
        mostrarTarefasPorStatus(false)
    }
})

btnTodasAsTarefas.addEventListener('click', (e) => {
    mostrarTarefas()
})

btnTarefasEmAndamento.addEventListener('click', (e) => {
    mostrarTarefasPorStatus(false)
})

btnTarefasConcluidas.addEventListener('click', (e) => {
    mostrarTarefasPorStatus(true)
})


class Tarefa {
    constructor(texto, status) {
        this.texto = texto
        this.status = status
    }
    toString() {
        return `texto: ${this.texto}, status: ${this.status}`
    }
    getTexto() {
        return this.texto
    }
    setTexto(texto) {
        this.texto = texto
    }
    getStatus() {
        return this.status
    }
    setStatus(status) {
        this.status = status
    }
}
const tarefas = []

function mostrarTarefas() {
    elementoLista.innerHTML = null

    for (tarefa of tarefas) {
        const lstTarefa = document.createElement('li')
        const txtTarefa = document.createTextNode(tarefa.getTexto())
        const posTarefa = tarefas.indexOf(tarefa)

        const checkBox = document.createElement('input')
        checkBox.setAttribute('type', 'checkbox')
        if (tarefa.getStatus() == 1) {
            checkBox.checked = true
        }

        checkBox.classList.add('checkBoxStatus')
        checkBox.addEventListener('click', alternarCheckBox(posTarefa, checkBox.checked))
        checkBox.setAttribute('onclick', `alternarCheckBox(${posTarefa}, ${!checkBox.checked})`)

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

        lstTarefa.appendChild(checkBox)
        lstTarefa.appendChild(txtTarefa)
        lstTarefa.appendChild(btnEditar)
        lstTarefa.appendChild(btnExcluir)
        elementoLista.appendChild(lstTarefa)
    }

}
function alternarCheckBox(pos, valor) {
    console.log(valor)
    tarefas[pos].setStatus(valor)
    if (valor == true) {
        mostrarTarefasPorStatus(false)
    }

}

function mostrarTarefasPorStatus(status) {
    elementoLista.innerHTML = null
    for (const tarefa of tarefas) {
        if (tarefa.getStatus() == status) {
            const lstTarefa = document.createElement('li')
            const txtTarefa = document.createTextNode(tarefa.getTexto())
            const posTarefa = tarefas.indexOf(tarefa)

            const checkBox = document.createElement('input')
            checkBox.setAttribute('type', 'checkbox')
            if (tarefa.getStatus() == 1) {
                checkBox.checked = true
            }
            checkBox.classList.add('checkBoxStatus')
            checkBox.setAttribute('onclick', `alternarCheckBox(${posTarefa}, ${!checkBox.checked})`)

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

            lstTarefa.appendChild(checkBox)
            lstTarefa.appendChild(txtTarefa)
            lstTarefa.appendChild(btnEditar)
            lstTarefa.appendChild(btnExcluir)
            elementoLista.appendChild(lstTarefa)
        }
    }


}
function adicionarTarefas() {
    const txtTarefa = elementoImput.value

    if (txtTarefa != '') {
        tarefas.push(new Tarefa(txtTarefa, false))
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
    document.querySelector('#inputTarefaEdicao').setAttribute('placeholder', tarefas[posTarefa].getTexto())
    btnAtualizarTarefa.setAttribute('onclick', `ClickAtualizarTarefa(${posTarefa})`)

}
function ClickAtualizarTarefa(posTarefa) {
    const txtTarefa = document.querySelector('#inputTarefaEdicao')
    tarefas[posTarefa].setTexto(txtTarefa.value)
    console.log(tarefas[posTarefa].getTexto())
    mostrarTarefas()
    alternarJanelaEdicao()
    document.querySelector('#inputTarefaEdicao').value = null

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