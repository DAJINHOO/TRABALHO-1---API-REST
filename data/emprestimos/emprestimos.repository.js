import { prisma } from '../../config/database.js'
import { criarRepository } from '../recurso.repository.js'

const repositoryBase = criarRepository('emprestimo', {
  camposBusca: ['status'],
})

export const emprestimosRepository = {
  ...repositoryBase,

  buscarPorUsuario: (usuarioId) =>
    prisma.emprestimo.findMany({
      where: { usuario_id: usuarioId },
    }),
}