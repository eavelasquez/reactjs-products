// TableRow.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { URL_SERVER } from "./config";
import axios from 'axios/index';
import Notifications, { notify } from 'react-notify-toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";

const toastColor = {
    background: '#505050',
    text: '#fff'
};

class TableRow extends Component {

    constructor(props) {
        super(props);
        this.toast = notify.createShowQueue();
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete() {
        const url = URL_SERVER + `/products/${ this.props.obj.code }`;
        axios.delete(url).then( response => {
            this.toast(`Este producto ha sido eliminado: ${this.props.obj.name}`, 'custom', 2000, toastColor);
            console.log(response.data);
        }).catch( err => {
            this.toast(`Hubo un error al eliminar este producto: ${this.props.obj.name}`, 'custom', 2000, toastColor);
            console.error(err);
        });
    }

    render() {
        return (
            <tr>
                <td>{ this.props.obj.ref }</td>
                <td>{ this.props.obj.name }</td>
                <td>{ this.props.obj.description }</td>
                <td>{ this.props.obj.cost }</td>
                <td>{ this.props.obj.count }</td>
                <td>{ this.props.obj.date }</td>
                <td className="text-center"><a href={this.props.obj.img} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon="image" /></a></td>
                <td className="text-center">
                    <Link to={'/edit/'+this.props.obj.code} className="btn btn-outline-dark p-2 mr-2 btn-sm">
                        <FontAwesomeIcon icon="edit" />
                    </Link>
                    <button onClick={this.onDelete} type="button" className="btn btn-outline-danger p-2 ml-2 btn-sm">
                        <FontAwesomeIcon icon="trash" />
                        <Notifications />
                    </button>
                </td>
            </tr>
        )
    }
}

export default TableRow;
