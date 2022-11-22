import { Request, Response } from "express";
import { client } from "../infra/prisma/cliente";
import { Resposta } from "../model/Resposta";

export default class AlbumController {
    static async List(request: Request, response: Response) {
        try {
            let { id, skip, take } = request.query;
            skip = skip && String(skip).trim() != '' ? String(skip).trim() : '0';
            take = take && String(take).trim() != '' ? String(take).trim() : '20';

            let resposta = new Resposta();
            resposta.skip = skip;
            resposta.take = take;
            
            if (id) {
                let album = await client.album.findMany({

                    where: {
                        id: Number(id)
                    },
                    orderBy: {
                        id: 'asc'
                    }
                });
                if (album[0]) {
                    resposta.totalLinhas = 1;
                    resposta.dados = album[0];
                } else {
                    resposta.dados = {
                        mensagem: "Não encontrado"
                    }
                    return response.status(406).json(resposta);   
                };

            } else {
                const albuns = await client.album.findMany({
                    skip: Number(skip),
                    take: Number(take),
                });
                if (albuns) {
                    resposta.totalLinhas = albuns.length;
                    resposta.dados = albuns;

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
            const album = await client.album.create({
                data: {
                    nome: data.nome,
                    ano: Number(data.ano),
                    artista_id: Number(data.artista_id)
                }
            });
            if (album) {
                return response.json(
                    album
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
            const updateAlbum = await client.album.update({
                where: {
                    id: Number(data.id)
                },
                data: {
                    nome: data.nome,
                    ano: Number(data.ano),
                    artista_id: Number(data.artista_id)
                }
            });
            if (updateAlbum) {
                return response.json(updateAlbum);
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
                const deleteAlbum = await client.artista.delete({
                    where: {
                        id: Number(id)
                    }
                })
                if (deleteAlbum) {
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