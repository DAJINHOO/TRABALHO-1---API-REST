import { prisma } from '../../config/database.js'

export const disponibilidadeRepository = {
  listar: () =>
    prisma.$queryRaw`
      SELECT id, titulo, exemplares, emprestados_no_momento, exemplares_disponiveis
      FROM vw_disponibilidade_livros
      ORDER BY titulo
    `,

  porLivro: async (id) => {
    const [linha] = await prisma.$queryRaw`
      SELECT id, titulo, exemplares, emprestados_no_momento, exemplares_disponiveis
      FROM vw_disponibilidade_livros
      WHERE id = ${id}
    `
    return linha ?? null
  },
}