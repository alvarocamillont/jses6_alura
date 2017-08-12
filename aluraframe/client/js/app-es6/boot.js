import {currentInstance} from './controllers/NegociacaoController'

let negociacaoController = currentInstance()

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController)
document.querySelector('#apagar').onclick = negociacaoController.apagar.bind(negociacaoController)
document.querySelector('#importar').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController)
