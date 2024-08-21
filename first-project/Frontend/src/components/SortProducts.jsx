import React from 'react';

function SortProducts({ onSort, currentSort }) {
    const handleSort = (criteria) => {
        onSort(criteria);
    };

    const getSortLabel = (criteria) => {
        switch(criteria) {
            case 'preis-asc': return 'Preis aufsteigend';
            case 'preis-desc': return 'Preis absteigend';
            case 'name-asc': return 'Name A-Z';
            case 'name-desc': return 'Name Z-A';
            default: return 'Sortieren nach';
        }
    };

    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="sortDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                {getSortLabel(currentSort)}
            </button>
            <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                <li><a className="dropdown-item" href="#" onClick={() => handleSort('preis-asc')}>Preis aufsteigend</a></li>
                <li><a className="dropdown-item" href="#" onClick={() => handleSort('preis-desc')}>Preis absteigend</a></li>
                <li><a className="dropdown-item" href="#" onClick={() => handleSort('name-asc')}>Name A-Z</a></li>
                <li><a className="dropdown-item" href="#" onClick={() => handleSort('name-desc')}>Name Z-A</a></li>
            </ul>
        </div>
    );
}

export default SortProducts;
