import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import Home from './pages/home';
import Musica from './pages/musicas';
import Album from './pages/albuns';
import Artista from './pages/artistas';

const Routes = () => {
    const location = useLocation();

    return (
            <Switch>
                <Redirect exact from="/" to="/home" />
                <Switch location={location} key={location.pathname}>
                    <Route path="/home" component={Home} />
                    <Route path="/musicas" component={Musica} />
                    <Route path="/albuns" component={Album} />
                    <Route path="/artistas" component={Artista} />
                </Switch>
            </Switch>
    );
};

export default Routes;
