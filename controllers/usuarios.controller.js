import { criarController } from './recurso.controller.js'

import { usuariosRepository }
    from '../data/usuarios/usuarios.repository.js'

import { emprestimosRepository }
    from '../data/emprestimos/emprestimos.repository.js'



const controllerBase = criarController(
    usuariosRepository,
    "Usuário"
)


export const usuariosController = {

    ...controllerBase,

    buscarEmprestimosPorUsuario: (req, res) => {

        const id = parseInt(req.params.id)

        const usuario =
            usuariosRepository.buscarPorId(id)

        if (!usuario) {

            return res.status(404).json({
                message: "Usuário não encontrado"
            })

        }

        const emprestimos =
            emprestimosRepository.buscarPorUsuario(id)

        res.status(200).json(emprestimos)
    }

}