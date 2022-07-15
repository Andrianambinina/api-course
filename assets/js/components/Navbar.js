import React from 'react';
import AuthAPI from "../services/authAPI";
import {toast} from "react-toastify";
import {NavLink} from "react-router-dom";

const Navbar = ({isAuthenticated, onLogout, history}) => {

    const handleLogout = () => {
        AuthAPI.logout();
        onLogout(false);
        toast.info('Vous êtes désormais déconnecté ');
        history.replace("/login");
    };

    return (
        <header className="p-3 mb-3 border-bottom">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex mb-2 me-5 text-dark text-decoration-none">
                        <span className="fs-4">Symfony React</span>
                    </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li>
                            <NavLink to="/customers" className="nav-link px-2 link-dark">Client</NavLink>
                        </li>
                        <li>
                            <NavLink to="/invoices" className="nav-link px-2 link-dark">Facture</NavLink>
                        </li>
                    </ul>

                    <div className="col-md-3 text-end">
                        {
                            (!isAuthenticated && (<>
                                <NavLink to="/login" className="btn btn-outline-primary me-2">Connexion</NavLink>
                                <NavLink to="/register" className="btn btn-primary">S'inscrire</NavLink>
                            </>
                            )) || (
                                <NavLink to="#" className="btn btn-light" onClick={handleLogout}>Se déconnecter</NavLink>
                            )
                        }
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
