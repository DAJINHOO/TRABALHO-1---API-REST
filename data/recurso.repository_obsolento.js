export const criarRepository = (dados) => {

    let proximoId =
        dados.length > 0
            ? Math.max(...dados.map(recurso => recurso.id)) + 1
            : 1

    return {

        listar: () => dados,

        buscarPorId: (id) => {
            return dados.find(recurso => recurso.id === id)
        },

        criar: (recurso) => {

            recurso.id = proximoId++

            dados.push(recurso)

            return recurso
        },

       atualizar: (id, dadosAtualizados) => {

            const index =
                dados.findIndex(recurso => recurso.id === id)

            if (index !== -1) {

                dados[index] = {
                    ...dados[index],
                    ...dadosAtualizados
                }

                return dados[index]
            }

            return null
        },

        remover: (id) => {

            const index =
                dados.findIndex(recurso => recurso.id === id)

            if (index !== -1) {

                dados.splice(index, 1)

                return true
            }

            return false
        },

        buscar: (filtros) => {

            let resultado = [...dados]

            for (const campo in filtros) {

                const valor = filtros[campo]

                // Ignora paginação
                if (
                    campo === 'page' ||
                    campo === 'limit'
                ) {
                    continue
                }

                if (valor) {

                    resultado = resultado.filter(recurso => {

                        const valorRecurso =
                            recurso[campo]

                        if (valorRecurso === undefined) {
                            return false
                        }

                        return String(valorRecurso)
                            .toLowerCase()
                            .includes(
                                String(valor).toLowerCase()
                            )

                    })

                }

            }

            return resultado
        }

    }

}