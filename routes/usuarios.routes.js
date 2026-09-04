import { Router } from "express";
import { usuariosController } from '../controllers/usuarios.controller.js';
import { validar } from "../middlewares/validacao.middleware.js";
import { usuarioSchema } from "../schemas/usuario.schema.js";

const router = Router();

router.get('/', usuariosController.listar);

router.get('/:id', usuariosController.buscarPorId);

router.get('/:id/emprestimos', usuariosController.buscarEmprestimosPorUsuario);

router.post(
    '/', 
    validar(usuarioSchema),
    usuariosController.criar
);

router.put(
    '/:id', 
    validar(usuarioSchema),
    usuariosController.atualizar
);

router.patch(
    '/:id', 
    validar(usuarioSchema),
    usuariosController.atualizar

);


router.delete('/:id', usuariosController.remover);

export default router;