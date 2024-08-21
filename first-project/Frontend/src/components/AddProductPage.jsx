import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContainer from './AppContainer';
import * as productService from '../services/productService';
import { Link } from 'react-router-dom';


export default function AddProductPage() {
    const navigate = useNavigate();
    const [newProduct, setNewProduct] = useState({ id: '', item: '', preis: '', typ: '' });
    const [message, setMessage] = useState(null);

    const handleInputChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await productService.createProduct({
                ...newProduct,
                id: parseInt(newProduct.id),
                preis: parseFloat(newProduct.preis)
            });
            setNewProduct({ id: '', item: '', preis: '', typ: '' });
            setMessage({ type: 'success', text: 'Produkt erfolgreich hinzugefügt!' });
        } catch (error) {
            console.error('Error adding product:', error);
            setMessage({ type: 'error', text: 'Fehler beim Hinzufügen des Produkts. Bitte versuchen Sie es erneut.' });
        }
    };

    return (
        <AppContainer title="Neues Produkt hinzufügen">
            {message && (
                <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {message.text}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="id" className="form-label">ID:</label>
                    <input type="number" className="form-control" id="id" name="id" required value={newProduct.id} onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="item" className="form-label">Produkt:</label>
                    <input type="text" className="form-control" id="item" name="item" required value={newProduct.item} onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="preis" className="form-label">Preis:</label>
                    <input type="number" className="form-control" id="preis" name="preis" step="0.01" required value={newProduct.preis} onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="typ" className="form-label">Typ:</label>
                    <input type="text" className="form-control" id="typ" name="typ" required value={newProduct.typ} onChange={handleInputChange} />
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-primary me-2">Produkt hinzufügen</button>
                    
                </div>
            </form><br />
            <Link to="/" className="btn btn-secondary">Hauptseite</Link>


        </AppContainer>
    );
}
