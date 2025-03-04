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

    if (error) return <p className="text-danger">{error}</p>;
    if (!company) return <p>Cargando...</p>;

    return (
        <div className="container">
            <h1 className="h1 mb-4">Información de la empresa</h1>

            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h3>{company.name}</h3>
                </div>
                <div className="card-body">
                    <p><strong>ID:</strong> {company.id}</p>
                    <p><strong>Address:</strong> {company.address}</p>
                    <p><strong>Telephone:</strong> {company.telephone}</p>
                    <p><strong>Email:</strong> {company.email}</p>
                    <p><strong>Date Creation:</strong> {company.date_creation.toString()}</p>
                    <p><strong>Professor ID:</strong> {company.professor_id ? company.professor_id : "N/A"}</p>
                </div>
                <div className="card-footer text-end">
                    <button onClick={() => navigate("/companys")} className="btn btn-secondary">
                        Volver a empresas
                    </button>
                    <button onClick={() => navigate(`/companys/${company.id}/edit`)} className="btn btn-warning">
                        Editar
                    </button>
                    <button onClick={handleDelete} className="btn btn-danger">
                        Borrar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ShowCompany;