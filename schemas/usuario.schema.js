import { z } from 'zod';

export const usuarioSchema = z.object({
     nome: z.
        string().
        min(1, { message: "O nome é obrigatório" })
        .max(200, { message: "O nome deve ter no máximo 200 caracteres" }),
    idade: z.
        string().
        min(1, { message: "A idade é obrigatória" })
        .max(3, { message: "A idade deve ter no máximo 3 caracteres" }),
    sexo: z.
        string().optional()

});

