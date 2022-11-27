import React, { Fragment, useEffect, useState } from 'react';
import api from "../../services/api";
import CardModel from '../../components/Card';
import Album from '../albuns';


function Home() {

    const [musicas, setMusicas] = useState([]);
    const [albuns, setAlbuns] = useState([]);
    const [artistas, setArtista] = useState([]);

    const headers = {
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*'
    }

    useEffect(() => {
        api.get("musica", '', headers)
            .then(response => {
                setMusicas(response.data.found);
            })
            .catch((err) => {
                console.log("Error");
                console.log(err);
            });

            api.get("album", '', headers)
            .then(response => {
                setAlbuns(response.data.found);
            })
            .catch((err) => {
                console.log("Error");
                console.log(err);
            });

            api.get("artista", '', headers)
            .then(response => {
                setArtista(response.data.found);
            })
            .catch((err) => {
                console.log("Error");
                console.log(err);
            });
            
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            <h1>Músicas </h1>
            <hr />           
            <hr />
            <br />


            <h1>Albuns </h1>
            <hr />
            <hr />
            <br />


            <h1>Artistas </h1>
            <hr />
            <hr />
            <br />
        </Fragment>
    );
}

export default Home;