import React from 'react';
import {NavLink} from 'react-router-dom';
import AuthAPI from "../services/authAPI";

const Navbar = ({isAuthenticated, onLogout, history}) => {

    const handleLogout = () => {
        AuthAPI.logout();
        onLogout(false);
        history.replace("/login");
    };

    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <a className="navbar-brand" href="#">Symfony React</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
                    aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customers">Client</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/invoices">Facture</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    {
                        (!isAuthenticated && (<>
                            <li className="nav-item">
                                <a href="#" className="nav-link">Inscription</a>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Se connecter</NavLink>
                            </li>
                        </>
                        )) || (
                        <li className="nav-item">
                            <NavLink className="nav-link" to="#" onClick={handleLogout}>Déconnecter</NavLink>
                        </li>)
                    }
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
