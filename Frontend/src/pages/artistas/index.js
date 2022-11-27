import React, { Fragment, useEffect, useState } from 'react';
import { Card, Grid, Button, Container } from '@material-ui/core';
import { Alerta } from '../../components';

import api from "../../services/api";

import Listagem from './listagem';
import Cadastro from './cadastro.js';


function Artista() {


    /**
     * 0 => Listagem
     * 1 => Cadastro
     */
    const [pageTipe, setPageTipe] = useState(0);
    const [content, setContent] = useState([]);

    const [alert, setAlert] = useState("");
    const [alertType, setAlertType] = useState("");

    const [artista, setartista] = useState("");

    const headers = {
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*'
    }

    useEffect(() => {
        api.get("artista", '', headers)
            .then(response => {
                var content = []
                console.log(response.data)
                response.data.dados.forEach(row => {
                    content.push({
                        id: row.id,
                        nome: row.nome
                    })
                });
                setContent(content);
            })
            .catch((err) => {
                console.log("Error");
                console.log(err);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageTipe]);

    function editar(id) {
        const headers = {
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*'
        }

        api.get(`artista/${id}`, '', headers)
            .then(response => {
                let dataResponse = response.data.artista;
                let artista = {
                    id: dataResponse.id,
                    nome: dataResponse.nome
                }

                setartista(artista);
                setPageTipe(2);
            })
            .catch((err) => {
                setAlertType("error");
                setAlert("Falha ao buscar informações do Artista. Por favor tente novamente mais tarde ou contate o Suporte Técnico.");
                console.log("Error");
                console.log(err.stack);
            });

    }

    function remover(id) {
        const headers = {
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*'
        }

        api.delete(`artista/${id}`, '', headers)
            .then(response => {
                if (response.status === 200) {
                    setAlertType("success");
                    setAlert("Artista Removido com sucesso.");
                } else {
                    setAlertType("danger");
                    setAlert("Falha ao tentar remover Artista. Por favor tente novamente mais tarde ou contate o Suporte Técnico.");
                }
                setPageTipe(1);
                setPageTipe(0);
            })
            .catch((err) => {
                setAlertType("danger");
                setAlert("Falha ao tentar remover Artista. Por favor tente novamente mais tarde ou contate o Suporte Técnico.");
                console.log("Error");
                console.log(err.stack);
            });
    }

    function cadastroSucesso() {
        setAlertType("success");

        setAlert(
            (artista !== "")
                ? "Artista Alterado com sucesso."
                : "Artista Inserido com sucesso."
        );

        setPageTipe(0); // Retorna para lista de agentes.
    }

    function cadastroFalha(msg) {
        setAlertType("error");
        setAlert(msg);
        window.scrollTo(0, 0);
    }


    return (
        <Fragment>
            <Container>
                <h1>Gestão de Artistas</h1>

                {
                    alertType !== "" && <Alerta type={alertType} title={alertType === "success" ? 'Sucesso!' : 'Falha!'} message={alert} />
                }

                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            <Grid container item xs={12} justify="space-between" alignItems="center">
                                <Grid item></Grid>
                                <Grid item className="m-3">
                                    {pageTipe === 0 && (<h3>Listagem de Artistas</h3>)}
                                    {pageTipe === 1 && (<h3>Cadastro de Artista</h3>)}
                                    {pageTipe === 2 && (<h3>Edição de Artista</h3>)}
                                </Grid>
                                <Grid item className="m-2">
                                    {pageTipe === 0
                                        ? (<Button className="p-3" variant="contained" color="primary" onClick={() => { setartista(""); setAlertType(""); setPageTipe(1) }}>Cadastrar Novo Artista</Button>)
                                        : (<Button className="p-3" variant="contained" color="primary" onClick={() => { setartista(""); setAlertType(""); setPageTipe(0) }}>Voltar</Button>)
                                    }
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    {pageTipe === 0
                        ? (<Listagem
                            dataContent={content}
                            editar={editar}
                            remover={remover} />)
                        : (<Cadastro
                            cadastroSucesso={cadastroSucesso}
                            cadastroFalha={cadastroFalha}
                            artista={artista} />)
                    }
                </Grid>
            </Container>
        </Fragment>
    );
}

export default Artista;