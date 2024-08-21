import React, { useState } from 'react';

function FilterProducts({ onFilter }) {
    const [filterValue, setFilterValue] = useState('');

    const handleFilterChange = (e) => {
        setFilterValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(filterValue);
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex ">
            <input 
                type="text" 
                className="form-control w-75 " 
                placeholder="Nach Typ" 
                value={filterValue}
                onChange={handleFilterChange}
            />
            <button className="btn btn-outline-secondary btn-sm w-25 text-nowrap d-flex justify-content-center align-items-center" type="submit">Filtern</button>
        </form>
    );
}

export default FilterProducts;
