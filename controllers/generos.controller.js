import { criarController } from './recurso.controller.js'


const controllerBase = criarController(
    generosRepository,
    "Gênero"
)

export const generosController = {
    ...controllerBase,

}