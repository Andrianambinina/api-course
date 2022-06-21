import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import Pagination from "../components/Pagination";
import moment from 'moment';

const STATUS_CLASS = {
    PAID: 'success',
    SENT: 'info',
    CANCELLED: 'danger'
};

const STATUS_LABEL = {
    PAID: 'Payé',
    SENT: 'Envoyé',
    CANCELLED: 'Annulé'
};

const InvoicePage = () => {

    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/invoices').then((response) => setInvoices(response.data["hydra:member"]));
    }, []);

    const itemsPerPage = 10;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredInvoices = invoices.filter(invoice =>
        invoice.status.toLowerCase().includes(search.toLowerCase()) ||
        invoice.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
        invoice.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
        invoice.amount.toString().includes(search.toLocaleString())
    );
    const invoicesPaginated = Pagination.getData(filteredInvoices, itemsPerPage, currentPage);

    const formatDate = (date) => moment(date).format('DD/MM/YYYY');

    const handleDelete = async (id) => {
        const originalInvoices = [...invoices];

        setInvoices(invoices.filter((invoice) => invoice.id !== id));

        try {
            await axios.delete("http://localhost:8000/api/invoices/" + id)
        } catch (err) {
            console.log(err.message);
            setInvoices(originalInvoices);
        }
    };

    return (
        <div className="container">
            <h3>Listes des factures</h3>

            <div className="form-group">
                <input type="text" className="form-control" value={search} placeholder="Rechercher" onChange={(e) => {setSearch(e.target.value); setCurrentPage(1) }}/>
            </div>

            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th scope="col">Numéro</th>
                        <th scope="col">Client</th>
                        <th scope="col" className="text-center">Date de création</th>
                        <th scope="col" className="text-center">Statut</th>
                        <th scope="col" className="text-center">Montant</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {invoicesPaginated.map((invoice) => (
                        <tr key={invoice.id}>
                            <td>{invoice.chrono}</td>
                            <td>
                                <a href="#">{invoice.customer.firstName} {invoice.customer.lastName}</a>
                            </td>
                            <td className="text-center">{formatDate(invoice.sentAt)}</td>
                            <td className="text-center">
                                <span className={"badge bg-" + STATUS_CLASS[invoice.status]}>{STATUS_LABEL[invoice.status]}</span>
                            </td>
                            <td className="text-center">{invoice.amount.toLocaleString()}</td>
                            <td className="text-center">
                                <button className="btn btn-info">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button className="btn btn-danger ml-5" onClick={() => handleDelete(invoice.id)}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {filteredInvoices.length > itemsPerPage && <Pagination length={invoices.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onChangePage={handlePageChange}/>}
        </div>
    );
};

export default InvoicePage;
