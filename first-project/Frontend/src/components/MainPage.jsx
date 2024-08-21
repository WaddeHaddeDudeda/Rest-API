import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPlus } from '@fortawesome/free-solid-svg-icons';
import logo from '../imgages/logo1.png';

function MainPage() {
  return (
    <div className="container-fluid">
      <header className="bg-primary text-white p-3 mb-4" style={{  borderRadius: '10px'}}>
        <div className="d-flex align-items-start">
          <img src={logo} alt="Logo" className="rounded" style={{ height: '50px', borderRadius: '10px', marginRight: '15px' }} />
          <div className="flex-grow-1 text-center">
            <h1 className="m-0">Y-IT Solution</h1>
          </div>
        </div>
        <h5 className="flex-grow-1 text-center">Ihr Dashboard für einfache Produktverwaltung</h5>
      </header>
      <div className="row">
        <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div className="position-sticky pt-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/product-management" className="nav-link d-flex align-items-center">
                  <FontAwesomeIcon icon={faList} className="me-2" />
                  Produktverwaltung
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainPage;
