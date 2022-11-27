import React from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';

function setSortIcon(direction) {
    if (direction === 'asc') {
        return (
            <span> <i className="fas fa-arrow-up"></i></span>
        );
    } else if (direction === 'desc') {
        return (
            <span> <i className="fas fa-arrow-down"></i></span>
        );
    }
}

export default class TableColumn extends React.Component {

    render() {

        const { isImage, ...rest } = this.props;

        return (
            <TableHeaderColumn
                caretRender={setSortIcon}
                {...rest}
            >
                {this.props.children}
            </TableHeaderColumn>
        )
    };
}
