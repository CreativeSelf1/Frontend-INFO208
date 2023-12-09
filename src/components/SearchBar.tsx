import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Buscar por nombre"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
    />
  );
};

export default SearchBar;
