import { useEffect, useState } from "react";
import { updateCompany, getCompanyById } from "../../shared/services/laravelFetch";
import { useNavigate, useParams } from "react-router-dom";
import { Companies } from "../../models/companies";

function EditCompany() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Companies | null>(null);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const data = await getCompanyById(Number(id));
                console.log("Data:", data);
                setFormData(data);
            } catch (error: any) {
                setErrors(error.response?.data?.errors || ["Error al cargar la empresa"]);
            }
        };
        fetchCompany();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formData) {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors([]);

        try {
            if (formData) {
                await updateCompany(Number(id), formData);
                navigate("/companys");
            }
        } catch (error: any) {
            setErrors(error.response?.data?.errors || ["Error al actualizar la empresa"]);
        }
    };

    if (!formData) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container">
            <h1 className="h1 mb-4">Editar la empresa</h1>

            {errors.length > 0 && (
                <div className="alert alert-danger">
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit} className="card p-4">
                <div className="form-group mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Dirección</label>
                    <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Teléfono</label>
                    <input type="text" name="telephone" className="form-control" value={formData.telephone} onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Correo Electrónico</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Fecha de Creación</label>
                    <input type="date" name="date_creation" className="form-control" value={formData.date_creation.toString()} onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Profesor ID</label>
                    <input type="text" name="professor_id" className="form-control" value={formData.professor_id ? formData.professor_id : ''} onChange={handleChange} />
                </div>
                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">Actualizar</button>
                    <button type="button" onClick={() => navigate("/companys")} className="btn btn-secondary">Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default EditCompany;