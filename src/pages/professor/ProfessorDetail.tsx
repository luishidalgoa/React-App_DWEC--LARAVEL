import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfessorById } from "../../shared/services/laravelFetch";
import type { Professor } from "../../models/professor";

function ProfessorDetail() {
  const { id } = useParams<{ id: string }>();
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

  if (loading) return <div className="text-center mt-5">Cargando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detalles del Profesor</h1>
      {professor && (
        <div className="bg-white shadow-md rounded p-4">
          <p className="mb-2"><strong>ID:</strong> {professor.id}</p>
          <p className="mb-2"><strong>Nombre Completo:</strong> {professor.fullname}</p>
          <p className="mb-2"><strong>Edad:</strong> {professor.age}</p>
          <p className="mb-2"><strong>Género:</strong> {professor.gender}</p>
          <p className="mb-2"><strong>Dirección:</strong> {professor.address}</p>
          <p className="mb-2"><strong>Teléfono:</strong> {professor.telephone}</p>
          <p className="mb-2"><strong>Email:</strong> {professor.email}</p>
        </div>
      )}
    </div>
  );
}

export default ProfessorDetail;