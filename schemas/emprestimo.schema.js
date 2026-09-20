import { z } from 'zod'

export const criarEmprestimoSchema = z.object({
  livro_id: z
    .number({ required_error: 'livro_id é obrigatório' })
    .int()
    .positive(),

  usuario_id: z
    .number({ required_error: 'usuario_id é obrigatório' })
    .int()
    .positive(),

  data_prevista: z
    .string({ required_error: 'data_prevista é obrigatória' })
    .refine((d) => !isNaN(Date.parse(d)), {
      message: 'data_prevista deve ser uma data válida (ISO 8601)',
    }),
})