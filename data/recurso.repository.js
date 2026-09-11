import { pool } from '../config/database.js'

export const criarRepository = (tabela) => {

    return {

        listar: async () => {

            const resultado = await pool.query(
                `SELECT * FROM ${tabela}`
            )

            return resultado.rows
        },


        buscarPorId: async (id) => {

            const resultado = await pool.query(
                `SELECT * FROM ${tabela} WHERE id = $1`,
                [id]
            )

            return resultado.rows[0]
        },


        criar: async (recurso) => {

            const campos = Object.keys(recurso)

            const valores = Object.values(recurso)

            const placeholders = valores
                .map((_, index) => `$${index + 1}`)
                .join(', ')

            const resultado = await pool.query(
                `
                INSERT INTO ${tabela}
                (${campos.join(', ')})
                VALUES (${placeholders})
                RETURNING *
                `,
                valores
            )

            return resultado.rows[0]
        },


        atualizar: async (id, dadosAtualizados) => {

            const campos = Object.keys(dadosAtualizados)

            const valores = Object.values(dadosAtualizados)

            const camposAtualizacao = campos
                .map((campo, index) => `${campo} = $${index + 1}`)
                .join(', ')

            const resultado = await pool.query(
                `
                UPDATE ${tabela}
                SET ${camposAtualizacao}
                WHERE id = $${valores.length + 1}
                RETURNING *
                `,
                [...valores, id]
            )

            return resultado.rows[0] || null
        },


        remover: async (id) => {

            const resultado = await pool.query(
                `
                DELETE FROM ${tabela}
                WHERE id = $1
                RETURNING *
                `,
                [id]
            )

            return resultado.rowCount > 0
        },


        buscar: async (filtros) => {

            const filtrosValidos = Object.entries(filtros)
                .filter(([campo, valor]) =>
                    campo !== 'page' &&
                    campo !== 'limit' &&
                    valor
                )

            let sql = `SELECT * FROM ${tabela}`

            const valores = []

            if (filtrosValidos.length > 0) {

                const where = filtrosValidos
                    .map(([campo, valor], index) => {

                        valores.push(valor)

                        return `
                            CAST(${campo} AS TEXT)
                            ILIKE '%' || $${index + 1} || '%'
                        `
                    })
                    .join(' AND ')

                sql += ` WHERE ${where}`
            }

            const resultado = await pool.query(
                sql,
                valores
            )

            return resultado.rows
        }

    }
}