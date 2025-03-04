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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Editar la empresa</h1>

            {errors.length > 0 && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <div className="mb-3">
                    <label className="block">Nombre</label>
                    <input type="text" name="name" className="w-full p-2 border rounded" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="block">Dirección</label>
                    <input type="text" name="address" className="w-full p-2 border rounded" value={formData.address} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="block">Teléfono</label>
                    <input type="text" name="telephone" className="w-full p-2 border rounded" value={formData.telephone} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="block">Correo Electrónico</label>
                    <input type="email" name="email" className="w-full p-2 border rounded" value={formData.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="block">Fecha de Creación</label>
                    <input type="date" name="date_creation" className="w-full p-2 border rounded" value={formData.date_creation.toString()} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="block">Profesor ID</label>
                    <input type="text" name="professor_id" className="w-full p-2 border rounded" value={formData.professor_id ? formData.professor_id : ''} onChange={handleChange} />
                </div>
                <div className="flex gap-2">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Actualizar</button>
                    <button type="button" onClick={() => navigate("/companys")} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default EditCompany;
