import { apiClient } from "./apiClient";

// En la constante se asigna la URL del BACK-END (controller-apis)
const API_REST_BASE_URL = '/api/book-returns';

// Llamar al API del Back-End para acceder a sus métodos
export const getAllBookReturns = ()=> apiClient.get(API_REST_BASE_URL);
export const addBookReturn = (bookReturn)=>apiClient.post(API_REST_BASE_URL, bookReturn);
export const deleteBookReturn = (id)=>apiClient.delete(API_REST_BASE_URL + '/' + id);
export const updateBookReturn = (id, bookReturn)=>apiClient.put(API_REST_BASE_URL + '/' + id, bookReturn);
export const getBookReturn = (id) => apiClient.get(API_REST_BASE_URL + '/' + id);
