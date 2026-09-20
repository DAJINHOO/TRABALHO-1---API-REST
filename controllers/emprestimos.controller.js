import { criarController } from './recurso.controller.js'
import { emprestimosRepository } from '../data/emprestimos/emprestimos.repository.js'
import { emprestimosService } from '../services/emprestimos.service.js'

const base = criarController(emprestimosRepository, 'Empréstimo')

export const emprestimosController = {
  ...base,

  // Sobrescreve criar — passa pelo service (checa disponibilidade)
  criar: async (req, res) => {
    try {
      const emprestimo = await emprestimosService.emprestar(req.body)
      res.status(201).json(emprestimo)
    } catch (e) {
      res.status(400).json({ erro: e.message })
    }
  },

  // Adiciona rota de devolução (não existe no genérico)
  devolver: async (req, res) => {
    try {
      const emprestimo = await emprestimosService.devolver(
        Number(req.params.id)
      )
      res.status(200).json(emprestimo)
    } catch (e) {
      res.status(400).json({ erro: e.message })
    }
  },
  marcarAtrasados: async (req, res) => {
    try {
      const total = await emprestimosService.marcarAtrasados()
      res.json({ marcados: total })
    } catch (e) {
      res.status(500).json({ erro: e.message })
    }
  },
}