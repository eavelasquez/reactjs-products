import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Create from "./components/create.component";
import Edit from "./components/edit.component";
import Index from "./components/index.component";

class App extends Component {
  render() {
    return (
        <Router>
          <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
            <div className="container">
              <Link to={'/'} className="navbar-brand"><FontAwesomeIcon icon={'store-alt'}/> StoreApp</Link>
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to={'/create'} className="nav-link">Producto</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/index'} className="nav-link">Ver productos</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="container mt-5">
            <div className="row">
              <div className="col-12 border border-warning shadow p-3 mb-5 bg-white rounded">
                <h2 className="text-secondary ml-3">¡Bienvenido StoreApp! <FontAwesomeIcon icon={'cash-register'}/></h2>
              </div>
              <div className="col-12">
                <Switch>
                  <Route exact path='/create' component={ Create } />
                  <Route path='/edit/:id' component={ Edit } />
                  <Route path='/index' component={ Index } />
                </Switch>
              </div>
            </div>
          </div>
        </Router>
    );
  }
}

library.add(fab, fas);
export default App;
