import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import axios from 'axios';
import Recado from './recado';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const listaRecados: any = [];

async function validarRecado
    (request: Request, response: Response, next: NextFunction) {
        const { titulo, descricao } = request.body;

        if (!titulo || !descricao) {
            return response.json({
                mensagem: 'Dados invalidos!'
            }).status(400);
        }
        
        next();
    }

app.post('/recados', validarRecado, (request: Request, response: Response) => {
    const { titulo, descricao } = request.body;

    const recado = {
        id_recado: listaRecados.lenght,
        titulo,
        descricao
    };

    listaRecados.push(recado)
    
    return response.status(200).json(recado);
});

app.put('/recados', validarRecado, (request: Request, response: Response) => {
    const { id_recado, titulo, descricao } = request.body;

    const index = listaRecados.findIndex((recado: any) => recado.id_recado == id_recado);

    listaRecados[index] = {
        titulo,
        descricao
    }

    return response.json(listaRecados[index]);
});

async function validarId(request: Request, response: Response, next: NextFunction) {
    const { id_recado } = request.body;
    
    if(!id_recado) {
        return response.json({
            mensagem: 'Id inválido'
        }).status(400);
    }

    next();
}

app.delete('/recados', validarId, (request: Request, response: Response) => {
    const { id_recado } = request.body;

    const index = listaRecados.findIndex((recado: any) => recado.id_recado == id_recado);

    listaRecados.splice(index, 1);

    return response.sendStatus(204);
});

app.get('/recados', (request: Request, response: Response) => {
    return response.json(listaRecados);
});

app.get('/recados', (request: Request, response: Response) => {
    const { id_recado } = request.body;

    const recado = listaRecados.find((recado: any) => recado.id_recado == id_recado);

    return response.json(recado);
});

app.listen(process.env.PORT || 8080, () => {
    console.log('API deusa rodando... ♥')
});