import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import Pagination from "../components/Pagination";

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
        invoice.customer.lastName.toLowerCase().includes(search.toLowerCase())
    );
    const invoicesPaginated = Pagination.getData(filteredInvoices, itemsPerPage, currentPage);

    return (
        <div className="container mt-5">
            <h3>Listes des factures</h3>

            <div className="form-group">
                <input type="text" className="form-control" value={search} placeholder="Rechercher" onChange={(e) => {setSearch(e.target.value); setCurrentPage(1) }}/>
            </div>

            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th scope="col">Numero</th>
                        <th scope="col">Statut</th>
                        <th scope="col">Montant</th>
                        <th scope="col">Client</th>
                        <th scope="col">Date de création</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {invoicesPaginated.map((invoice) => (
                        <tr key={invoice.id}>
                            <td>{invoice.chrono}</td>
                            <td>{invoice.status}</td>
                            <td>{invoice.amount}</td>
                            <td>{invoice.customer.firstName} {invoice.customer.lastName}</td>
                            <td>{invoice.sentAt}</td>
                            <td>
                                <button className="btn btn-danger">
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination length={invoices.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onChangePage={handlePageChange}/>
        </div>
    );
};

export default InvoicePage;
