import axios from 'axios';


const API_REST_BASE_URL = 'http://localhost:8080/api/authors';


export const getAllAuthors = ()=> axios.get(API_REST_BASE_URL);
export const addAuthor = (author) => axios.post(API_REST_BASE_URL, author);
export const updateAuthor = (id, author) => axios.put(API_REST_BASE_URL + '/' + id, author);
export const getAuthor = (id) => axios.get(API_REST_BASE_URL + '/' + id);
export const deleteAuthor = (id)=>axios.delete(API_REST_BASE_URL + '/' + id);