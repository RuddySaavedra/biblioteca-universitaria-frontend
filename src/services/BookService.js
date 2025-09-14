import axios from 'axios';

const REST_API_URL_BASE = 'http://localhost:8080/api';

export const getAllBooks =
    ()=> axios.get(`${REST_API_URL_BASE}/books`);
