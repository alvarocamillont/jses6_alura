class Negociacao {
  constructor (data, quantidade, valor) {
    this._data = new Date(data) // Faz uma cópia pois o Freeze não congela os objetos internos
    this._quantidade = quantidade
    this._valor = valor
    Object.freeze(this) // Congela o Objeto não permitindo a alteração dos atributos
  }

  get volume () {
    return this._quantidade * this._valor
  }

  get data () {
    return new Date(this._data)
  }

  get valor () {
    return this._valor
  }

  get quantidade () {
    return this._quantidade
  }
}
