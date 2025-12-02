import { apiClient } from "./apiClient";

// En la constante se asigna la URL del BACK-END (controller-apis)
const API_REST_BASE_URL = '/api/book-copies';

// Llamar al API del Back-End para acceder a sus métodos
export const getAllBookCopies = ()=> apiClient.get(API_REST_BASE_URL);
export const addBookCopy = (bookCopy)=>apiClient.post(API_REST_BASE_URL, bookCopy);
export const deleteBookCopy = (id)=>apiClient.delete(API_REST_BASE_URL + '/' + id);
export const updateBookCopy = (id, bookCopy)=>apiClient.put(API_REST_BASE_URL + '/' + id, bookCopy);
export const getBookCopy = (id) => apiClient.get(API_REST_BASE_URL + '/' + id);
