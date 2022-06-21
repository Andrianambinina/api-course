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
        <div className="app">
            <HashRouter>
                <NavbarWithRouter isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated} />
                <Switch>
                    <Route path="/login" render={(props) => (<LoginPage onLogin={setIsAuthenticated} {... props} />)} />
                    <PrivateRoute path="/customers" isAuthenticated={isAuthenticated} component={CustomerPage} />
                    <PrivateRoute path="/invoices" isAuthenticated={isAuthenticated} component={InvoicePage} />
                    <Route path="/" component={Home} />
                </Switch>
            </HashRouter>
        </div>
    );
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);
