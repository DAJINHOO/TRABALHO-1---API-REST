export const tratarErro = (err, req, res, next) => {
  // JSON malformado no body-parser
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      erro: 'JSON malformado no corpo da requisição',
      detalhe: err.message,
    })
  }

  // Erros conhecidos do Prisma
  if (err.code === 'P2002') {
    return res.status(409).json({
      erro: 'Registro duplicado',
      campos: err.meta?.target,
    })
  }

  if (err.code === 'P2003') {
    return res.status(400).json({
      erro: 'Referência inválida (chave estrangeira)',
      campo: err.meta?.field_name,
    })
  }

  if (err.code === 'P2025') {
    return res.status(404).json({ erro: 'Registro não encontrado' })
  }

  // Fallback
  console.error(err)
  res.status(500).json({ erro: 'Erro interno do servidor' })
}