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
            professor: null,
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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Añadir una empresa</h1>

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
                    <label className="block">Name</label>
                    <input type="text" name="name" className="w-full p-2 border rounded" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="block">Address</label>
                    <input type="text" name="address" className="w-full p-2 border rounded" value={formData.address} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="block">Telephone</label>
                    <input type="text" name="telephone" className="w-full p-2 border rounded" value={formData.telephone} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="block">Email</label>
                    <input type="email" name="email" className="w-full p-2 border rounded" value={formData.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="block">Date Creation</label>
                    <input type="date" name="date_creation" className="w-full p-2 border rounded" value={formData.date_creation.toString()} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="block">Professor ID</label>
                    <input type="text" name="professor_id" className="w-full p-2 border rounded" value={formData.professor?formData.professor:''} onChange={handleChange} />
                </div>
                <div className="flex gap-2">
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Guardar</button>
                    <button type="button" onClick={() => navigate("/companys")} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default CreateCompany;