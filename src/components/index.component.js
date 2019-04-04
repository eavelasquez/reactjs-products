// index.component.js
import React, { Component } from 'react';
import axios from 'axios';
import TableRow from '../shared/TableRow';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { URL_SERVER } from "../shared/config";

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = { products: [] };
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts() {
        const url = URL_SERVER + '/products';
        axios.get(url).then( res => {
            this.setState({
                products: res.data
            });
        }).catch( err => {
            console.log(err);
        });
    }

    tabRow() {
        return this.state.products.map(function (object, i) {
           return <TableRow obj={object} key={i} />
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="alert alert-secondary text-secondary text-bold" role="alert">
                        <h4 className="text-center">Listado de productos</h4>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="table-responsive">
                    <table className="table table-sm">
                        <thead className="thead-light">
                        <tr className="text-center">
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Img</th>
                            <th colSpan="2" className="text-center">
                                <FontAwesomeIcon icon="book-reader" />
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            { this.tabRow() }
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        )
    }
}
