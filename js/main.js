class Tarefa {
    constructor(texto, status) {
        this.texto = texto
        this.status = status
    }
    toString() {
        return `texto: ${this.texto}, status: ${this.status}`
    }
    get _texto() {
        return this.texto
    }
    set _texto (texto) {
        this.texto = texto
    }
    get _status() {
        return this.status
    }
    set _status(status) {
        this.status = status
    }
}

const tarefas = (JSON.parse(localStorage.getItem('list_tarefas'))) || []

const elementoLista = document.querySelector('ul')
const elementoImput = document.querySelector('#imputTarefaPrincipal')
const btnExcluirTudo = document.querySelector('#btnDeletarTudo').setAttribute('onclick', 'deletarTudo()')
const janelaEdicao = document.querySelector('#janelaEdicao')
const janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo')
const janelaEdicaoFundoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar')
const btnSalvar = document.querySelector('#btnSalvar')
const btnTarefasEmAndamento = document.querySelector('#tarefasEmAndamento')
const btnTarefasConcluidas = document.querySelector('#tarefasConcluidas')
const btnTodasAsTarefas = document.querySelector('#todasAsTarefas')



janelaEdicaoBtnFechar.addEventListener('click', (e) => {
    alternarJanelaEdicao();
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



mostrarTarefas()


function mostrarTarefas() {
    elementoLista.innerHTML = null

    for (tarefa of tarefas) {
        const lstTarefa = document.createElement('li')
        const txtTarefa = document.createTextNode(tarefa.texto)
        const posTarefa = tarefas.indexOf(tarefa)

        const checkBox = document.createElement('input')
        checkBox.setAttribute('type', 'checkbox')
        checkBox.checked = tarefa.status

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
function alternarCheckBox(pos, valor) {
    console.log(valor)
    tarefas[pos].status = valor
    salvarNoLocalStorage()
    if (valor == true) {
        mostrarTarefasPorStatus(false)
    }

}

function mostrarTarefasPorStatus(status) {
    elementoLista.innerHTML = null
    for (const tarefa of tarefas) {
        if (tarefa.status == status) {
            const lstTarefa = document.createElement('li')
            const txtTarefa = document.createTextNode(tarefa.texto)
            const posTarefa = tarefas.indexOf(tarefa)

            const checkBox = document.createElement('input')
            checkBox.setAttribute('type', 'checkbox')

            checkBox.checked = tarefa.status

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
    salvarNoLocalStorage()
    mostrarTarefas()

}

function removerTarefa(posTarefa) {
    tarefas.splice(posTarefa, 1)
    salvarNoLocalStorage()
    mostrarTarefas()

}
function clickAtualizarTarefa(pos) {
    tarefas[pos].texto = (document.querySelector('#inputTarefaEdicao').value)
    console.log(tarefas[pos].texto)
    mostrarTarefas()
    alternarJanelaEdicao()

}

function btnAtualizarTarefa(pos) {
    console.log(document.querySelector('#inputTarefaEdicao').value)
    tarefas[pos].texto = document.querySelector('#inputTarefaEdicao').value
    salvarNoLocalStorage()
    alternarJanelaEdicao()
    mostrarTarefas()
}
function editarTarefa(pos) {
    document.querySelector('#inputTarefaEdicao').setAttribute('placeholder', tarefas[pos].texto)
    document.querySelector('#inputTarefaEdicao').value = null
    alternarJanelaEdicao()
    btnSalvar.setAttribute('onclick', `btnAtualizarTarefa(${pos})`)
}


function deletarTudo() {
    if (tarefas.length != 0) {
        let confirmacao = window.confirm('tem certeza que deseja excluir tudo?')
        if (confirmacao) {
            while (tarefas.length != 0) {
                tarefas.pop()
                salvarNoLocalStorage()
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
function salvarNoLocalStorage() {
    localStorage.setItem('list_tarefas', JSON.stringify(tarefas))
}