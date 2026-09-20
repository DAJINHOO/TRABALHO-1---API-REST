import { z } from 'zod'

export const livroSchema = z.object({
  titulo: z
    .string({ required_error: 'O título é obrigatório' })
    .min(1, { message: 'O título é obrigatório' })
    .max(200, { message: 'O título deve ter no máximo 200 caracteres' }),

  isbn: z
    .string()
    .max(20, { message: 'O ISBN deve ter no máximo 20 caracteres' })
    .optional()
    .nullable(),

  ano: z
    .number({ required_error: 'O ano é obrigatório' })
    .int({ message: 'O ano deve ser um número inteiro' })
    .min(1000, { message: 'O ano deve ser no mínimo 1000' })
    .max(2027, { message: 'O ano deve ser menor ou igual a 2027' })
    .optional()
    .nullable(),

  editora: z
    .string()
    .max(120, { message: 'A editora deve ter no máximo 120 caracteres' })
    .optional()
    .nullable(),

  idioma: z
    .string()
    .max(40)
    .optional(),

  num_paginas: z
    .number()
    .int()
    .positive({ message: 'O número de páginas deve ser positivo' })
    .optional()
    .nullable(),

  exemplares: z
    .number()
    .int()
    .min(0, { message: 'Exemplares não pode ser negativo' })
    .optional(),

  genero_id: z
    .number()
    .int()
    .positive()
    .optional()
    .nullable(),
})

// versão pro PATCH — todos os campos opcionais
export const livroUpdateSchema = livroSchema.partial()