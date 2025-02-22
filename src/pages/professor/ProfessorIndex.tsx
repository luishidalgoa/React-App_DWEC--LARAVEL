import { useEffect, useState } from "react";
import { getProfessor, deleteProfessor } from "../../shared/services/laravelFetch";
import type { Professor } from "../../models/professor";

function Professors() {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const res = await getProfessor();
        if (Array.isArray(res)) {
          setProfessors(res);
        } else {
          console.error("La respuesta no es un array:", res);
          setError("Error al cargar los profesores");
        }
      } catch (err) {
        setError("Error al cargar los profesores");
      } finally {
        setLoading(false);
      }
    };

    fetchProfessors();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro?")) {
      try {
        await deleteProfessor(id);
        setProfessors(professors.filter((professor) => professor.id !== id));
      } catch (err) {
        setError("Error al eliminar el profesor");
      }
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Lista de profesores</h1>

      <a href="/professors/create" className="bg-green-500 text-white px-4 py-2 rounded mb-3 inline-block">
        Añadir un profesor
      </a>

      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Nombre Completo</th>
            <th className="py-2 px-4 border">Edad</th>
            <th className="py-2 px-4 border">Género</th>
            <th className="py-2 px-4 border">Dirección</th>
            <th className="py-2 px-4 border">Teléfono</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Compañías</th>
            <th className="py-2 px-4 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {professors.length > 0 ? (
            professors.map((professor) => (
              <tr key={professor.id} className="border-b">
                <td className="py-2 px-4 border">{professor.id}</td>
                <td className="py-2 px-4 border">{professor.fullname}</td>
                <td className="py-2 px-4 border">{professor.age}</td>
                <td className="py-2 px-4 border">{professor.gender}</td>
                <td className="py-2 px-4 border">{professor.address}</td>
                <td className="py-2 px-4 border">{professor.telephone}</td>
                <td className="py-2 px-4 border">{professor.email}</td>
                <td className="py-2 px-4 border">{/* Aquí puedes agregar las compañías si es necesario */}</td>
                <td className="py-2 px-4 border">
                  <a href={`/professors/${professor.id}`} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                    Ver
                  </a>
                  <a href={`/professors/${professor.id}/edit`} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                    Editar
                  </a>
                  <button
                    onClick={() => handleDelete(professor.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center py-4 border">
                No se han encontrado profesores
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="text-center mt-4">
        <a href="/layouts/index" className="bg-blue-500 text-white px-4 py-2 rounded inline-block">
          Volver al inicio
        </a>
      </div>
    </div>
  );
}

export default Professors;