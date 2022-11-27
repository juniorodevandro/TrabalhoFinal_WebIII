
import React, { Fragment } from 'react';

import MuiAlert from '@material-ui/lab/Alert';

/**
 * Componente para apresentação de alerta
 * @param props.type => "success", "error", "warning" ou "info" 
 * @param props.title => Título do alerta
 * @param props.message => Mensagem que será apresentada no alerta
 */
export default function Alerta(props) {

        

    return (
        <Fragment>
            <MuiAlert className="mb-12" severity={props.type}>
                <div className="d-flex align-items-center align-content-center">
                    <span>
                        <strong className="d-block">{props.title}</strong>
                        {props.message}
                    </span>
                </div>
            </MuiAlert>
            <br />
        </Fragment>
    );
}
