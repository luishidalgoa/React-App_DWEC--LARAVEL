import { Companies } from "../../models/companies";
import { Professor } from "../../models/professor";

/**
 * Este metodo consume la API de Laravel para obtener las empresas
 * @returns
 */
export function getCompanies(): Promise<Companies[]> {
  const apiUrl = import.meta.env.VITE_LARAVEL_API;
  return fetch(apiUrl + "/companies")
    .then((res) => res.json())
    .then((data: { data: Companies[] }) => data.data);
}


export function createCompany(company:Companies):Promise<Companies>{
  const apiUrl = import.meta.env.VITE_LARAVEL_API;
  return fetch(apiUrl + "/companies",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(company)
  })
    .then((res) => res.json())
    .then((data: { data: Companies }) => data.data);
} 

export function getCompanyById(id:number):Promise<Companies>{
  const apiUrl = import.meta.env.VITE_LARAVEL_API;
  return fetch(apiUrl + `/companies/${id}`)
    .then((res) => res.json())
    .then((data: { data: Companies }) => data.data);
}

export function updateCompany(id:number, company:Companies):Promise<Companies>{
  const apiUrl = import.meta.env.VITE_LARAVEL_API;
  return fetch(apiUrl + `/companies/${id}`,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(company)
  })
    .then((res) => res.json())
    .then((data: { data: Companies }) => data.data);
}

export function deleteCompany(id:number):Promise<void>{
  const apiUrl = import.meta.env.VITE_LARAVEL_API;
  return fetch(apiUrl + `/companies/${id}`,{
    method:"DELETE"
  }).then((res) => {
    if(!res.ok){
      throw new Error("Error al eliminar la empresa");
    }
  });
}

export function getProfessor(): Promise<Professor[]> {
  const apiUrl = import.meta.env.VITE_LARAVEL_API;
  return fetch(apiUrl + "/professors")
    .then((res) => res.json())
    .then((data: { data: Professor[] }) => data.data);
}

// Función para obtener los detalles de un profesor por ID (GET)
export function getProfessorById(id: number): Promise<Professor> {
  const apiUrl = import.meta.env.VITE_LARAVEL_API;
  return fetch(apiUrl + `/professors/${id}`)
    .then((res) => res.json())
    .then((data: { data: Professor }) => data.data);
}

// Función para crear un nuevo profesor (POST)
export function createProfessor(professor: Professor): Promise<Professor> {
  const apiUrl = import.meta.env.VITE_LARAVEL_API;
  return fetch(apiUrl + "/professors", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(professor),
  })
    .then((res) => res.json())
    .then((data: { data: Professor }) => data.data);
}

// Función para actualizar un profesor existente (PUT)
export function updateProfessor(
  id: number,
  professor: Professor
): Promise<Professor> {
  const apiUrl = import.meta.env.VITE_LARAVEL_API;
  return fetch(apiUrl + `/professors/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(professor),
  })
    .then((res) => res.json())
    .then((data: { data: Professor }) => data.data);
}

// Función para eliminar un profesor (DELETE)
export function deleteProfessor(id: number): Promise<void> {
  const apiUrl = import.meta.env.VITE_LARAVEL_API;
  return fetch(apiUrl + `/professors/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Error al eliminar el profesor");
    }
  });
}
