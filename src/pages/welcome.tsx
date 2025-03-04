import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="d-flex flex-column min-vh-100 bg-light">

            {/* Contenido principal */}
            <main className="container flex-grow-1 py-5">
                {/* Encabezado */}
                <header className="text-center mb-5">
                    <div className="bg-white rounded shadow-sm p-4 mb-4">
                        <h1 className="display-4 fw-bold text-dark mb-3">
                            <span className="text-primary">Observaciones</span> Académicas
                        </h1>
                    </div>
                </header>

                {/* Descripción del sistema */}
                <div className="bg-white rounded shadow p-4 mb-4 border border-light">
                    <h2 className="h2 fw-semibold text-dark mb-3">¿Qué es este sistema?</h2>
                    <p className="text-muted">
                        Este sistema es una herramienta diseñada para que los docentes puedan <strong>registrarse y loguearse</strong> de manera que puedan acceder a su panel y anotar las observaciones de manera que puedan llevar un control de cómo el alumnado se desenvuelve en las prácticas.
                    </p>
                </div>

                {/* Acceso */}
                <div className="bg-white rounded shadow p-4 mb-4 text-center border border-light">
                    <h3 className="h3 fw-semibold text-dark mb-3">Acceso al Sistema</h3>
                    <div className="d-flex flex-column gap-3 justify-content-center">
                        {/* Autenticación */}
                        {false ? ( // Cambia esta condición por la de tu lógica de autenticación
                            <Link to="/dashboard" className="btn btn-primary btn-lg">
                                Panel Principal
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-primary btn-lg">
                                    Acceder como Docente
                                </Link>

                                <Link to="/register" className="btn btn-secondary btn-lg">
                                    Registrar Nuevo Profesor
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-4 mt-auto">
                <p className="mb-0">&copy; 2025 Instituto Francisco de los Ríos. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default HomePage;
