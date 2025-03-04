import { useState } from "react";
import { createCompany } from "../../shared/services/laravelFetch";
import { useNavigate } from "react-router-dom";
import { Companies } from "../../models/companies";

function CreateCompany() {
    const [formData, setFormData] = useState<Companies>(
        {
            id: 0,
            name: "",
            address: "",
            telephone: "",
            email: "",
            date_creation: new Date(),
            professor_id: null,
            created_at: new Date(),
            updated_at: new Date()
        }
    );
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors([]);
        
        try {
            await createCompany(formData);
            navigate("/companys");
        } catch (error: any) {
            setErrors(error.response?.data?.errors || ["Error al guardar la empresa"]);
        }
    };

    return (
        <div className="container">
            <h1 className="mb-4">Añadir una empresa</h1>

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
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Telephone</label>
                    <input type="text" name="telephone" className="form-control" value={formData.telephone} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Date Creation</label>
                    <input type="date" name="date_creation" className="form-control" value={formData.date_creation.toString()} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Professor ID</label>
                    <input type="text" name="professor_id" className="form-control" value={formData.professor_id ? formData.professor_id : ''} onChange={handleChange} />
                </div>
                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success">Guardar</button>
                    <button type="button" onClick={() => navigate("/companys")} className="btn btn-secondary">Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default CreateCompany;