import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.css';
import './styles/bootstrap.min.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './js/pages/Home';
import Navbar from "./js/components/Navbar";
import CustomerPage from "./js/pages/CustomerPage";
import InvoicePage from "./js/pages/InvoicePage";

const App = () => {
    return (
        <div className="app">
            <HashRouter>
                <Navbar/>
                <Switch>
                    <Route path="/customers" component={CustomerPage} />
                    <Route path="/invoices" component={InvoicePage} />
                    <Route path="/" component={Home} />
                </Switch>
            </HashRouter>
        </div>
    );
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);
