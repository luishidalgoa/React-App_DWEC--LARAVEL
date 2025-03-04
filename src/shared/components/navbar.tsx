import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
    
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/professors">Gestión de Profesores</Link>
          <Link className="navbar-brand" to="/companys">Gestión de Empresas</Link>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="container my-4 flex-grow-1">
        {children}
      </div>


      {/* Bootstrap JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
}

export default Navbar;



