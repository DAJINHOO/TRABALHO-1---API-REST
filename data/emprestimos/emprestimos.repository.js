import { pool }
    from '../../config/database.js'

import { criarRepository }
    from '../recurso.repository.js'


const repositoryBase =
    criarRepository('emprestimos')


export const emprestimosRepository = {

    ...repositoryBase,

    buscarPorUsuario: async (usuarioId) => {

        const resultado = await pool.query(
            `
            SELECT *
            FROM emprestimos
            WHERE usuario_id = $1
            `,
            [usuarioId]
        )

        return resultado.rows
    }

}