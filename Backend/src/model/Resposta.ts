export class Resposta {
    totalLinhas: number;
    skip: string;
    take: string;
    dados: any;

    constructor(){
        this.totalLinhas = 0;
        this.skip = '';
        this.take = '';
    }
}