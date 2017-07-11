class NegociacaoService {
/*
xhr.readyState
0: requisição ainda não iniciada.
1: conexão com o servidor estabelecida.
2: requisição recebida.
3: processando requisição.
4: requisição concluída e a resposta esta pronta.
*/
  _obterNegociacoes (url, msgerro) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
          } else {
            console.log(xhr.responseText)
            reject(msgerro)
          }
        }
      }

      xhr.send()
    })
  }

  obterNegociacoesDaSemana () {
    return this._obterNegociacoes('negociacoes/semana', 'Não foi possível obter as negociações da semana')
  }

  obterNegociacoesDaSemanaAnterior () {
    return this._obterNegociacoes('negociacoes/anterior', 'Não foi possível obter as negociações da semana anterior')
  }

  obterNegociacoesDaSemanaRetrasada (cb) {
    return this._obterNegociacoes('negociacoes/retrasada', 'Não foi possível obter as negociações da semana Retrasada')
  }
}
