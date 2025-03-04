import React, { useState, useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import ApplicationMark from './components/application-mark';
import NavLink from './components/nav-link';
import Dropdown from './components/dropdown';
import DropdownLink from './components/dropdown-link';
import ResponsiveNavLink from './components/responsive-nav-link';
import { User } from '../models/user';

const NavigationMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const isDashboard = useMatch('/dashboard');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/professor', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });

                console.log('Response status:', response.status);

                if (response.ok) {
                    const data = await response.json();
                    console.log('Datos recibidos:', data);
                    setUser(data); // Ajusta esto para asignar directamente los datos recibidos
                } else {
                    console.error('Error al obtener los datos del usuario');
                }
            } catch (error) {
                console.error('Error al obtener los datos del usuario', error);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });

            if (response.ok) {
                localStorage.removeItem('access_token');
                navigate('/');
            } else {
                console.error('Error al cerrar sesión');
            }
        } catch (error) {
            console.error('Error al cerrar sesión', error);
        }
    };

    return (
        <nav className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {/* Logo */}
                        <div className="shrink-0 flex items-center">
                            <Link to="/dashboard">
                                <ApplicationMark className="block h-9 w-auto" />
                            </Link>
                        </div>

                        {/* Enlaces de Navegación */}
                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <NavLink
                                href="/dashboard"
                                active={isDashboard !== null}
                            >
                                Panel de Control
                            </NavLink>
                        </div>
                    </div>

                    {/* Menú Desplegable de Configuración */}
                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <div className="ml-3 relative">
                            <Dropdown
                                align="right"
                                width="48"
                                trigger={
                                    <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition">
                                        {user && user.name}
                                    </button>
                                }
                                content={
                                    <>
                                        <DropdownLink href="/profile">
                                            Perfil
                                        </DropdownLink>
                                        <DropdownLink onClick={handleLogout}>
                                            Cerrar Sesión
                                        </DropdownLink>
                                    </>
                                }
                            />
                        </div>
                    </div>

                    {/* Menú Hamburguesa */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú de Navegación Responsive */}
            {isOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href="/dashboard"
                            active={isDashboard !== null}
                        >
                            Panel de Control
                        </ResponsiveNavLink>
                    </div>

                    {/* Opciones de Configuración Responsive */}
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="flex items-center px-4">
                            <div className="shrink-0 mr-3">
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    {user ? user.name.charAt(0) : 'U'}
                                </div>
                            </div>
                            <div>
                                <div className="font-medium text-base text-gray-800">{user ? user.name : ''}</div>
                                <div className="font-medium text-sm text-gray-500">{user ? user.email : ''}</div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href="/profile">
                                Perfil
                            </ResponsiveNavLink>
                            <button
                                onClick={handleLogout}
                                className="block w-full px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 text-left"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavigationMenu;