import { Router } from 'express'
import { emprestimosController } from '../controllers/emprestimos.controller.js'
import { validar } from '../middlewares/validacao.middleware.js'
import { criarEmprestimoSchema } from '../schemas/emprestimo.schema.js'

const router = Router()

router.get('/', emprestimosController.listar)
router.post('/marcar-atrasados', emprestimosController.marcarAtrasados)  // ← nova
router.get('/:id', emprestimosController.buscarPorId)
router.post('/:id/devolver', emprestimosController.devolver)
router.post('/', validar(criarEmprestimoSchema), emprestimosController.criar)
router.put('/:id', emprestimosController.atualizar)
router.patch('/:id', emprestimosController.atualizar)
router.delete('/:id', emprestimosController.remover)


export default router