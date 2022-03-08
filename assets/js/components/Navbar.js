import React from 'react';

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
                            <a className="nav-link" href="#">Client</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Facture</a>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <button className="btn btn-light">Inscription</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-success">Connexion</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger">Déconnexion</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
