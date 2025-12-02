import { apiClient } from "./apiClient";

const BASE_PATH = "/api/books";

export const getAllBooks = () => apiClient.get(BASE_PATH);
export const addBook = (book) => apiClient.post(BASE_PATH, book);
export const deleteBook = (id) => apiClient.delete(`${BASE_PATH}/${id}`);
export const updateBook = (id, book) => apiClient.put(`${BASE_PATH}/${id}`, book);
export const getBook = (id) => apiClient.get(`${BASE_PATH}/${id}`);
