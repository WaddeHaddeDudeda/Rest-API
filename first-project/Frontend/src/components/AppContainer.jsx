import React from 'react';
import { Link } from 'react-router-dom';

function AppContainer({ children, title }) {
  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2 className="text-center">{title}</h2>
          <nav>
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <Link to="/product-management" className="nav-link">Produktliste</Link>
              </li>
              <li className="nav-item">
                <Link to="/add-product" className="nav-link">Produkt hinzufügen</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="card-body" style={{ minHeight: '700px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AppContainer;
