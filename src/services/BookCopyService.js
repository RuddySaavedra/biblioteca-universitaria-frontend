import axios from 'axios';

// En la constante se asigna la URL del BACK-END (controller-apis)
const API_REST_BASE_URL = 'http://localhost:8080/api/book-copies';

// Llamar al API del Back-End para acceder a sus métodos
export const getAllBookCopies = ()=> axios.get(API_REST_BASE_URL);
export const addBookCopy = (bookCopy)=>axios.post(API_REST_BASE_URL, bookCopy);
export const deleteBookCopy = (id)=>axios.delete(API_REST_BASE_URL + '/' + id);
export const updateBookCopy = (id, bookCopy)=>axios.put(API_REST_BASE_URL + '/' + id, bookCopy);
export const getBookCopy = (id) => axios.get(API_REST_BASE_URL + '/' + id);