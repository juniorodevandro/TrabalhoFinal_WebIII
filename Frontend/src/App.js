import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components';
import Routes from './Routes';
import './global-style.css'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className='container container-geral'>
                    <Header />
                    <Routes />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
