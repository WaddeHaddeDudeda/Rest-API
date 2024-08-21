import React, { useState, useEffect } from 'react';
import AppContainer from './AppContainer';
import SearchFunction from './SearchFunction';
import ProductTable from './ProductTable';
import Pagination from './Pagination';
import * as productService from '../services/productService';
import { Link } from 'react-router-dom';

export default function ProductListPage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [currentSort, setCurrentSort] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await productService.getAllProducts();
            setProducts(fetchedProducts);
            setFilteredProducts(fetchedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const searchProducts = (searchTerm) => {
        if (searchTerm) {
            setFilteredProducts(products.filter(product =>
                product.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.typ.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        } else {
            setFilteredProducts(products);
        }
        setCurrentPage(1);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const handleEditSubmit = async (editedProduct) => {
        try {
            await productService.updateProduct(editedProduct.id, editedProduct);
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const deleteProducts = async (selectedIds) => {
        try {
            for (let id of selectedIds) {
                await productService.deleteProduct(id);
            }
            fetchProducts();
        } catch (error) {
            console.error('Error deleting products:', error);
        }
    };

    const sortProducts = (criteria) => {
        const sortedProducts = [...filteredProducts];
        switch(criteria) {
            case 'preis-asc':
                sortedProducts.sort((a, b) => a.preis - b.preis);
                break;
            case 'preis-desc':
                sortedProducts.sort((a, b) => b.preis - a.preis);
                break;
            case 'name-asc':
                sortedProducts.sort((a, b) => a.item.localeCompare(b.item));
                break;
            case 'name-desc':
                sortedProducts.sort((a, b) => b.item.localeCompare(a.item));
                break;
            default:
                break;
        }
        setFilteredProducts(sortedProducts);
        setCurrentSort(criteria);
    };

    const filterProducts = (value) => {
        if (value) {
            setFilteredProducts(products.filter(product =>
                product.typ.toLowerCase().includes(value.toLowerCase())
            ));
        } else {
            setFilteredProducts(products);
        }
        setCurrentPage(1);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <AppContainer title="Produktliste">

        <ProductTable
        products={currentProducts}
        onEdit={handleEdit}
        deleteProducts={deleteProducts}
        onSort={sortProducts}
        currentSort={currentSort}
        onSearch={searchProducts}
        onFilter={filterProducts}
        />


            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
                onPageChange={paginate}
            />

            {editingProduct && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Produkt bearbeiten</h5>
                                <button type="button" className="btn-close" onClick={() => setEditingProduct(null)}></button>
                            </div>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleEditSubmit(editingProduct);
                            }}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="item" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="item"
                                            name="item"
                                            value={editingProduct.item}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, item: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="preis" className="form-label">Preis</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="preis"
                                            name="preis"
                                            value={editingProduct.preis}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, preis: parseFloat(e.target.value) })}
                                            step="0.01"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="typ" className="form-label">Typ</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="typ"
                                            name="typ"
                                            value={editingProduct.typ}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, typ: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setEditingProduct(null)}>Abbrechen</button>
                                    <button type="submit" className="btn btn-primary">Speichern</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="mb-3">
                <Link to="/" className="btn btn-secondary">Hauptseite</Link>
            </div>
        </AppContainer>
    );
}
