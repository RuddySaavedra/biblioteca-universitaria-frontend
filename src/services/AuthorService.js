import { apiClient } from "./apiClient";

// En la constante se asigna la URL del BACK-END (controller-apis)
const API_REST_BASE_URL = "/api/authors";

// Llamar al API del Back-End para acceder a sus métodos
export const getAllAuthors = ()=> apiClient.get(API_REST_BASE_URL);
export const addAuthor = (author) => apiClient.post(API_REST_BASE_URL, author);
export const deleteAuthor = (id)=>apiClient.delete(API_REST_BASE_URL + '/' + id);
export const updateAuthor = (id, author) => apiClient.put(API_REST_BASE_URL + '/' + id, author);
export const getAuthor = (id) => apiClient.get(API_REST_BASE_URL + '/' + id);
