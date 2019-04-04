// create.component.js
import React, { Component } from 'react';
import axios from 'axios';
import Notifications, { notify } from 'react-notify-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { URL_SERVER } from "../shared/config";

const toastColor = {
    background: '#505050',
    text: '#fff'
};

export default class Create extends Component {

    constructor(props) {
        super(props);
        this.toast = notify.createShowQueue();
        this.onChangeProductRef = this.onChangeProductRef.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductDescription = this.onChangeProductDescription.bind(this);
        this.onChangeProductCost = this.onChangeProductCost.bind(this);
        this.onChangeProductCount = this.onChangeProductCount.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
        this.state = {  // Datos del formulario en estado vacío
            ref: '',
            name: '',
            description: '',
            cost: '',
            count: '',
            date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        }
    }

    // Obtener los valores de formulario
    onChangeProductRef(event) {
        this.setState({
           ref: event.target.value
        });
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

    onReset() {
        this.setState({
            ref: '',
            name: '',
            description: '',
            cost: '',
            count: '',
            date: ''
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const url =  URL_SERVER + '/products';
        const formData = new FormData();
        formData.append('file', this.uploadInput.files[0]);
        const product = {
            ref: this.state.ref,
            name: this.state.name,
            description: this.state.description,
            cost: this.state.cost,
            count: this.state.count,
            date: this.state.date,
        };
        axios.post(url, product).then( res => {
                this.toast(`Ha sido registrado exitosamente: ${res.data.name}`, 'custom', 2000, toastColor);
                this.onReset();
            if (res) {
                axios.put(URL_SERVER + '/upload/' + res.data.code, formData)
                    .then(() => this.toast('Imagen cargada.', 'custom', 2000, toastColor))
                        .catch(() => this.toast(`No registro una imagen con este producto: ${res.data.name}`, 'custom', 2000, toastColor));
            }
            else this.toast(`No registro una imagen con este producto: ${res.data.name}`, 'custom', 2000, toastColor)
        }).catch( () => {
            this.toast(`Hubo un error al registrar este producto: ${this.state.product.name}`, 'custom', 2000, toastColor);
        });
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
                        <FontAwesomeIcon icon="save" /> Guardar
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
