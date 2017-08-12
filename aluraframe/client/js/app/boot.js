'use strict';

System.register(['./controllers/NegociacaoController'], function (_export, _context) {
  "use strict";

  var currentInstance, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      currentInstance = _controllersNegociacaoController.currentInstance;
    }],
    execute: function () {
      negociacaoController = currentInstance();


      document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      document.querySelector('#apagar').onclick = negociacaoController.apagar.bind(negociacaoController);
      document.querySelector('#importar').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map