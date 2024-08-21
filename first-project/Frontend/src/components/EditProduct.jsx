import React, { useState } from 'react';

function EditProduct({ product, onEdit, className }) {
    const [editedProduct, setEditedProduct] = useState(product);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct(prev => ({
            ...prev,
            [name]: name === 'preis' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit(editedProduct);
    };

    return (
        <>
            <button className="btn btn-sm btn-dark" data-bs-toggle="modal" data-bs-target={`#editProductModal-${product.id}`}>
                Bearbeiten
            </button>

            <div className="modal fade" id={`editProductModal-${product.id}`} tabIndex="-1" aria-labelledby={`editProductModalLabel-${product.id}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`editProductModalLabel-${product.id}`}>Produkt bearbeiten</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="item" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="item" name="item" value={editedProduct.item} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="preis" className="form-label">Preis</label>
                                    <input type="number" className="form-control" id="preis" name="preis" value={editedProduct.preis} onChange={handleInputChange} step="0.01" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="typ" className="form-label">Typ</label>
                                    <input type="text" className="form-control" id="typ" name="typ" value={editedProduct.typ} onChange={handleInputChange} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
                                <button type="submit" className="btn btn-primary">Speichern</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProduct;
