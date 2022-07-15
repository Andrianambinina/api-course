import React, {useEffect, useState} from 'react';
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import {Link} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {CUSTOMERS_API, INVOICES_API} from "../config";

const Invoice = ({history, match}) => {

    const { id = "new" } = match.params;

    const [customers, setCustomers] = useState([]);
    const [editing, setEditing] = useState(false);

    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: "SENT"
    })

    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: ""
    });

    const fetchCustomers = async () => {
        try {
            const data = await axios
                .get(CUSTOMERS_API)
                .then((response) => response.data["hydra:member"])
                .catch((error) => console.log(error));
            setCustomers(data);
            if(!invoice.customer) setInvoice({...invoice, customer: data[0].id});
        } catch (error) {
            toast.error("Impossible de charger les clients");
            history.replace('/invoices');
        }
    }

    const fetchInvoice = async (id) => {
        try {
            const {amount, status, customer} = await axios.get(INVOICES_API + "/" + id).then((response) => response.data);
            setInvoice({amount, status, customer: customer.id});
        } catch (error) {
            toast.error("Impossible de charger la facture demandée");
            history.replace('/invoices');
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchInvoice(id);
        }
    }, [id])

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setInvoice({...invoice, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (editing) {
                await axios.put(INVOICES_API + "/" + id, {...invoice, customer: `/api/customers/${invoice.customer}`});
                toast.success("La facture a bien éte modifiée");
            } else {
                await axios.post(INVOICES_API, {...invoice, customer: `/api/customers/${invoice.customer}`});
                toast.success("La facture a bien été enregistrée");
                history.replace("/invoices");
            }
        } catch ({response}) {
            const {violations} = response.data
            if (violations) {
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors);
                toast.error("Des erreurs dans votre formulaire");
            }
        }
    }

    return (
        <div className="container">
            <div className="card w-75 mx-auto">
                <div className="card-header">
                    {editing && (<span className="fs-2">Modification d'un facture</span>) || (<span className="fs-4">Création d'une facture</span>)}
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <Field name="amount" type="number" placeholder="Montant de la facture" label="Montant"
                               onChange={handleChange} value={invoice.amount} error={errors.amount}/>
                        <Select name="customer" label="Client" value={invoice.customer} error={errors.customer} onChange={handleChange}>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>{customer.firstName} {customer.lastName}</option>
                            ))}
                        </Select>
                        <Select name="status" label="Statut" value={invoice.status} error={errors.status} onChange={handleChange}>
                            <option value="SENT">Envoyée</option>
                            <option value="PAID">Payée</option>
                            <option value="CANCELLED">Annulée</option>
                        </Select>
                        <div className="form-groupe">
                            <button type="submit" className="btn btn-primary me-2">Enregistrer</button>
                            <Link to="/invoices" className="btn btn-light">Retour à la liste</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Invoice;