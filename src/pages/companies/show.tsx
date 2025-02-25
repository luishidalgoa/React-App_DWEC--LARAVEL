import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Companies } from "../../models/companies";
import { getCompanyById, deleteCompany } from "../../shared/services/laravelFetch";

function ShowCompany() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState<Companies | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const data = await getCompanyById(Number(id));
                setCompany(data);
            } catch (err) {
                setError("Error al cargar la empresa");
            }
        };
        fetchCompany();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("¿Estás seguro de que quieres eliminar esta empresa?")) {
            try {
                await deleteCompany(Number(id));
                navigate("/companys");
            } catch (err) {
                setError("Error al eliminar la empresa");
            }
        }
    };

    if (error) return <p className="text-red-500">{error}</p>;
    if (!company) return <p>Cargando...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Información de la empresa</h1>

            <div className="bg-white shadow-md rounded p-6">
                <h3 className="text-lg font-bold bg-blue-500 text-white p-2 rounded">{company.name}</h3>
                <p><strong>ID:</strong> {company.id}</p>
                <p><strong>Address:</strong> {company.address}</p>
                <p><strong>Telephone:</strong> {company.telephone}</p>
                <p><strong>Email:</strong> {company.email}</p>
                <p><strong>Date Creation:</strong> {company.date_creation.toString()}</p>
                <p><strong>Professor ID:</strong> {company.professor ? company.professor : "N/A"}</p>

                <div className="mt-4 flex gap-2">
                    <button onClick={() => navigate("/companys")} className="bg-gray-500 text-white px-4 py-2 rounded">
                        Volver a empresas
                    </button>
                    <button onClick={() => navigate(`/companys/${company.id}/edit`)} className="bg-yellow-500 text-white px-4 py-2 rounded">
                        Editar
                    </button>
                    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                        Borrar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ShowCompany;
