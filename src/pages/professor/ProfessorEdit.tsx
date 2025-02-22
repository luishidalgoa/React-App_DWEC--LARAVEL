import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProfessorById, updateProfessor } from "../../shared/services/laravelFetch";
import type { Professor } from "../../models/professor";

function ProfessorEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [professor, setProfessor] = useState<Professor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        const data = await getProfessorById(Number(id));
        setProfessor(data);
      } catch (err) {
        setError("Error al cargar los detalles del profesor");
      } finally {
        setLoading(false);
      }
    };

    fetchProfessor();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (professor) {
      try {
        await updateProfessor(Number(id), professor);
        navigate(`/professors/${id}`);
      } catch (err) {
        setError("Error al actualizar el profesor");
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfessor((prevProfessor) => prevProfessor ? { ...prevProfessor, [name]: value } : null);
  };

  if (loading) return <div className="text-center mt-5">Cargando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Profesor</h1>
      {professor && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nombre Completo:</label>
            <input
              type="text"
              name="fullname"
              value={professor.fullname}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Edad:</label>
            <input
              type="number"
              name="age"
              value={professor.age}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Género:</label>
            <input
              type="text"
              name="gender"
              value={professor.gender}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Dirección:</label>
            <input
              type="text"
              name="address"
              value={professor.address}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono:</label>
            <input
              type="text"
              name="telephone"
              value={professor.telephone}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={professor.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar
          </button>
        </form>
      )}
    </div>
  );
}

export default ProfessorEdit;