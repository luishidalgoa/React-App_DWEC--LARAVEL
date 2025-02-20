import { useEffect, useState } from "react";
import { getProfessor } from "../../shared/services/laravelFetch";
import type { Professor } from "../../models/professor";

function Professors() {
    const [professors, setProfessors] = useState<Professor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfessors = async () => {
            try {
                getProfessor().then((res: any) => {
                    console.log("Respuesta del backend:", res[1]);
                    if (Array.isArray(res)) {
                        console.log("Respuesta del backend:", res);
                        setProfessors(res);
                    } else {
                        console.error("La respuesta no es un array:", res);
                    }
                });
            } catch (err) {
                setError('Error al cargar los profesores');
            } finally {
                setLoading(false);
            }
        };

        fetchProfessors();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de profesores</h1>

            <a href="/professors/create" className="bg-green-500 text-white px-4 py-2 rounded mb-3 inline-block">
                Añadir un profesor
            </a>

            <div className="text-center mb-3">
                <a href="/layouts/index" className="bg-blue-500 text-white px-4 py-2 rounded inline-block">
                    Volver al inicio
                </a>
            </div>

            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-2 px-4">ID</th>
                        <th className="py-2 px-4">Nombre Completo</th>
                        <th className="py-2 px-4">Edad</th>
                        <th className="py-2 px-4">Género</th>
                        <th className="py-2 px-4">Dirección</th>
                        <th className="py-2 px-4">Teléfono</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Componies</th>
                        <th className="py-2 px-4">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {professors.length > 0 ? (
                        professors.map((professor) => (
                            <tr key={professor.id} className="border-b">
                                <td className="py-2 px-4">{professor.id}</td>
                                <td className="py-2 px-4">{professor.fullname}</td>
                                <td className="py-2 px-4">{professor.age}</td>
                                <td className="py-2 px-4">{professor.gender}</td>
                                <td className="py-2 px-4">{professor.address}</td>
                                <td className="py-2 px-4">{professor.telephone}</td>
                                <td className="py-2 px-4">{professor.email}</td>
                                <td className="py-2 px-4">
                                    <a href={`/professors/${professor.id}`} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                                        Ver
                                    </a>
                                    <a href={`/professors/${professor.id}/edit`} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                                        Editar
                                    </a>
                                    <button
                                        onClick={() => {
                                            if (window.confirm('¿Estás seguro?')) {
                                                // Lógica para eliminar el profesor
                                            }
                                        }}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={9} className="text-center py-4">
                                No se han encontrado profesores
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Professors;