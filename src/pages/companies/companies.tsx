import { useEffect, useState } from "react";
import {deleteCompany, getCompanies} from "../../shared/services/laravelFetch"
import type { Companies } from "../../models/companies";

function Companies(){
    const [companies, setCompanies] = useState<Companies[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                getCompanies().then((res:any) => {
                    console.log("Respuesta del backend:", res[1]);
                    if (loading) {
                        setCompanies(res);
                        setLoading(false);
                    }
                });
            } catch (err) {
                setError('Error al cargar las empresas');
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, [companies]);


    const handleDelete = async (id:number) => {
            if (window.confirm("¿Estás seguro de que quieres eliminar esta empresa?")) {
                try {
                    await deleteCompany(Number(id));
                    setCompanies(companies.filter((companies) => companies.id !== id));
                } catch (err) {
                    setError("Error al eliminar la empresa");
                }
            }
        };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de empresas</h1>

            <a href="/companys/create" className="bg-green-500 text-white px-4 py-2 rounded mb-3 inline-block">
                Añadir una empresa
            </a>

            <div className="text-center mb-3">
                <a href="/layouts/index" className="bg-blue-500 text-white px-4 py-2 rounded inline-block">
                    Volver al inicio
                </a>
            </div>

            <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-2 px-4">ID</th>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Address</th>
                        <th className="py-2 px-4">Telephone</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Professor ID</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.length > 0 ? (
                        companies.map((company) => (
                            <tr key={company.id} className="border-b">
                                <td className="py-2 px-4">{company.id}</td>
                                <td className="py-2 px-4">{company.name}</td>
                                <td className="py-2 px-4">{company.address}</td>
                                <td className="py-2 px-4">{company.telephone}</td>
                                <td className="py-2 px-4">{company.email}</td>
                                <td className="py-2 px-4">{company.professor}</td>
                                <td className="py-2 px-4">
                                    <a href={`/companys/${company.id}`} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                                        Ver
                                    </a>
                                    <a href={`/companys/${company.id}/edit`} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                                        Editar
                                    </a>
                                    <button
                                        onClick={() => handleDelete(company.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="text-center py-4">
                                No se han encontrado empresas
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Companies;