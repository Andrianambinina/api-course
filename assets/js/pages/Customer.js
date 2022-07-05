import React, {useEffect, useState} from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

const Customer = ({match, history}) => {
    const { id } = match.params;

    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    })

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    })

    const editCustomer = async id => {
        try {
            const data = await axios.get("http://127.0.0.1:8000/api/customers/" + id)
                .then((response) => response.data);
            const { lastName, firstName, email, company } = data;
            setCustomer({lastName, firstName, email, company});
        } catch (e) {
            toast.error("Impossible de charger le client demandé");
        }
    }

    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (id !== "new") {
            setEditing(true)
            editCustomer(id);
        }
    }, [id])

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCustomer({...customer, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (editing) {
                const response = await axios.put("http://127.0.0.1:8000/api/customers/" + id, customer);
                toast.success("Le client a bien été modifié");
                history.replace("/customers");
            } else {
                const response = await axios.post("http://127.0.0.1:8000/api/customers", customer);
                toast.success("Le client a bien été enregistré");
                history.replace("/customers");
            }
            setErrors({})
        } catch ({response}) {
            const { violations } = response.data
            if (violations) {
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors);
                toast.error("Des erreurs dans votre forumlaire");
            }
        }
    }

    return (
        <div className="container">
            {!editing && <h3>Création d'un client</h3> || <h3>Modification d'un client</h3>}
            <form onSubmit={handleSubmit}>
                <Field name="lastName" label="Nom" placeholder="Nom de famille" value={customer.lastName} onChange={handleChange} error={errors.lastName} />
                <Field name="firstName" label="Prénoms" placeholder="Prénoms" value={customer.firstName} onChange={handleChange} error={errors.firstName} />
                <Field name="email" label="Email" placeholder="Adresse email" type="email" value={customer.email} onChange={handleChange} error={errors.email} />
                <Field name="company" label="Entreprise" placeholder="Entreprise du client" value={customer.company} onChange={handleChange} />
                <div className="form-groupe">
                    <button type="submit" className="btn btn-info">Enregistrer</button>
                    <Link to="/customers" className="btn btn-link">Retour à la liste</Link>
                </div>
            </form>
        </div>
    );
};

export default Customer;