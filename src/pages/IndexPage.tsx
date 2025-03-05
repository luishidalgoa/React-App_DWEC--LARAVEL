import React from 'react';

function IndexPage() {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{/* Aquí puedes usar un hook o prop para el título */}</title>
        {/* Bootstrap CSS */}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      </head>
      <body className="d-flex flex-column min-vh-100">

        {/* Mensaje de Bienvenida */}
        <div className="container my-4">
          <div className="alert alert-info text-center" role="alert">
            <h3>¡Bienvenido a la Aplicación de Gestión de Profesores y Empresas!</h3>
            <p>Aquí puedes gestionar a los profesores y las empresas asociadas.</p>
          </div>
        </div>

        {/* Imagen de Cabecera centrada y más pequeña */}
        <div className="d-flex justify-content-center">
          <img className="img-fluid" style={{ maxWidth: '25%' }} src="/instituto.jpg" alt="Instituto Francisco de los Ríos" />
        </div>

        {/* Contenido Principal */}
        <div className="container my-4 flex-grow-1">
          {/* Aquí puedes usar un hook o prop para el contenido */}
        </div>

        {/* Bootstrap JS */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  );
}

export default IndexPage;