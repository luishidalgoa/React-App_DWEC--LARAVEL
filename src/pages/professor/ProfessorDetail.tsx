import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProfessorById, deleteProfessor } from "../../shared/services/laravelFetch";
import type { Professor } from "../../models/professor";


function ProfessorDetail() {
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

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este profesor?")) {
      try {
        await deleteProfessor(Number(id));
        navigate("/professors");
      } catch (err) {
        setError("Error al eliminar el profesor");
      }
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <div className="container">
      <h1 className="mb-4">Información del profesor</h1>
      {professor && (
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h3>{professor.fullname}</h3>
          </div>
          <div className="card-body">
            <p><strong>Edad:</strong> {professor.age}</p>
            <p><strong>Género:</strong> {professor.gender}</p>
            <p><strong>Dirección:</strong> {professor.address}</p>
            <p><strong>Teléfono:</strong> {professor.telephone}</p>
            <p><strong>Email:</strong> {professor.email}</p>
            <p><strong>Compañías:</strong></p>
            <ul>
              {professor.companies && professor.companies.map((company) => (
                <li key={company.id}>{company.name}</li>
              ))}
            </ul>
          </div>
          <div className="card-footer text-end">
            <a href="/professors" className="btn btn-secondary">Volver a profesores</a>
            <a href={`/professors/${professor.id}/edit`} className="btn btn-warning">Editar</a>
            <button onClick={handleDelete} className="btn btn-danger">Borrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfessorDetail;