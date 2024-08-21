import React from 'react';

function ProductDetails({ product, icon }) {
    if (!product) return null;

    return (
        <>
            <img 
                src={icon} 
                alt="Details" 
                style={{cursor: 'pointer', width: '20px', height: '20px'}} 
                data-bs-toggle="modal" 
                data-bs-target={`#productDetailsModal-${product.id}`}
            />

            <div className="modal fade" id={`productDetailsModal-${product.id}`} tabIndex="-1" aria-labelledby={`productDetailsModalLabel-${product.id}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`productDetailsModalLabel-${product.id}`}>Produktdetails</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p><strong>ID:</strong> {product.id}</p>
                            <p><strong>Name:</strong> {product.item}</p>
                            <p><strong>Preis:</strong> €{product.preis.toFixed(2)}</p>
                            <p><strong>Typ:</strong> {product.typ}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetails;
