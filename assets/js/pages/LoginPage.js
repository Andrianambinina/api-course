import React, {useState} from 'react';
import AuthAPI from "../services/authAPI";

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
            history.replace("/customers");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <form className="form-signin" onSubmit={handleSubmit}>
                <div className="text-center mb-4">
                    <h1 className="h3 mb-3 font-weight-normal">Connexion à l'application</h1>
                </div>

                <div className="form-label-group">
                    <input type="email" id="username" className={"form-control" + (error && " is-invalid")} name="username"
                           placeholder="Adresse email" value={credentials.username} onChange={handleChange}/>
                    {error && <p className="invalid-feedback">{error}</p>}
                    <label htmlFor="username">Adresse email</label>
                </div>

                <div className="form-label-group">
                    <input type="password" id="password" className="form-control" name="password"
                           placeholder="Mot de passe" value={credentials.password} onChange={handleChange} />
                    <label htmlFor="password">Mot de passe</label>
                </div>
                <button className="btn btn-lg btn-info btn-block" type="submit">Se connecter</button>
                <p className="mt-5 mb-3 text-muted text-center">&copy; Zo Andrianambinina 2022</p>
            </form>
        </div>
    );
};

export default LoginPage;
