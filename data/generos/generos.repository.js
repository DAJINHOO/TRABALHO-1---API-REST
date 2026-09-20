import { criarRepository } from '../recurso.repository.js'

export const generosRepository = criarRepository('genero', {
  camposBusca: ['nome', 'descricao'],
})