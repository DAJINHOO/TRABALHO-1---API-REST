// routes/generos.routes.js
import { Router } from 'express'
import { criarController } from '../controllers/recurso.controller.js'
import { generosRepository } from '../data/generos/generos.repository.js'

const router = Router()
const controller = criarController(generosRepository, 'Gênero')

router.get('/', controller.listar)
router.get('/:id', controller.buscarPorId)
router.post('/', controller.criar)
router.put('/:id', controller.atualizar)
router.patch('/:id', controller.atualizar)
router.delete('/:id', controller.remover)

export default router