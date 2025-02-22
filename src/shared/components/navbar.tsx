import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">ProyectoFPDual</Link>
        <div className="flex space-x-4">
          <Link to="/professors" className="text-gray-300 hover:text-white">Profesores</Link>
          <Link to="/companys" className="text-gray-300 hover:text-white">Empresas</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;