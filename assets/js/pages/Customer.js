import React, {useEffect, useState} from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {CUSTOMERS_API} from "../config";

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
            const data = await axios.get(CUSTOMERS_API + "/" + id)
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
            setErrors({})
            if (editing) {
                await axios.put(CUSTOMERS_API + "/" + id, customer);
                toast.success("Le client a bien été modifié");
                history.replace("/customers");
            } else {
                await axios.post(CUSTOMERS_API, customer);
                toast.success("Le client a bien été enregistré");
                history.replace("/customers");
            }
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
            <div className="card w-75 mx-auto">
                <div className="card-header">
                    {!editing && <h3>Création d'un client</h3> || <h3>Modification d'un client</h3>}
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <Field name="lastName" label="Nom" placeholder="Nom de famille" value={customer.lastName} onChange={handleChange} error={errors.lastName} />
                        <Field name="firstName" label="Prénoms" placeholder="Prénoms" value={customer.firstName} onChange={handleChange} error={errors.firstName} />
                        <Field name="email" label="Email" placeholder="Adresse email" type="email" value={customer.email} onChange={handleChange} error={errors.email} />
                        <Field name="company" label="Entreprise" placeholder="Entreprise du client" value={customer.company} onChange={handleChange} />
                        <div className="form-groupe">
                            <button type="submit" className="btn btn-primary me-2">Enregistrer</button>
                            <Link to="/customers" className="btn btn-light">Retour à la liste</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Customer;