"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
const listaRecados = [];
async function validarRecado(request, response, next) {
    const { titulo, descricao } = request.body;
    if (!titulo || !descricao) {
        return response.json({
            mensagem: 'Dados invalidos!'
        }).status(400);
    }
    next();
}
app.post('/', validarRecado, (request, response) => {
    const { titulo, descricao } = request.body;
    const recado = {
        id_recado: listaRecados.lenght,
        titulo,
        descricao
    };
    listaRecados.push(recado);
    return response.status(200).json(recado);
});
app.put('/', validarRecado, (request, response) => {
    const { id_recado, titulo, descricao } = request.body;
    const index = listaRecados.findIndex((recado) => recado.id_recado == id_recado);
    listaRecados[index] = {
        titulo,
        descricao
    };
    return response.json(listaRecados[index]);
});
async function validarId(request, response, next) {
    const { id_recado } = request.body;
    if (!id_recado) {
        return response.json({
            mensagem: 'Id inválido'
        }).status(400);
    }
    next();
}
app.delete('/', validarId, (request, response) => {
    const { id_recado } = request.body;
    const index = listaRecados.findIndex((recado) => recado.id_recado == id_recado);
    listaRecados.splice(index, 1);
    return response.sendStatus(204);
});
app.get('/', (request, response) => {
    return response.json(listaRecados);
});
app.get('/', (request, response) => {
    const { id_recado } = request.body;
    const recado = listaRecados.find((recado) => recado.id_recado == id_recado);
    return response.json(recado);
});
app.listen(process.env.PORT || 8080, () => {
    console.log('API deusa rodando... ♥');
});
