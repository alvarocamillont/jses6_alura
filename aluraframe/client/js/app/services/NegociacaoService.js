'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
  function NegociacaoService() {
    _classCallCheck(this, NegociacaoService);

    this.http = new HttpService();
  }
  /*
  xhr.readyState
  0: requisição ainda não iniciada.
  1: conexão com o servidor estabelecida.
  2: requisição recebida.
  3: processando requisição.
  4: requisição concluída e a resposta esta pronta.
  */


  _createClass(NegociacaoService, [{
    key: '_obterNegociacoes',
    value: function _obterNegociacoes(url, msgerro) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.http.get(url).then(function (negociacoes) {
          resolve(negociacoes.map(function (objeto) {
            return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
          }));
        }).catch(function (erro) {
          console.log(erro);
          reject(msgerro);
        });
      });
    }
  }, {
    key: 'obterNegociacoesDaSemana',
    value: function obterNegociacoesDaSemana() {
      return this._obterNegociacoes('negociacoes/semana', 'Não foi possível obter as negociações da semana');
    }
  }, {
    key: 'obterNegociacoesDaSemanaAnterior',
    value: function obterNegociacoesDaSemanaAnterior() {
      return this._obterNegociacoes('negociacoes/anterior', 'Não foi possível obter as negociações da semana anterior');
    }
  }, {
    key: 'obterNegociacoesDaSemanaRetrasada',
    value: function obterNegociacoesDaSemanaRetrasada(cb) {
      return this._obterNegociacoes('negociacoes/retrasada', 'Não foi possível obter as negociações da semana Retrasada');
    }
  }, {
    key: 'obterNegociacoes',
    value: function obterNegociacoes() {
      return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (periodos) {
        var negociacoes = periodos.reduce(function (dados, periodo) {
          return dados.concat(periodo);
        }, []).map(function (dado) {
          return new Negociacao(new Date(dado.data), dado.quantidade, dado.valor);
        });
        return negociacoes;
      }).catch(function (erro) {
        throw new Error(erro);
      });
    }
  }, {
    key: 'cadastra',
    value: function cadastra(negociacao) {
      return ConnectionFactory.getConnection().then(function (conexao) {
        return new NegociacaoDao(conexao);
      }).then(function (dao) {
        return dao.adiciona(negociacao);
      }).then(function () {
        return 'Negociação cadastrada com sucesso';
      }).catch(function (erro) {
        console.log(erro);
        throw new Error('Não foi possível adicionar a negociação');
      });
    }
  }, {
    key: 'lista',
    value: function lista() {
      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegociacaoDao(connection);
      }).then(function (dao) {
        return dao.listaTodos();
      }).catch(function (erro) {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações');
      });
    }
  }, {
    key: 'apaga',
    value: function apaga() {
      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegociacaoDao(connection);
      }).then(function (dao) {
        return dao.apagaTodos();
      }).then(function () {
        return 'Negociações apagadas com sucesso';
      }).catch(function (erro) {
        console.log(erro);
        throw new Error('Não foi possível apagar as negociações');
      });
    }
  }, {
    key: 'importa',
    value: function importa(listaAtual) {
      return this.obterNegociacoes().then(function (negociacoes) {
        return negociacoes.filter(function (negociacao) {
          return !listaAtual.some(function (negociacaoExistente) {
            return JSON.stringify(negociacao) === JSON.stringify(negociacaoExistente);
          });
        });
      }).catch(function (erro) {
        console.log(erro);
        throw new Error('Não foi possível importar as negociações');
      });
    }
  }]);

  return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map