import express from 'express';
import livrosRouter from './routes/livros.routes.js'
import usuariosRouter from './routes/usuarios.routes.js'
import emprestimosRouter from './routes/emprestimos.routes.js';
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json' with { type: 'json' }


const app = express()
const port = 3000
app.use(express.json())

app.use('/livros', livrosRouter)

app.use('/usuarios',usuariosRouter)

app.use('/emprestimos',emprestimosRouter)

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
)

app.listen(port, () => {
  console.log(`API REST de livros rodando na porta ${port}`)
})