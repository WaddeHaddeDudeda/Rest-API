import React from 'react';
import SearchFunction from './components/SearchFunction';
import ProductTable from './components/ProductTable';
import Pagination from './components/Pagination';
import Sidebar from './components/sideBar';

function ProductManagement() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <h1 className="text-center mb-4">Produktkatalog-Management</h1>
          <SearchFunction />
          <ProductTable />
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;
