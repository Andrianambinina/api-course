import React, {useState} from 'react';
import Field from "../components/forms/Field";
import customer from "./Customer";
import {Link} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

const RegisterPage = ({history}) => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        passwordConfirm: "",
    });

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({...user, [name]: value});
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const apiErrors = {};

        if (user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "Les mots de passe ne correspondent pas !";
            setErrors(apiErrors);
            toast.error("Des erreurs dans votre formulaire !");
            return
        }

        try {
            await axios.post("http://127.0.0.1:8000/api/users", user);
            setErrors({});
            toast.success("Vous êtes désormais inscrit, vous pouvez vous connecter !");
            history.replace("/login");
        } catch ({response}) {
            const {violations} = response.data;
            if (violations) {
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
            }
            toast.error("Des erreurs dans votre formulaire !");
        }
    }

    return (
        <div className="container">
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <Field name="firstName" label="Prénom" placeholder="Votre prénom" error={errors.firstName}
                       onChange={handleChange} value={user.firstName}/>
                <Field name="lastName" label="Nom de famille" placeholder="Votre nom de famille"
                       error={errors.lastName} onChange={handleChange} value={user.lastName}/>
                <Field name="email" label="Adresse email" type="email" placeholder="Votre adresse email"
                       error={errors.email} onChange={handleChange} value={user.email}/>
                <Field name="password" label="Mot de passe" type="password" placeholder="Votre mot de passe"
                       error={errors.password} onChange={handleChange} value={user.password}/>
                <Field name="passwordConfirm" label="Confirmation de mot de passe" type="password"
                       placeholder="Confirmer votre mot de passe" error={errors.passwordConfirm} onChange={handleChange} value={user.passwordConfirm}/>
                <div className="form-group">
                    <button type="submit" className="btn btn-info">S'inscrire</button>
                    <Link to="/login" className="btn btn-link">J'ai déjà un compte</Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;