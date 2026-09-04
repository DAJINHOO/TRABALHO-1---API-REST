import { livros } from './livros.data.js'

import { criarRepository } from '../recurso.repository.js'

export const livrosRepository =
    criarRepository(livros)