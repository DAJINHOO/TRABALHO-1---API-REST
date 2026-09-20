import { criarController } from './recurso.controller.js'
import { livrosRepository } from '../data/livros/livros.repository.js'
import { livrosAutoresRepository } from '../data/livros_autores/livros_autores.repository.js'

const base = criarController(livrosRepository, 'Livro')

export const livrosController = {
  ...base,

  associarAutor: async (req, res) => {
    const livro_id = Number(req.params.id)
    const autor_id = Number(req.body.autor_id)

    if (!Number.isInteger(autor_id) || autor_id <= 0) {
      return res.status(400).json({ erro: 'autor_id é obrigatório e deve ser um inteiro positivo' })
    }

    const resultado = await livrosAutoresRepository.associar({ livro_id, autor_id })

    if (resultado.jaAssociado) {
      return res.status(409).json({ erro: 'Autor já associado a este livro' })
    }

    if (resultado.referenciaInvalida) {
      return res.status(400).json({ erro: 'livro_id ou autor_id não existe' })
    }

    res.status(201).json({ livro_id, autor_id })
  },

  desassociarAutor: async (req, res) => {
    const livro_id = Number(req.params.id)
    const autor_id = Number(req.params.autorId)

    const ok = await livrosAutoresRepository.desassociar({ livro_id, autor_id })
    if (!ok) return res.status(404).json({ erro: 'Associação não encontrada' })
    res.status(204).end()
  },

  listarAutores: async (req, res) => {
    const livro_id = Number(req.params.id)
    const vinculos = await livrosAutoresRepository.listarPorLivro(livro_id)
    res.json(vinculos.map((v) => v.autor))
  },
}