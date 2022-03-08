import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import Pagination from "../components/Pagination";

const CustomerPage = () => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
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

    const filteredCustomers = customers.filter((customer) =>
        customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()) ||
        customer.company.toLowerCase().includes(search.toLowerCase())
    );
    const data = Pagination.getData(filteredCustomers, itemsPerPage, currentPage);

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="container mt-5">
            <h3>Liste des clients</h3>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Rechercher" value={search}
                       onChange={handleSearch}/>
            </div>
            <table className="table table-bordered table-striped mt-3">
                <thead>
                <tr>
                    <th scope="col" className="text-center">Id</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Email</th>
                    <th scope="col">Company</th>
                    <th scope="col" className="text-center">Total</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {data.map((customer) => (
                    <tr key={customer.id}>
                        <td className="text-center">{customer.id}</td>
                        <td>{customer.firstName}</td>
                        <td>{customer.lastName}</td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td className="text-center">{customer.totalAmount.toLocaleString()}</td>
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

            {filteredCustomers.length > itemsPerPage && <Pagination
                length={filteredCustomers.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onChangePage={handlePageChange}
            />}
        </div>
    );
};

export default CustomerPage;
