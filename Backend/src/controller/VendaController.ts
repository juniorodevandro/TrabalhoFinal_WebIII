import { Request, Response } from "express";
import { client } from "../infra/prisma/cliente";
import { Resposta } from "../model/Resposta";

export default class VendaController {
    static async List(request: Request, response: Response) {
        try {
            let { id, skip, take } = request.query;
            skip = skip && String(skip).trim() != '' ? String(skip).trim() : '0';
            take = take && String(take).trim() != '' ? String(take).trim() : '20';

            let resposta = new Resposta();
            resposta.skip = skip;
            resposta.take = take;
            
            if (id) {
                let venda = await client.vendas.findMany({

                    where: {
                        id: Number(id)
                    },
                    orderBy: {
                        id: 'asc'
                    }
                });
                if (venda[0]) {
                    resposta.totalLinhas = 1;
                    resposta.dados = venda[0];
                } else {
                    resposta.dados = {
                        mensagem: "Não encontrado"
                    }
                    return response.status(406).json(resposta);   
                };

            } else {
                const vendas = await client.vendas.findMany({
                    skip: Number(skip),
                    take: Number(take),
                });
                if (vendas) {
                    resposta.totalLinhas = vendas.length;
                    resposta.dados = vendas;

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
            const venda = await client.vendas.create({
                data: {
                    album_id: Number(data.album_id),
                    observacao: data.observacao
                }
            });
            if (venda) {
                return response.json(
                    venda
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
            const updateVenda = await client.vendas.update({
                where: {
                    id: Number(data.id)
                },
                data: {
                    album_id: Number(data.album_id),
                    observacao: data.observacao
                }
            });
            if (updateVenda) {
                return response.json(updateVenda);
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
                const deleteVenda = await client.vendas.delete({
                    where: {
                        id: Number(id)
                    }
                })
                if (deleteVenda) {
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