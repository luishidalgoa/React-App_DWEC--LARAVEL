import { useEffect, useState } from "react";
import { deleteCompany, getCompanies } from "../../shared/services/laravelFetch";
import type { Companies } from "../../models/companies";

function Companies() {
  const [companies, setCompanies] = useState<Companies[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        getCompanies().then((res: any) => {
          console.log("Respuesta del backend:", res[1]);
          if (loading) {
            setCompanies(res);
            setLoading(false);
          }
        });
      } catch (err) {
        setError("Error al cargar las empresas");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [companies]);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta empresa?")) {
      try {
        await deleteCompany(Number(id));
        setCompanies(companies.filter((company) => company.id !== id));
      } catch (err) {
        setError("Error al eliminar la empresa");
      }
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <div className="container">
      <h1 className="h1 mb-4">Lista de empresas</h1>

      <a href="/companys/create" className="btn btn-success mb-3">
        Añadir una empresa
      </a>

      <div className="text-center mb-3">
        <a href="/layouts/index" className="btn btn-primary">
          Volver al inicio
        </a>
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>ID del Profesor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {companies.length > 0 ? (
            companies.map((company) => (
              <tr key={company.id}>
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td>{company.address}</td>
                <td>{company.telephone}</td>
                <td>{company.email}</td>
                <td>{company.professor_id}</td>
                <td>
                  <a href={`/companys/${company.id}`} className="btn btn-info btn-sm mr-2">
                    Ver
                  </a>
                  <a href={`/companys/${company.id}/edit`} className="btn btn-warning btn-sm mr-2">
                    Editar
                  </a>
                  <button
                    onClick={() => handleDelete(company.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4">
                No se han encontrado empresas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Companies;