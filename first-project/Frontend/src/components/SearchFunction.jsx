import React, { useState } from 'react';
import searchIcon from '../imgages/search_icon.ico';

function SearchFunction({ onSearch }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <div className="row justify-content-center mb-4">
      <div className="col-md-6">
        <form onSubmit={handleSubmit} className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Suche nach ..."
            value={searchInput}
            onChange={handleSearchChange}
          />
          <button className="btn btn-outline-secondary" type="submit">
            <img src={searchIcon} alt="Suche Icon" style={{ width: '20px' }} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchFunction;
