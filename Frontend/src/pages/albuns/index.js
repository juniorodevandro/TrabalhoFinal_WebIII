import React, { Fragment, useEffect, useState } from 'react';
import { Card, Grid, Button, Container } from '@material-ui/core';
import { Alerta } from '../../components';

import api from "../../services/api";

import Listagem from './listagem';
import Cadastro from './cadastro.js';


function Album() {


    /**
     * 0 => Listagem
     * 1 => Cadastro
     */
    const [pageTipe, setPageTipe] = useState(0);
    const [content, setContent] = useState([]);

    const [alert, setAlert] = useState("");
    const [alertType, setAlertType] = useState("");

    const [album, setAlbum] = useState("");

    const headers = {
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*'
    }

    useEffect(() => {
        api.get("album", '', headers)
            .then(response => {
                var content = []
                console.log(response.data.dados)
                response.data.dados.forEach(row => {
                    content.push({
                        id: row.id,
                        nome: row.nome,
                        ano: row.ano,
                        artista: ((row.artista_id != null) ? row.artista_id.nome : ''),
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

        api.get(`album/${id}`, '', headers)
            .then(response => {
                let dataResponse = response.data.album;
                let album = {
                    id: dataResponse.id,
                    nome: dataResponse.nome,
                    artista: ((dataResponse.artista != null) ? dataResponse.artista : {})
                }

                console.log(album)
                setAlbum(album);
                setPageTipe(2);
            })
            .catch((err) => {
                setAlertType("error");
                setAlert("Falha ao buscar informações do Album. Por favor tente novamente mais tarde ou contate o Suporte Técnico.");
                console.log("Error");
                console.log(err.stack);
            });

    }

    function remover(id) {
        const headers = {
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*'
        }

        api.delete(`album/${id}`, '', headers)
            .then(response => {
                if (response.status === 200) {
                    setAlertType("success");
                    setAlert("Album Removido com sucesso.");
                } else {
                    setAlertType("danger");
                    setAlert("Falha ao tentar remover Album. Por favor tente novamente mais tarde ou contate o Suporte Técnico.");
                }
                setPageTipe(1);
                setPageTipe(0);
            })
            .catch((err) => {
                setAlertType("danger");
                setAlert("Falha ao tentar remover Album. Por favor tente novamente mais tarde ou contate o Suporte Técnico.");
                console.log("Error");
                console.log(err.stack);
            });
    }

    function cadastroSucesso() {
        setAlertType("success");

        setAlert(
            (album !== "")
                ? "Album Alterado com sucesso."
                : "Album Inserido com sucesso."
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
                <h1>Gestão de Albuns</h1>

                {
                    alertType !== "" && <Alerta type={alertType} title={alertType === "success" ? 'Sucesso!' : 'Falha!'} message={alert} />
                }

                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            <Grid container item xs={12} justify="space-between" alignItems="center">
                                <Grid item></Grid>
                                <Grid item className="m-3">
                                    {pageTipe === 0 && (<h3>Listagem de Albuns</h3>)}
                                    {pageTipe === 1 && (<h3>Cadastro de Album</h3>)}
                                    {pageTipe === 2 && (<h3>Edição de Album</h3>)}
                                </Grid>
                                <Grid item className="m-2">
                                    {pageTipe === 0
                                        ? (<Button className="p-3" variant="contained" color="primary" onClick={() => { setAlbum(""); setAlertType(""); setPageTipe(1) }}>Cadastrar Novo Album</Button>)
                                        : (<Button className="p-3" variant="contained" color="primary" onClick={() => { setAlbum(""); setAlertType(""); setPageTipe(0) }}>Voltar</Button>)
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
                            album={album} />)
                    }
                </Grid>
            </Container>
        </Fragment>
    );
}

export default Album;