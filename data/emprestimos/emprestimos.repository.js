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
    
     registrarDevolucao: (id, dataDevolucao) =>
    prisma.emprestimo.update({
      where: { id },
      data: {
        data_devolucao: dataDevolucao,
        status: 'devolvido',
      },
    }),

  marcarAtrasadosEmLote: () =>
    prisma.$executeRaw`
      UPDATE emprestimos
         SET status = 'atrasado'
       WHERE data_devolucao IS NULL
         AND data_prevista < CURRENT_DATE
         AND status = 'ativo'
    `,
}