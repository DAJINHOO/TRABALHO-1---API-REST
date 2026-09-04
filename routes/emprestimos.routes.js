import { Router } from "express";
import { emprestimosController } from '../controllers/emprestimos.controller.js';


const router = Router();

router.get('/', emprestimosController.listar);
router.get('/:id', emprestimosController.buscarPorId);
router.post(
    '/', 
    emprestimosController.criar
);
router.put(
    '/:id', 

    emprestimosController.atualizar
);

router.patch(
    '/:id', 

    emprestimosController.atualizar
);


router.delete('/:id', emprestimosController.remover);

export default router;