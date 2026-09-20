import { disponibilidadeRepository } from '../data/disponibilidade/disponibilidade.repository.js'

export const disponibilidadeController = {
  listar: async (req, res) => {
    try {
      const lista = await disponibilidadeRepository.listar()
      res.json(lista)
    } catch (e) {
      res.status(500).json({ erro: e.message })
    }
  },

  porLivro: async (req, res) => {
    try {
      const livro = await disponibilidadeRepository.porLivro(
        Number(req.params.id)
      )
      if (!livro) {
        return res.status(404).json({ erro: 'Livro não encontrado' })
      }
      res.json(livro)
    } catch (e) {
      res.status(500).json({ erro: e.message })
    }
  },
}