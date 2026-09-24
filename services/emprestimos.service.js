import { emprestimosRepository } from '../data/emprestimos/emprestimos.repository.js'
import { disponibilidadeRepository } from '../data/disponibilidade/disponibilidade.repository.js'

export const emprestimosService = {
  async emprestar({ livro_id, usuario_id, data_prevista }) {
    // 1. Verifica disponibilidade via repository
    const exemplaresDisponiveis =
      await disponibilidadeRepository.exemplaresDisponiveis(livro_id)

    if (exemplaresDisponiveis === null) {
      throw new Error('Livro não encontrado')
    }

    if (exemplaresDisponiveis <= 0) {
      throw new Error('Sem exemplares disponíveis para este livro')
    }

    // 2. Cria o empréstimo via repository
    return emprestimosRepository.criar({
      livro_id,
      usuario_id,
      data_prevista: new Date(data_prevista),
      status: 'ativo',
    })
  },

  async devolver(emprestimoId) {
    const emprestimo = await emprestimosRepository.buscarPorIdCompleto(emprestimoId)

    if (!emprestimo) {
      throw new Error('Empréstimo não encontrado')
    }

    if (emprestimo.data_devolucao) {
      throw new Error('Empréstimo já devolvido')
    }

    return emprestimosRepository.registrarDevolucao(emprestimoId, new Date())
  },

  async marcarAtrasados() {
    return emprestimosRepository.marcarAtrasadosEmLote()
  },
}