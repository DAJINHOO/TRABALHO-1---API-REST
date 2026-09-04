import { livrosRepository } from '../data/livros/livros.repository.js'
import { criarController } from './recurso.controller.js'

export const livrosController = criarController(
    livrosRepository,
    'Livro'
)