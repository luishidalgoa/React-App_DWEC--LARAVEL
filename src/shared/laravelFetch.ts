import { Companies } from "../models/companies";


export class LaravelFetch {
    /**
     * Este metodo consume la API de Laravel para obtener las empresas
     * @returns 
     */
    getCompanies(): Promise<Companies[]> {
        const apiUrl = import.meta.env.VITE_LARAVEL_API;
        console.log("API URL:", apiUrl); //debuger
        return fetch(apiUrl + "/companies")
            .then((res) => {
                 return res.json();
            })
    }
}