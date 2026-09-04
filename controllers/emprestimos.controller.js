import { emprestimosRepository } from '../data/emprestimos/emprestimos.repository.js'

import { criarController } from './recurso.controller.js'

export const emprestimosController =
    criarController(
        emprestimosRepository,
        'Empréstimos'
    )