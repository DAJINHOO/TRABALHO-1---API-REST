import { prisma } from '../../config/database.js'
import { criarRepository } from '../recurso.repository.js'

const base = criarRepository('livro', {
  camposBusca: ['titulo', 'editora', 'isbn'],
})

const includeCompleto = {
  genero: true,
  livros_autores: { include: { autor: true } },
}

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

  criar: async (dados) => {
    const livro = await prisma.livro.create({
      data: dados,
      include: includeCompleto,
    })
    return formatar(livro)
  },

  atualizar: async (id, dados) => {
    const camposImutaveis = ['id', 'criado_em', 'atualizado_em']
    const campos = Object.keys(dados).filter(
      (c) => !camposImutaveis.includes(c)
    )
    if (campos.length === 0) return null

    try {
      const livro = await prisma.livro.update({
        where: { id },
        data: Object.fromEntries(campos.map((c) => [c, dados[c]])),
        include: includeCompleto,
      })
      return formatar(livro)
    } catch {
      return null
    }
  },
}