import { Request, Response } from "express";
import { client } from "../infra/prisma/cliente";
import { Resposta } from "../model/Resposta";

export default class MusicaController {
    static async List(request: Request, response: Response) {
        try {
            let { id, skip, take } = request.query;
            skip = skip && String(skip).trim() != '' ? String(skip).trim() : '0';
            take = take && String(take).trim() != '' ? String(take).trim() : '20';

            let resposta = new Resposta();
            resposta.skip = skip;
            resposta.take = take;
            
            if (id) {
                let musica = await client.musicas.findMany({

                    where: {
                        id: Number(id)
                    },
                    orderBy: {
                        id: 'asc'
                    }
                });
                if (musica[0]) {
                    resposta.totalLinhas = 1;
                    resposta.dados = musica[0];
                } else {
                    resposta.dados = {
                        mensagem: "Não encontrado"
                    }
                    return response.status(406).json(resposta);   
                };

            } else {
                const musicas = await client.musicas.findMany({
                    skip: Number(skip),
                    take: Number(take),
                });
                if (musicas) {
                    resposta.totalLinhas = musicas.length;
                    resposta.dados = musicas;

                } else {
                    resposta.dados = {
                        mensagem: "Não encontrado"
                    }
                    return response.status(406).json(resposta);   
                };
            }
            

            return response.json(resposta);   

            } catch (error) {
                return response.status(500).json(
                    {
                        mensagem: error
                    }
                );
            }
    };

    static async Create(request: Request, response: Response) {
        const data = request.body;
        try {
            const musica = await client.musicas.create({
                data: {
                    nome: data.nome,
                    album_id: Number(data.album_id)
                }
            });
            if (musica) {
                return response.json(
                    musica
                );
            }  
        } catch (error) {
            return response.status(500).json(
                {
                    mensagem: error
                }
            );
        };
    };

    static async Update(request: Request, response: Response) {
        try {
            const data = request.body;
            const updataMusica = await client.musicas.update({
                where: {
                    id: Number(data.id)
                },
                data: {
                    nome: data.nome,
                    album_id: Number(data.album_id)
                }
            });
            if (updataMusica) {
                return response.json(updataMusica);
            };
        } catch (error) {
            return response.status(500).json(
                {
                    mensagem: error
                }
            );
        };
    };

    static async Delete(request: Request, response: Response) {
        const { id } = request.query;
        try {
            if (id) {
                const deleteMusica = await client.musicas.delete({
                    where: {
                        id: Number(id)
                    }
                })
                if (deleteMusica) {
                    return response.status(202).json(
                        {
                            mensagem: "Sucesso"
                        }
                    );
                };
            }else{
                return response.status(406).json(
                    {
                        mensagem: "Não encontrado"
                    }
                );
            };
        } catch (error) {
            return response.status(500).json(
                {
                    mensagem: error
                }
            );
        };
    };
};