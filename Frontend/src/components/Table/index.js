import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable } from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class SearchButton extends Component {
    // It's necessary to implement getValue
    getValue() {
        return ReactDOM.findDOMNode(this).value;
    }

    // It's necessary to implement setValue
    setValue(value) {
        ReactDOM.findDOMNode(this).value = value;
    }

    render() {

        return (
            <input
                className={`form-control`}
                type='text'
                defaultValue={this.props.defaultValue}
                placeholder={this.props.placeholder}
                onKeyUp={this.props.search}
                autoFocus={this.props.autoFocus} />
        );
    }
}

export default class Table extends Component {

    renderShowsTotal(start, to, total) {
        return (
            <p id="renderShowTotalId">
                Apresentando registros de {start} à {to}, de um total de {total} Registros.
            </p>
        );
    }

    render() {

        const { options, dataContent, ...rest } = this.props;

        const tableOptions = {
            sizePerPageList: [
                { text: '100', value: 100 },
                { text: '150', value: 150 },
                { text: '200', value: 200 }
            ],
            sizePerPage: 100,  // which size per page you want to locate as default
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'bottom',  // default is bottom, top and both is all available
            alwaysShowAllBtns: true, // Always show next and previous button
            noDataText: 'Não há registros existentes na tabela.',
            searchPosition: 'left',
            sortIndicator: true,
            searchField: (props) => (
                <SearchButton
                    autoFocus={this.props.searchAutoFocus}
                    {...props} />),
            ...options
        };

        return (
            <BootstrapTable
                data={dataContent}
                pagination
                options={tableOptions}
                striped
                hover
                condensed
                search
                searchPlaceholder='Buscar...'
                multiColumnSort={2}
                wrapperClasses="table-responsive"
                {...rest}>
                {this.props.children}
            </BootstrapTable>
        )
    };
}
