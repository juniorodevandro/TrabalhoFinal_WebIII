import React, { useState, useEffect } from 'react';
import { Button, Grid, MenuItem, TextField } from '@material-ui/core';

import api from "../../services/api";

function Cadastro(props) {

    const [id, setId] = useState(0);

    const [nome, setName] = useState();
    const [nomeError, setnomeError] = useState("");

    const [ano, setAno] = useState();
    const [anoError, setAnoError] = useState("");

    const [artistas, setArtista] = useState('');
    const [artistaIdError, setArtistaIdError] = useState("");

    const headers = {
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*'
    }

    useEffect(() => {
        api.get("artista", '', headers)
            .then(response => {
                var content = []
                response.data.found.forEach(row => {
                    content.push({
                        id: row.id,
                        nome: row.nome
                    })
                });
                setArtista(content);
            })
            .catch((err) => {
                console.log("Error");
                console.log(err);
            });

        if (props.album !== "") {
            defineAlteracao(props.album);
        }
    }, []);

    function defineAlteracao(album) {
        setId(album.id);
        setName(album.nome);
        setAno(album.ano);
        setArtista(album.artista_id.id);
    }

    function efetuaCadastro() {
        var validaOperacao = true;

        setnomeError("");
        setAnoError("");
        setArtistaIdError("");

        if (nome === "" || nome == null) {
            validaOperacao = false;
            setnomeError("Necessário informar o Nome do album.");
        }


        if (ano === "" || ano == null) {
            validaOperacao = false;
            setAnoError("Necessário informar a Data de Lançamento do Album.");
        }

        if (validaOperacao) {
            console.log("Informações Válidas. Iniciando processo de cadastro...");

            const headers = {
                'Content-Type': 'application/json',
                'access-control-allow-origin': '*'
            }

            let artista = artistas.filter((row) => row.id === artista)

            var data = {
                nome: nome,
                ano: ano,
                artista: artista[0],
            };

            if (id !== 0) {
                api.patch(`album/${id}`, data, headers)
                    .then(response => {
                        if (response.status === 200) {
                            props.cadastroSucesso()
                        } else {
                            props.cadastroFalha(response.data)
                        }
                    })
                    .catch((err) => {
                        props.cadastroFalha("Falha ao Alterar registro do album. Por favor tente novamente mais tarde ou, se o problema persistir, contate nosso Suporte.");
                        console.log(err.stack);
                    });
            } else {
                console.log(data);
                api.post("album", data, headers)
                    .then(response => {
                        if (response.status === 201) {
                            props.cadastroSucesso();
                        } else {
                            props.cadastroFalha(response.data)
                        }
                    })
                    .catch((err) => {
                        props.cadastroFalha("Falha ao Cadastrar Album. Por favor tente novamente mais tarde ou, se o problema persistir, contate nosso Suporte.");
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
                        label="Nome do Album"
                        variant="outlined"
                        type="text"
                        value={nome}
                        onChange={e => setName(e.target.value)}
                        helperText={nomeError}
                        error={(nomeError !== "")}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        className="m-3"
                        id="ano"
                        label="Ano"
                        variant="outlined"
                        type="text"
                        value={ano}
                        onChange={e => setAno(e.target.value)}
                        helperText={anoError}
                        error={(anoError !== "")}
                    />
                </Grid>                
                <Grid item xs={12} sm={4}>
                    <TextField
                        id="artista"
                        fullWidth
                        className="m-3"
                        label="Artista"
                        variant="outlined"
                        value={artistas}
                        onChange={(e) => { setArtista(e.target.value) }}
                        helperText={artistaIdError}
                        error={(artistaIdError !== "")}
                        select>
                        {artistas.map(option => (
                            <MenuItem
                                key={option.id}
                                value={option.id}>
                                {option.nome}
                            </MenuItem>
                        ))}
                    </TextField>
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
