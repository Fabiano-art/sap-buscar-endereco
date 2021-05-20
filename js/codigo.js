function filtrar(json) {
    const enderecoFiltrado = []
    enderecoFiltrado.push(json[1])
    enderecoFiltrado.push(json[2])
    enderecoFiltrado.push(json[3])
    enderecoFiltrado.push(json[4])
    enderecoFiltrado.push(json[5])
    return enderecoFiltrado
}

function ajaxAndShow(e){
    const cep = document.querySelector('.campo-cep')
    const tr = document.querySelector('tr:nth-child(2n)')
    const url = `https://viacep.com.br/ws/${cep.value}/json/`

    fetch(url)
        .then(resp => resp.json())
        .then(endereco => {
            const dados = []

            for (let property in endereco) {
                dados.push(endereco[property])
            }

            filtrado = filtrar(dados)
            const itens = filtrado.reduce((html, endereco) => html + `<td>${endereco}</td>`, '')

            tr.innerHTML = `<tr>${itens}</tr>`
            adicionarHistorico(endereco)
        })
}

function ajaxFromHistorico(e){
    const cep = e.previousElementSibling.innerText
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const tr = document.querySelector('tr:nth-child(2n)')

    fetch(url)
        .then(resp => resp.json())
        .then(endereco => {
            const dados = []

            for (let property in endereco) {
                dados.push(endereco[property])
            }

            filtrado = filtrar(dados)
            const itens = filtrado.reduce((html, endereco) => html + `<td>${endereco}</td>`, '')
            
            tr.innerHTML = `<tr>${itens}</tr>`
        })
}

function adicionarHistorico(endereco) {
    const div = document.createElement('div')
    div.classList.add('dados-historico')
    const h2 = document.createElement('h2')
    h2.id = 'cep-historico'
    h2.innerHTML = endereco.cep
    div.appendChild(h2)
    div.insertAdjacentHTML("beforeend", "<button class='botao' onclick='ajaxFromHistorico(this)'>Visualizar</button>")

    const historico = document.querySelector('.historico')
    historico.appendChild(div)
}

const buttonPesquisar = document.querySelector('#pesquisar')
buttonPesquisar.onclick = ajaxAndShow

const buttonLimpar = document.querySelector('#limpar')
buttonLimpar.onclick = e => {
    const row = document.querySelector('tr:nth-child(2n)')
    row.innerHTML = ''
}
