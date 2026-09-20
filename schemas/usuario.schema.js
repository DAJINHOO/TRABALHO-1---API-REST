import { z } from 'zod'

export const usuarioSchema = z.object({
  nome: z
    .string({ required_error: 'O nome é obrigatório' })
    .min(1, { message: 'O nome é obrigatório' })
    .max(120, { message: 'O nome deve ter no máximo 120 caracteres' }),

  matricula: z
    .string({ required_error: 'A matrícula é obrigatória' })
    .min(1, { message: 'A matrícula é obrigatória' })
    .max(20, { message: 'A matrícula deve ter no máximo 20 caracteres' }),

  email: z
    .string()
    .email({ message: 'E-mail inválido' })
    .max(160, { message: 'O e-mail deve ter no máximo 160 caracteres' })
    .optional()
    .nullable(),

  curso: z
    .string()
    .max(120, { message: 'O curso deve ter no máximo 120 caracteres' })
    .optional()
    .nullable(),

  data_matricula: z
    .string()
    .refine((d) => !isNaN(Date.parse(d)), {
      message: 'data_matricula deve ser uma data válida (YYYY-MM-DD)',
    })
    .optional(),

  ativo: z
    .boolean()
    .optional(),
})

// versão pro PATCH — todos os campos opcionais
export const usuarioUpdateSchema = usuarioSchema.partial()