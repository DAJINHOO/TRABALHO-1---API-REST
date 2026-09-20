import { prisma } from '../../config/database.js'

export const livrosAutoresRepository = {
  associar: async ({ livro_id, autor_id }) => {
    try {
      const vinculo = await prisma.livroAutor.create({
        data: { livro_id, autor_id },
      })
      return { vinculo }
    } catch (e) {
      if (e.code === 'P2002') {
        return { jaAssociado: true }
      }
      if (e.code === 'P2003') {
        return { referenciaInvalida: true, campo: e.meta?.field_name }
      }
      throw e
    }
  },

  desassociar: async ({ livro_id, autor_id }) => {
    try {
      await prisma.livroAutor.delete({
        where: {
          livro_id_autor_id: { livro_id, autor_id },
        },
      })
      return true
    } catch (e) {
      if (e.code === 'P2025') return false  // não encontrado
      throw e
    }
  },

  listarPorLivro: (livro_id) =>
    prisma.livroAutor.findMany({
      where: { livro_id },
      include: { autor: true },
    }),
}