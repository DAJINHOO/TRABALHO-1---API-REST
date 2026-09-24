import express from 'express';
import livrosRouter from './routes/livros.routes.js'
import usuariosRouter from './routes/usuarios.routes.js'
import emprestimosRouter from './routes/emprestimos.routes.js';
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json' with { type: 'json' }
import { tratarErro } from './middlewares/erro.middleware.js';
import generosRouter from './routes/genero.routes.js'


const app = express()
const port = 3000
app.use(express.json())

app.use('/livros', livrosRouter)

app.use('/usuarios',usuariosRouter)

app.use('/emprestimos',emprestimosRouter)

app.use('/generos',generosRouter)

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
)

app.use(tratarErro)

app.listen(port, () => {
  console.log(`API REST de livros rodando na porta ${port}`)
})