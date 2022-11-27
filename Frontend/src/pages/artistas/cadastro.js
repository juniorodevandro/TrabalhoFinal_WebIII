import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';

import api from "../../services/api";

function Cadastro(props) {

    const [id, setId] = useState(0);

    const [nome, setName] = useState();
    const [nomeError, setnomeError] = useState("");

    useEffect(() => {
        if (props.artista !== "") {
            defineAlteracao(props.artista);
        }
    }, []);

    function defineAlteracao(artista) {
        setId(artista.id);
        setName(artista.nome);
    }

    function efetuaCadastro() {
        var validaOperacao = true;

        setnomeError("");

        if (nome === "" || nome == null) {
            validaOperacao = false;
            setnomeError("Necessário informar o Nome do artista.");
        }

        if (validaOperacao) {
            console.log("Informações Válidas. Iniciando processo de cadastro...");

            const headers = {
                'Content-Type': 'application/json',
                'access-control-allow-origin': '*'
            }

            var data = {
                nome: nome,
            };

            if (id !== 0) {
                api.patch(`artistas/${id}`, data, headers)
                    .then(response => {
                        if (response.status === 200) {
                            props.cadastroSucesso()
                        } else {
                            props.cadastroFalha(response.data)
                        }
                    })
                    .catch((err) => {
                        props.cadastroFalha("Falha ao Alterar registro do artista. Por favor tente novamente mais tarde ou, se o problema persistir, contate nosso Suporte.");
                        console.log(err.stack);
                    });
            } else {
                console.log(data);
                api.post("artista", data, headers)
                    .then(response => {
                        if (response.status === 201) {
                            props.cadastroSucesso();
                        } else {
                            props.cadastroFalha(response.data)
                        }
                    })
                    .catch((err) => {
                        props.cadastroFalha("Falha ao Cadastrar artista. Por favor tente novamente mais tarde ou, se o problema persistir, contate nosso Suporte.");
                        console.log(err.stack);
                    });
            }
        }
    }

    return (
        <Grid item xs={12}>
            <form>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        className="m-3"
                        id="nome"
                        label="Nome do artista"
                        variant="outlined"
                        type="text"
                        value={nome}
                        onChange={e => setName(e.target.value)}
                        helperText={nomeError}
                        error={(nomeError !== "")}
                    />
                </Grid>
               
                <Grid item xs={6} sm={4} md={3} lg={2} xl={1} className="mr-3 mb-3">
                    <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        className="m-3"
                        onClick={efetuaCadastro}>
                        {id !== 0 && "Alterar"}
                        {id === 0 && "Cadastrar"}
                    </Button>
                </Grid>
            </form>
        </Grid>
    );
}

export default Cadastro;
