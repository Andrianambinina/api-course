import React from 'react';

const Pagination = ({length, itemsPerPage, currentPage, onChangePage}) => {
    console.log(length);
    const pageCount = Math.ceil(length / itemsPerPage);
    const page = [];
    for (let i = 1; i <= pageCount; i++) {
        page.push(i);

    }

    return (
        <div>
            <ul className="pagination">
                <li className={"page-item" + (currentPage === 1 && " disabled")}>
                    <button className="page-link" onClick={() => onChangePage(currentPage - 1)}>&laquo;</button>
                </li>
                {page.map((page) => (
                    <li key={page} className={"page-item" + (currentPage === page && " active")}>
                        <button className="page-link" onClick={() => onChangePage(page)}>{page}</button>
                    </li>
                ))}
                <li className={"page-item" + (currentPage === pageCount && " disabled")}>
                    <button className="page-link" onClick={() => onChangePage(currentPage + 1)}>&raquo;</button>
                </li>
            </ul>
        </div>
    );
};

Pagination.getData = (items, itemsPerPage, currentPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
};

export default Pagination;
