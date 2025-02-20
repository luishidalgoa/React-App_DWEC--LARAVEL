import { Companies } from "../../models/companies";

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
