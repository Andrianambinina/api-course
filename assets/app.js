import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './styles/app.css';
import './styles/bootstrap.min.css';
import {HashRouter, Switch, Route, withRouter, Redirect} from 'react-router-dom';
import Home from './js/pages/Home';
import Navbar from "./js/components/Navbar";
import CustomerPage from "./js/pages/CustomerPage";
import InvoicePage from "./js/pages/InvoicePage";
import LoginPage from "./js/pages/LoginPage";
import AuthAPI from "./js/services/authAPI";
import Customer from "./js/pages/Customer";
import Invoice from "./js/pages/Invoice";
import RegisterPage from "./js/pages/RegisterPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

AuthAPI.setup();

const PrivateRoute = ({path, isAuthenticated, component}) =>
    isAuthenticated ? (
        <Route path={path} component={component} />
    ) : (
        <Redirect to="login" />
    )

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated);
    const NavbarWithRouter = withRouter(Navbar);

    return (
        <div className="">
            <HashRouter>
                <NavbarWithRouter isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated} />
                <Switch>
                    <Route path="/login" render={(props) => (<LoginPage onLogin={setIsAuthenticated} {... props} />)} />
                    <Route path="/register" component={RegisterPage} />
                    <PrivateRoute path="/invoices/:id" isAuthenticated={isAuthenticated} component={Invoice} />
                    <PrivateRoute path="/invoices" isAuthenticated={isAuthenticated} component={InvoicePage} />
                    <PrivateRoute path="/customers/:id" isAuthenticated={isAuthenticated} component={Customer} />
                    <PrivateRoute path="/customers" isAuthenticated={isAuthenticated} component={CustomerPage} />
                    <Route path="/" component={Home} />
                </Switch>
            </HashRouter>
            <ToastContainer />
        </div>
    );
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);
