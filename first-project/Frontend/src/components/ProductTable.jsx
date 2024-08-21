import React, { useState } from 'react';
import ProductDetails from './ProductDetails';
import detailsIcon from '../imgages/details.ico';
import editIcon from '../imgages/bearbeiten.ico';
import deleteIcon from '../imgages/delete.ico';
import sortIcon from '../imgages/sortier.ico';

function ProductTable({ products, deleteProducts, onEdit, onSort, currentSort, onSearch, onFilter }) {
  const [showSortOptions, setShowSortOptions] = useState(false);

  const handleSortClick = () => {
    setShowSortOptions(!showSortOptions);
  };

  const handleSortChange = (value) => {
    onSort(value);
    setShowSortOptions(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-2">
        <div style={{width: '30%'}}>
          <input
            type="text"
            className="form-control"
            placeholder="Nach Typ filtern"
            onChange={(e) => onFilter(e.target.value)}
          />
        </div>
        <div style={{width: '30%'}}>
          <input
            type="text"
            className="form-control"
            placeholder="Suchen..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Produkt</th>
              <th className="text-center">Preis</th>
              <th className="text-center">Typ</th>
              <th className="text-center">
                Sort.
                <img
                  src={sortIcon}
                  alt="Sortieren"
                  onClick={handleSortClick}
                  style={{cursor: 'pointer', width: '20px', height: '20px', marginLeft: '5px'}}
                />
                {showSortOptions && (
                  <div className="dropdown-menu show">
                    <button className="dropdown-item" onClick={() => handleSortChange('preis-asc')}>Preis aufsteigend</button>
                    <button className="dropdown-item" onClick={() => handleSortChange('preis-desc')}>Preis absteigend</button>
                    <button className="dropdown-item" onClick={() => handleSortChange('name-asc')}>Name A-Z</button>
                    <button className="dropdown-item" onClick={() => handleSortChange('name-desc')}>Name Z-A</button>
                  </div>
                )}
              </th>
              <th className="text-center">Detail</th>
              <th className="text-center">Bearbeiten</th>
              <th className="text-center">Löschen</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="text-center">{product.id}</td>
                <td className="text-center">{product.item}</td>
                <td className="text-center">€{product.preis.toFixed(2)}</td>
                <td className="text-center">{product.typ}</td>
                <td className="text-center">{currentSort && getSortLabel(currentSort)}</td>
                <td className="text-center">
                  <ProductDetails product={product} icon={detailsIcon} />
                </td>
                <td className="text-center">
                  <img src={editIcon} alt="Bearbeiten" onClick={() => onEdit(product)} style={{cursor: 'pointer', width: '20px', height: '20px'}} />
                </td>
                <td className="text-center">
                  <img src={deleteIcon} alt="Löschen" onClick={() => deleteProducts([product.id])} style={{cursor: 'pointer', width: '20px', height: '20px'}} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function getSortLabel(sortValue) {
  switch(sortValue) {
    case 'preis-asc': return '€ aufsteigend';
    case 'preis-desc': return '€ absteigend';
    case 'name-asc': return 'A-Z';
    case 'name-desc': return 'Z-A';
    default: return '';
  }
}

export default ProductTable;
