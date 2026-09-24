export const criarController = (repository, nomeRecurso) => {
  return {
    listar: async (req, res) => {
      let page = parseInt(req.query.page) || 1
      let limit = parseInt(req.query.limit) || 10

      if (page < 1) page = 1
      if (limit < 1) limit = 10

      // Remove page/limit dos filtros antes de passar pro repository
      const { page: _p, limit: _l, ...filtros } = req.query

      // Repository pagina no banco (skip/take) e devolve os dados da página
      const dados = await repository.buscar(filtros, { page, limit })

      // Se o repository não devolver total, usa o tamanho do array
      const total = dados.length
      const totalPaginas = Math.ceil(total / limit)

      res.status(200).json({
        dados,
        paginacao: {
          total,
          paginaAtual: page,
          totalPaginas,
        },
      })
    },

    buscarPorId: async (req, res) => {
      const id = parseInt(req.params.id)

      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' })
      }

      const recurso = await repository.buscarPorId(id)

      if (!recurso) {
        return res.status(404).json({
          message: `${nomeRecurso} não encontrado`,
        })
      }

      res.status(200).json(recurso)
    },

    criar: async (req, res) => {
      const recurso = await repository.criar(req.body)
      res.status(201).json(recurso)
    },

    atualizar: async (req, res) => {
      const id = parseInt(req.params.id)

      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' })
      }

      const recurso = await repository.atualizar(id, req.body)

      if (!recurso) {
        return res.status(404).json({
          message: `${nomeRecurso} não encontrado`,
        })
      }

      res.status(200).json(recurso)
    },

    remover: async (req, res) => {
      const id = parseInt(req.params.id)

      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' })
      }

      const sucesso = await repository.remover(id)

      if (!sucesso) {
        return res.status(404).json({
          message: `${nomeRecurso} não encontrado`,
        })
      }

      res.status(204).end()
    },
  }
}