import React from "react";
import { Card, CardContent, Grid } from '@material-ui/core';
import { Table, TableColumn } from '../../components';

class Listagem extends React.Component {

    render() {

        const createCrudButtons = (cell, row) => {
            return (
                <div>
                    <button type="button" className="btn btn-outline-info ml-1" onClick={() => this.props.editar(row.id)}> Editar </button>
                    <button type="button" className="btn btn-outline-danger ml-1" onClick={() => this.props.remover(row.id)}> Excluir </button>
                </div>
            )
        }

        const options = {
            defaultSortName: 'id',
            defaultSortOrder: 'asc'
        };

        return (
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Table
                            data={this.props.dataContent}
                            options={options}>
                            <TableColumn
                                dataField='id'
                                isKey
                                hidden>
                                ID
                            </TableColumn>
                            <TableColumn
                                dataField='nome'
                                searchable
                                dataSort>
                                Nome do Album
                            </TableColumn>
                            <TableColumn
                                dataField='ano'
                                searchable
                                dataSort>
                                Data de Lançamento
                            </TableColumn>
                    
                            <TableColumn
                                dataField='artista'
                                searchable
                                dataSort>
                                Artista do Album
                            </TableColumn>                           
                            <TableColumn
                                dataFormat={createCrudButtons}
                                searchable={false}
                                editable={false}>
                                Ações
                            </TableColumn>
                        </Table>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}

export default Listagem;
