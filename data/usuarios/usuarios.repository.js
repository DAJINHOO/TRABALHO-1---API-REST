import { criarRepository } from '../recurso.repository.js'

export const usuariosRepository = criarRepository('usuario', {
  camposBusca: ['nome', 'matricula', 'email', 'curso'],
})