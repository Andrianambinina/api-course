import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import Pagination from "../components/Pagination";

const CustomerPage = () => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/customers')
            .then((response) => setCustomers(response.data["hydra:member"]))
            .catch((err) => console.log(err))
    }, []);

    const handleDelete = (id) => {
        axios
            .delete(`http://127.0.0.1:8000/api/customers/${id}`)
            .then(() => setCustomers(customers.filter((customer) => customer.id !== id)))
            .catch((err) => console.log(err.response));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page)
    };

    const data = Pagination.getData(customers, itemsPerPage, currentPage);

    return (
        <div className="container mt-5">
            <h3>Liste des clients</h3>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Email</th>
                    <th scope="col">Company</th>
                    <th scope="col">Total</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {data.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.firstName}</td>
                        <td>{customer.lastName}</td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td>{customer.totalAmount.toLocaleString()}</td>
                        <td>
                            <button className="btn btn-danger" disabled={customer.invoices.length > 0}
                                    onClick={() => handleDelete(customer.id)}>
                                <FontAwesomeIcon icon={faTrashCan}/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Pagination
                length={customers.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onChangePage={handlePageChange}
            />
        </div>
    );
};

export default CustomerPage;
