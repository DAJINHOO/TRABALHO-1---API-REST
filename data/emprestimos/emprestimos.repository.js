import { emprestimos } from "./emprestimos.data.js"

import { criarRepository } from "../recurso.repository.js"

const repositoryBase = criarRepository(emprestimos)

export const emprestimosRepository = {

    ...repositoryBase,

    buscarPorUsuario: (usuarioId) => {

        return emprestimos.filter(
            emprestimo =>
                emprestimo.usuarioId === usuarioId
        )

    }

}