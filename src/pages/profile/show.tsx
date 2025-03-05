import React, { useEffect, useState } from 'react';
import NavigationMenu from '../navigation-menu'; // Importa el componente NavigationMenu

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<{ id: number; name: string; email: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('access_token'); // Obtén el token del local storage
                if (!token) {
                    throw new Error('No token found');
                }

                console.log('Fetching user with token:', token);

                const response = await fetch('http://localhost:8000/api/professor', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('User data fetched:', data);
                setUser(data);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (user) {
            setUser({
                ...user,
                [e.target.id]: e.target.value
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Error loading user data</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <NavigationMenu /> {/* Incluye el componente de navegación */}
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Perfil
                    </h2>
                </div>
            </header>

            {/* Main Content */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {/* Update Profile Information */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    Información del perfil
                                </h3>
                            </div>
                            <div className="mt-6">
                                {/* Form for updating profile information */}
                                <form>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Nombre
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={user.name}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Correo electrónico
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={user.email}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <hr className="mt-8 border-gray-200" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;