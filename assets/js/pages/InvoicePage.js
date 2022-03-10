import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';

const InvoicePage = () => {

    const [invoices, setInvoices] = useState([]);
    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get('http://localhost:8000/api/invoices').then((response) => setInvoices(response.data["hydra:member"]));
    }, []);

    // pagination
    const itemsPerPage = 10;
    const pageCount = Math.ceil(invoices.length / itemsPerPage);

    const page = [];
    for(let i = 1; i <= pageCount; i++) {
        page.push(i);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // 1 2 3 4 5 6 7 8 9 10     11 12 13 14 15 16 17 18 19 20   21 22 23 24 25 26 27 28 29 30   31 32 33 34

    const start = currentPage * itemsPerPage - itemsPerPage;
    const invoicesPaginated = invoices.slice(start, start + itemsPerPage);

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

            <div>
                <ul className="pagination">
                    <li className={"page-item" + (currentPage === 1 && " disabled")}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&laquo;</button>
                    </li>
                    {page.map((page) => (
                        <li key={page} className={"page-item" + (currentPage === page && " active")}>
                            <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
                        </li>
                    ))}
                    <li className={"page-item" + (currentPage === pageCount && " disabled")}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>&raquo;</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default InvoicePage;
