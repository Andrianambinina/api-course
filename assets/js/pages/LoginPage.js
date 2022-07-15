import React, {useState} from 'react';
import AuthAPI from "../services/authAPI";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

const LoginPage = ({onLogin, history}) => {

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        setCredentials({...credentials, [name]: value})
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await AuthAPI.authenticate(credentials);
            setError('');
            onLogin(true);
            toast.success("Vous êtes désormais connecté");
            history.replace("/customers");
        } catch (error) {
            setError(error.message);
            toast.error("Une erreur est survenue");
        }
    };

    return (
        <div className="form">
            <main className="form-signin" onSubmit={handleSubmit}>
                <form>
                    <img className="mb-4" src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">S'identifier</h1>

                    <div className="form-floating">
                        <input type="email" className={"form-control" + (error && " is-invalid")} id="floatingInput" name="username"
                               placeholder="Adresse email" value={credentials.username} onChange={handleChange}/>
                        {error && <p className="invalid-feedback">{error}</p>}
                        <label htmlFor="floatingInput">Adresse email</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" name="password"
                               placeholder="Votre mot de passe" value={credentials.password} onChange={handleChange}  />
                        <label htmlFor="floatingPassword">Mot de passe</label>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Se souvenir de moi
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Se connecter</button>
                    <p className="mt-5 mb-3 text-muted">Vous n'avez pas encore de compte? <Link to="/register">S'inscrire maintenant!</Link></p>
                </form>
            </main>
        </div>
    );
};

export default LoginPage;