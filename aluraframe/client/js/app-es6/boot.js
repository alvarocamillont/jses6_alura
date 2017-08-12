import {NegociacaoController} from './controllers/NegociacaoController.js'

let negociacaoController = new NegociacaoController()

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController)
document.querySelector('#apagar').onclick = negociacaoController.apagar.bind(negociacaoController)
document.querySelector('#importar').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController)
