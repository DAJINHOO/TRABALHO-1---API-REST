import { prisma } from '../config/database.js'

export const emprestimosService = {
  async emprestar({ livro_id, usuario_id, data_prevista }) {
    // 1. Verifica disponibilidade via view
    const [disp] = await prisma.$queryRaw`
      SELECT exemplares_disponiveis
      FROM vw_disponibilidade_livros
      WHERE id = ${livro_id}
    `

    if (!disp) throw new Error('Livro não encontrado')
    if (disp.exemplares_disponiveis <= 0) {
      throw new Error('Sem exemplares disponíveis para este livro')
    }

    // 2. Cria o empréstimo
    return prisma.emprestimo.create({
      data: {
        livro_id,
        usuario_id,
        data_prevista: new Date(data_prevista),
        status: 'ativo',
      },
    })
  },

  async devolver(emprestimoId) {
    const emprestimo = await prisma.emprestimo.findUnique({
      where: { id: emprestimoId },
    })

    if (!emprestimo) throw new Error('Empréstimo não encontrado')
    if (emprestimo.data_devolucao) {
      throw new Error('Empréstimo já devolvido')
    }

    return prisma.emprestimo.update({
      where: { id: emprestimoId },
      data: {
        data_devolucao: new Date(),
        status: 'devolvido',
      },
    })
  },

  async marcarAtrasados() {
    return prisma.$executeRaw`
      UPDATE emprestimos
         SET status = 'atrasado'
       WHERE data_devolucao IS NULL
         AND data_prevista < CURRENT_DATE
         AND status = 'ativo'
    `
  },
  marcarAtrasados: async () => {
  const afetados = await prisma.$executeRaw`
    UPDATE emprestimos
       SET status = 'atrasado'
     WHERE data_devolucao IS NULL
       AND data_prevista < CURRENT_DATE
       AND status = 'ativo'
  `
  return afetados
},
}