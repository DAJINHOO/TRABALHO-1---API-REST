import { usuarios } from './usuarios.data.js'

import { criarRepository } from '../recurso.repository.js'

export const usuariosRepository =
    criarRepository(usuarios)