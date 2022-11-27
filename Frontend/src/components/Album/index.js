import React from 'react';
import { NavLink, Link } from 'react-router-dom';


/**
 * Componente para gerar um album do bootstrap
 * @param musica.name => Nome da Musica
 * @param musica.desc => Descricação da Música
 */
export default function Album(musica) {

    return (
        <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <p className="card-text">{musica.name}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
