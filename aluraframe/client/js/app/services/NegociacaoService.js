class NegociacaoService {
/*
xhr.readyState
0: requisição ainda não iniciada.
1: conexão com o servidor estabelecida.
2: requisição recebida.
3: processando requisição.
4: requisição concluída e a resposta esta pronta.
*/
  _obterNegociacoes (cb, url, msgerro) {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          cb(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
        } else {
          console.log(xhr.responseText)
          cb(msgerro, null)
        }
      }
    }

    xhr.send()
  }

  obterNegociacoesDaSemana (cb) {
    this._obterNegociacoes(cb, 'negociacoes/semana', 'Não foi possível obter as negociações da semana')
  }

  obterNegociacoesDaSemanaAnterior (cb) {
    this._obterNegociacoes(cb, 'negociacoes/anterior', 'Não foi possível obter as negociações da semana anterior')
  }

  obterNegociacoesDaSemanaRetrasada (cb) {
    this._obterNegociacoes(cb, 'negociacoes/retrasada', 'Não foi possível obter as negociações da semana Retrasada')
  }
}
