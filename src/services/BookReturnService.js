import axios from 'axios';

// En la constante se asigna la URL del BACK-END (controller-apis)
const API_REST_BASE_URL = 'http://localhost:8080/api/book-returns';

// Llamar al API del Back-End para acceder a sus métodos
export const getAllBookReturns = ()=> axios.get(API_REST_BASE_URL);
export const addBookReturn = (bookReturn)=>axios.post(API_REST_BASE_URL, bookReturn);
export const deleteBookReturn = (id)=>axios.delete(API_REST_BASE_URL + '/' + id);
export const updateBookReturn = (id, bookReturn)=>axios.put(API_REST_BASE_URL + '/' + id, bookReturn);
export const getBookReturn = (id) => axios.get(API_REST_BASE_URL + '/' + id);