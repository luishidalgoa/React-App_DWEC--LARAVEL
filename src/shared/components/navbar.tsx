import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/professors" className="text-white text-lg font-semibold hover:text-blue-200">
          Gestión de Profesores
        </Link>
        <Link to="/companys" className="text-white text-lg font-semibold hover:text-blue-200">
          Gestión de Empresas
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;