import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import Pagination from "../components/Pagination";

const InvoicePage = () => {

    const [invoices, setInvoices] = useState([]);
    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get('http://localhost:8000/api/invoices').then((response) => setInvoices(response.data["hydra:member"]));
    }, []);

    // pagination
    const itemsPerPage = 10;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const invoicesPaginated = Pagination.getData(invoices, itemsPerPage, currentPage);

    return (
        <div className="container mt-5">
            <h3>Listes des factures</h3>

            <table className="table table-bordered">
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
