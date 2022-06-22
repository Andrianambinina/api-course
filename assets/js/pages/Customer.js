import React, {useState} from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import axios from "axios";

const Customer = () => {

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

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCustomer({...customer, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/customers", customer);
            setErrors({})
        } catch (e) {
            const apiErrors = {};
            e.response.data.violations.forEach((violation) => {
                apiErrors[violation.propertyPath] = violation.message
            })
            setErrors(apiErrors);
        }
    }

    return (
        <div className="container">
            <h1>Création d'un client</h1>
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