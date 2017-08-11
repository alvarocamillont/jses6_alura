import {Negociacao} from '../models/Negociacao.js'
import {ListaNegociacoes} from '../models/ListaNegociacoes.js'
import {Mensagem} from '../models/Mensagem.js'

import {Bind} from '../helpers/Bind.js'
import {DateHelper} from '../helpers/DateHelper.js'
import {NegociacoesView} from '../views/NegociacoesView.js'
import {MensagemView} from '../views/MensagemView.js'
import {NegociacaoService} from '../services/NegociacaoService.js'
export class NegociacaoController {
  constructor () {
    let $ = document.querySelector.bind(document)
    this._ordemAtual = ''
    this._inputData = $('#data')
    this._inputQuantidade = $('#quantidade')
    this._inputValor = $('#valor')

    this._listaNegociacoes = new Bind(
                new ListaNegociacoes(),
                new NegociacoesView($('#negociacoesView')),
                'adiciona', 'esvazia', 'ordena', 'inverteOrdem')

    this._mensagem = new Bind(
        new Mensagem(),
        new MensagemView($('#mensagemView')),
        'texto')

    this._ordemAtual = ''
    this._service = new NegociacaoService()
    this._init()
  }

  _init () {
    this._service
        .lista()
        .then(negociacoes =>
            negociacoes.forEach(dado =>
                this._listaNegociacoes.adiciona(dado)))
        .catch(erro => this._mensagem.texto = erro)

    setInterval(() => {
      this.importaNegociacoes()
    }, 3000)
  }

  adiciona (event) {
    event.preventDefault()

    let negociacao = this._criaNegociacao()

    this._service
            .cadastra(negociacao)
            .then(mensagem => {
              this._listaNegociacoes.adiciona(negociacao)
              this._mensagem.texto = mensagem
              this._limpaFormulario()
            }).catch(erro => this._mensagem.texto = erro)
  }

  _criaNegociacao () {
    return new Negociacao(
       DateHelper.textoParaData(this._inputData.value),
       parseInt(this._inputQuantidade.value),
       parseFloat(this._inputValor.value))
  }

  _limpaFormulario () {
    this._inputData.value = ''
    this._inputQuantidade.value = 1
    this._inputValor.value = 0.0

    this._inputData.focus()
  }

  apagar () {
    this._service
        .apaga()
        .then(mensagem => {
          this._mensagem.texto = mensagem
          this._listaNegociacoes.esvazia()
        })
        .catch(erro => this._mensagem.texto = erro)
  }

  importaNegociacoes () {
    this._service
        .importa(this._listaNegociacoes.negociacoes)
        .then(negociacoes => negociacoes.forEach(negociacao => {
          this._listaNegociacoes.adiciona(negociacao)
          this._mensagem.texto = 'Negociações do período importadas'
        }))
        .catch(erro => this._mensagem.texto = erro)
  }

  ordena (coluna) {
    if (this._ordemAtual === coluna) {
      this._listaNegociacoes.inverteOrdem()
    } else {
      this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna])
    }
    this._ordemAtual = coluna
  }
}
