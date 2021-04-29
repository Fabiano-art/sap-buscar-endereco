function filtrar(json) {
    const enderecoFiltrado = []
    enderecoFiltrado.push(json[1])
    enderecoFiltrado.push(json[2])
    enderecoFiltrado.push(json[3])
    enderecoFiltrado.push(json[4])
    enderecoFiltrado.push(json[5])
    return enderecoFiltrado
}

const buttonPesquisar = document.querySelector('#pesquisar')
buttonPesquisar.onclick = e => {

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
            const itens = filtrado.reduce(
                (html, endereco) => html + `<td>${endereco}</td>`, ''
            )

            tr.innerHTML = `<tr>${itens}</tr>`
        })
}