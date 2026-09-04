export const criarController = (repository, nomeRecurso) => {

    return {

        listar: (req, res) => {

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
                repository.buscar(filtros)

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

        buscarPorId: (req, res) => {

            const id = parseInt(req.params.id)

            const recurso =
                repository.buscarPorId(id)

            if (!recurso) {

                return res.status(404).json({
                    message: `${nomeRecurso} não encontrado`
                })

            }

            res.status(200).json(recurso)

        },

        criar: (req, res) => {

            const recurso =
                repository.criar(req.body)

            res.status(201).json(recurso)

        },

        atualizar: (req, res) => {

            const id =
                parseInt(req.params.id)

            const recurso =
                repository.atualizar(
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

        remover: (req, res) => {

            const id =
                parseInt(req.params.id)

            const sucesso =
                repository.remover(id)

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