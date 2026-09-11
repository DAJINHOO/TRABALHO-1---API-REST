import { criarController }
    from './recurso.controller.js'

import { emprestimosRepository }
    from '../data/emprestimos/emprestimos.repository.js'


export const emprestimosController =
    criarController(
        emprestimosRepository,
        'Empréstimo'
    )