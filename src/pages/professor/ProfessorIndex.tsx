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
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <div className="container">
      <h1 className="h1 mb-4">Lista de profesores</h1>

      <a href="/welcome" className="btn btn-success mb-3">Login/Registro</a>

      <div className="text-center mb-3">
        <a href="/layouts/index" className="btn btn-primary">Volver al inicio</a>
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Nombre Completo</th>
            <th>Edad</th>
            <th>Género</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Compañías</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {professors.length > 0 ? (
            professors.map((professor) => (
              <tr key={professor.id}>
                <td>{professor.id}</td>
                <td>{professor.fullname}</td>
                <td>{professor.age}</td>
                <td>{professor.gender}</td>
                <td>{professor.address}</td>
                <td>{professor.telephone}</td>
                <td>{professor.email}</td>
                <td>
                  <ul>
                    {professor.companies && professor.companies.map((company) => (
                      <li key={company.id}>{company.name}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <a href={`/professors/${professor.id}`} className="btn btn-info btn-sm mr-2">Ver</a>
                  <a href={`/professors/${professor.id}/edit`} className="btn btn-warning btn-sm mr-2">Editar</a>
                  <button
                    onClick={() => handleDelete(professor.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center">No se han encontrado profesores</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Professors;