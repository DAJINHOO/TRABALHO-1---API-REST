

export const criarController = (repository, nomeRecurso) => {

    return {

        listar: async(req, res) => {

            let page = parseInt(req.query.page) || 1
            let limit = parseInt(req.query.limit) || 10

            if (page < 1) {
                page = 1
            }

            if (limit < 1) {
                limit = 10
            }

            const filtros = req.query

            const recursosFiltrados =
                await repository.buscar(filtros)

            const total = recursosFiltrados.length

            const totalPaginas =
                Math.ceil(total / limit)

            const inicio =
                (page - 1) * limit

            const fim =
                inicio + limit

            const recursosPagina =
                recursosFiltrados.slice(inicio, fim)
            res.status(200).json({

                dados: recursosPagina,

                paginacao: {
                    total,
                    paginaAtual: page,
                    totalPaginas
                }

            })

        },

        buscarPorId: async(req, res) => {

            const id = parseInt(req.params.id)

              if (Number.isNaN(id)) {
                  return res.status(400).json({ message: 'ID inválido' })
              }



            const recurso =
                await repository.buscarPorId(id)

            if (!recurso) {

                return res.status(404).json({
                    message: `${nomeRecurso} não encontrado`
                })

            }

            res.status(200).json(recurso)

        },

        criar: async(req, res) => {

            const recurso =
                await repository.criar(req.body)

            res.status(201).json(recurso)

        },

        atualizar: async (req, res) => {

            const id =
                parseInt(req.params.id)

            const recurso =
                await repository.atualizar(
                    id,
                    req.body
                )

            if (!recurso) {

                return res.status(404).json({
                    message: `${nomeRecurso} não encontrado`
                })

            }

            res.status(200).json(recurso)

        },

        remover: async(req, res) => {

            const id =
                parseInt(req.params.id)

            const sucesso =
                await repository.remover(id)

            if (!sucesso) {

                return res.status(404).json({
                    message: `${nomeRecurso} não encontrado`
                })

            }

            res.status(204).json({
                message: `${nomeRecurso} removido com sucesso`
            })

        }

    }

}