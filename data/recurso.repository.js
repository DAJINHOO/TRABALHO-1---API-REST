import { prisma } from '../config/database.js'

export const criarRepository = (tabela, opcoes = {}) => {
  const {
    pk = 'id',                  // aceita string ou array (PK composta)
    camposImutaveis = ['id', 'criado_em', 'atualizado_em'],
    camposBusca = [],           // whitelist p/ busca por trecho
  } = opcoes

  const chavesPk = Array.isArray(pk) ? pk : [pk]
  const model = prisma[tabela]

  if (!model) {
    throw new Error(`Model Prisma "${tabela}" não existe`)
  }

  // monta o filtro da PK (suporta composta)
  const filtroPk = (valor) => {
    if (chavesPk.length === 1) return { [chavesPk[0]]: valor }
    return Object.fromEntries(chavesPk.map((c, i) => [c, valor[i]]))
  }

  return {
    listar: () => model.findMany(),

    buscarPorId: (id) => model.findUnique({ where: filtroPk(id) }),

    criar: (dados) => model.create({ data: dados }),

    atualizar: async (id, dados) => {
      const campos = Object.keys(dados).filter(
        (c) => !camposImutaveis.includes(c)
      )
      if (campos.length === 0) return null

      try {
        return await model.update({
          where: filtroPk(id),
          data: Object.fromEntries(campos.map((c) => [c, dados[c]])),
        })
      } catch {
        return null
      }
    },

    remover: async (id) => {
      try {
        await model.delete({ where: filtroPk(id) })
        return true
      } catch {
        return false
      }
    },

    buscar: async (filtros, { page = 1, limit = 20 } = {}) => {
      const where = {}

      for (const [campo, valor] of Object.entries(filtros)) {
        if (valor === undefined || valor === null || valor === '') continue
        if (!camposBusca.includes(campo)) continue

        where[campo] = { contains: valor, mode: 'insensitive' }
      }

      return model.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
      })
    },
  }
}