import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {

    return (
        <>
            <header className="p-3 bg-dark text-white">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">                      

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link className="nav-link px-2 text-white" to={'/home'}>Home</Link></li>
                            <li><Link className="nav-link px-2 text-white" to={'/musicas'}>Musicas</Link></li>
                            <li><Link className="nav-link px-2 text-white" to={'/albuns'}>Albuns</Link></li>
                            <li><Link className="nav-link px-2 text-white" to={'/artistas'}>Artistas</Link></li>
                        </ul>                    
                    </div>
                </div>
            </header>

            <hr />
        </>
    );
}
