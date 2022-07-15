import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import Pagination from "../components/Pagination";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";
import {CUSTOMERS_API} from "../config";

const CustomerPage = () => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 10;

    const fetchCustomers = async () => {
        try {
            await axios.get(CUSTOMERS_API)
                .then((response) => setCustomers(response.data["hydra:member"]));
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger les clients");
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios
                .delete(CUSTOMERS_API + "/" + id)
                .then(() => setCustomers(customers.filter((customer) => customer.id !== id)));
            toast.success("Le client a bien été supprimé");
        } catch (error) {
            toast.error("Une erreur est survenue");
        }
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
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Liste des clients</h3>
                <Link to="/customers/new" className="btn btn-info">Créer un client</Link>
            </div>
            <div className="form-group w-25">
                <input type="text" className="form-control" placeholder="Rechercher" value={search}
                       onChange={handleSearch}/>
            </div>
            <table className="table table-bordered table-striped mt-3">
                <thead>
                <tr className="text-center">
                    <th scope="col" className="text-center">Id</th>
                    <th scope="col">CLient</th>
                    <th scope="col">Email</th>
                    <th scope="col">Company</th>
                    <th scope="col" className="text-center">Total</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                {!loading && <tbody>
                {data.map((customer) => (
                    <tr key={customer.id}>
                        <td className="text-center">{customer.id}</td>
                        <td>
                            <Link to={"/customers/" + customer.id}>
                                {customer.firstName} {customer.lastName}
                            </Link>
                        </td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td className="text-center">{customer.totalAmount.toLocaleString()}</td>
                        <td className="text-center">
                            <button className="btn btn-danger" disabled={customer.invoices.length > 0}
                                    onClick={() => handleDelete(customer.id)}>
                                <FontAwesomeIcon icon={faTrashCan}/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>}
            </table>
            {loading && <TableLoader />}

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
