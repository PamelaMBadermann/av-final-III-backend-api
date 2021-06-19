export default class Recado {
    public id_recado: number;
    public titulo: string;
    public descricao: string;

    constructor (id_recado: number, titulo: string, descricao: string) {
        this.id_recado = id_recado;
        this.titulo = titulo;
        this.descricao = descricao;
    }
}