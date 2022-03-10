import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignInAlt, faSignOutAlt, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Symfony React</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor03">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/customers">Client</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/invoices">Facture</Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <button className="btn btn-light">
                                <FontAwesomeIcon icon={faUserPlus}/>
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-info">
                                <FontAwesomeIcon icon={faSignInAlt}/>
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger">
                                <FontAwesomeIcon icon={faSignOutAlt}/>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
