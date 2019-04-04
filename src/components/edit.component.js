// edit.component.js
import React, { Component } from 'react';
import { URL_SERVER } from "../shared/config";
import Notifications, { notify } from 'react-notify-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const toastColor = {
    background: '#505050',
    text: '#fff'
};

export default class Edit extends Component {

    constructor(props) {
        super(props);
        this.toast = notify.createShowQueue();
        this.onChangeProductRef = this.onChangeProductRef.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductDescription = this.onChangeProductDescription.bind(this);
        this.onChangeProductCost = this.onChangeProductCost.bind(this);
        this.onChangeProductCount = this.onChangeProductCount.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
        this.state = ({
            code: null,
            ref: '',
            name: '',
            description: '',
            cost: '',
            count: '',
            date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
        });
    }

    componentDidMount() {
        const url = URL_SERVER + '/products/' + this.props.match.params.id;
        axios.get(url).then( response => {
            this.setState({
                code: response.data.code,
                ref: response.data.ref,
                name: response.data.name,
                description: response.data.description,
                cost: response.data.cost,
                count: response.data.count
            });
        }).catch(err => {
            console.log(err);
        });
    }

    onChangeProductRef(event) {
        this.setState({
            ref: event.target.value
        })
    }

    onChangeProductName(event) {
        this.setState({
            name: event.target.value
        });
    }

    onChangeProductDescription(event) {
        this.setState({
            description: event.target.value
        });
    }

    onChangeProductCost(event) {
        this.setState({
            cost: event.target.value
        });
    }

    onChangeProductCount(event) {
        this.setState({
            count: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const url = URL_SERVER + '/products/update/' + this.props.match.params.id;
        const formData = new FormData();
        formData.append('file', this.uploadInput.files[0]);
        const product = {
            ref: this.state.ref,
            name: this.state.name,
            description: this.state.description,
            cost: this.state.cost,
            count: this.state.count,
            date: this.state.date
        };

        axios.put(url, product).then( response => {
            this.toast(`Ha sido actualizado exitosamente: ${response.data.name}`, 'custom', 2000, toastColor);
            console.log(response.data);
            if (response) {
                axios.put(URL_SERVER + '/upload/' + this.state.code, formData)
                    .then(() => this.toast('Imagen cargada.', 'custom', 2000, toastColor))
                    .catch( () => this.toast(`No registro una imagen con este producto: ${response.data.name}`, 'custom', 2000, toastColor))
            } else {
                this.toast(`No registro una imagen con este producto: ${response.data.name}`, 'custom', 2000, toastColor)
            }
        }).catch( err => {
            this.toast('Hubo un error al actualizar este producto', 'custom', 2000, toastColor);
            console.log(err);
        });
        this.props.history.push('/index');
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <form autoComplete="off" onSubmit={this.onSubmit}>
                        <div className="form-row">
                            <div className="form-group col-sm-12 col-md-6">
                                <label htmlFor="inputName">Referencia producto</label>
                                <input type="text" className="form-control" id="inputName" placeholder="Referencia"
                                       value={this.state.ref} onChange={this.onChangeProductRef} pattern={'^[a-zA-Z0-9]*$'} maxLength={240} minLength={3} required/>
                            </div>
                            <div className="form-group col-sm-12 col-md-6">
                                <label htmlFor="inputName">Nombre producto</label>
                                <input type="text" className="form-control" id="inputName" placeholder="Nombre"
                                       value={this.state.name} onChange={this.onChangeProductName} pattern={'^[A-Za-zÀ-ÿ]*$'} maxLength={24} minLength={3} required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputDescription">Descripción producto</label>
                            <textarea className="form-control" id="textareaDescription" placeholder="Este producto es sabroso..."
                                      value={this.state.description} onChange={this.onChangeProductDescription} required/>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-sm-12 col-md-6">
                                <label htmlFor="inputCost">Precio producto</label>
                                <input type="text" className="form-control" id="inputCost" placeholder="$ Precio"
                                       value={this.state.cost} onChange={this.onChangeProductCost} pattern={'^\\d*[0-9](|.\\d*[0-9]|,\\d*[0-9])?$'} maxLength={20} required/>
                            </div>
                            <div className="form-group col-sm-12 col-md-6">
                                <label htmlFor="inputCount">Cantidad producto</label>
                                <input type="number" className="form-control" id="inputCount" placeholder="# ¿Cuántos?"
                                       value={this.state.count} onChange={this.onChangeProductCount} pattern={'^[0-9]*$'} required/>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-outline-dark pl-lg-5 pr-lg-5 float-right">
                            <FontAwesomeIcon icon="edit" /> Actualizar
                        </button>
                    </form>
                </div>
                <div className="col-sm-12 col-md-6">
                    <div className="space-button">
                        <label htmlFor="image" className="button">
                            <FontAwesomeIcon icon="images" size="10x" />
                        </label>
                        <input type="file" id="image" ref={(ref) => { this.uploadInput = ref }} />
                    </div>
                </div>
                <Notifications />
            </div>
        )
    }
}
