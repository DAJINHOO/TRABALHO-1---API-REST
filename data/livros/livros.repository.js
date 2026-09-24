import { prisma } from '../../config/database.js'
import { criarRepository } from '../recurso.repository.js'

const base = criarRepository('livro', {
  camposBusca: ['titulo', 'editora', 'isbn'],
})

const includeCompleto = {
  genero: true,
  livros_autores: { include: { autor: true } },
}

// Formata a resposta: substitui livros_autores por autores direto
const formatar = (livro) =>
  livro && {
    ...livro,
    autores: livro.livros_autores.map((la) => la.autor),
    livros_autores: undefined,
  }

export const livrosRepository = {
  ...base,

  listar: async () => {
    const livros = await prisma.livro.findMany({
      include: includeCompleto,
      orderBy: { titulo: 'asc' },
    })
    return livros.map(formatar)
  },

  buscarPorId: async (id) => {
    const livro = await prisma.livro.findUnique({
      where: { id },
      include: includeCompleto,
    })
    return formatar(livro)
  },

  buscar: async (filtros, { page = 1, limit = 20 } = {}) => {
    const { genero, ...resto } = filtros
    const where = {}

    // Filtros de texto (mesma lógica do genérico)
    if (resto.titulo)
      where.titulo = { contains: resto.titulo, mode: 'insensitive' }
    if (resto.editora)
      where.editora = { contains: resto.editora, mode: 'insensitive' }
    if (resto.isbn)
      where.isbn = { contains: resto.isbn, mode: 'insensitive' }

    // Filtro por nome do gênero (via relação)
    if (genero) {
      where.genero = {
        nome: { contains: genero, mode: 'insensitive' },
      }
    }

    const livros = await prisma.livro.findMany({
      where,
      include: includeCompleto,
      orderBy: { titulo: 'asc' },
      skip: (page - 1) * limit,
      take: limit,
    })

    return livros.map(formatar)
  },
}