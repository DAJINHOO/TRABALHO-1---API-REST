import { Router } from 'express'
import { livrosController } from '../controllers/livros.controller.js'
import { disponibilidadeController } from '../controllers/disponibilidade.controller.js'
import { validar } from '../middlewares/validacao.middleware.js'
import { livroSchema, livroUpdateSchema } from '../schemas/livro.schema.js'

const router = Router()

router.get('/disponibilidade', disponibilidadeController.listar)
router.get('/disponibilidade/:id', disponibilidadeController.porLivro)

router.post('/:id/autores', livrosController.associarAutor)
router.get('/:id/autores', livrosController.listarAutores)
router.delete('/:id/autores/:autorId', livrosController.desassociarAutor)

router.get('/', livrosController.listar)
router.get('/:id', livrosController.buscarPorId)
router.post('/', validar(livroSchema), livrosController.criar)
router.put('/:id', validar(livroSchema), livrosController.atualizar)
router.patch('/:id', validar(livroUpdateSchema), livrosController.atualizar)
router.delete('/:id', livrosController.remover)

export default router