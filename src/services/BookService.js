import axios from 'axios';

// En la constante se asigna la URL del BACK-END (controller-apis)
const API_REST_BASE_URL = 'http://localhost:8080/api/books';

// Llamar al API del Back-End para acceder a sus métodos
export const getAllBooks = ()=> axios.get(API_REST_BASE_URL);
export const addBook = (book)=>axios.post(API_REST_BASE_URL, book);
export const deleteBook = (id)=>axios.delete(API_REST_BASE_URL + '/' + id);
export const updateBook = (id, book)=>axios.put(API_REST_BASE_URL + '/' + id, book);
export const getBook = (id) => axios.get(API_REST_BASE_URL + '/' + id);