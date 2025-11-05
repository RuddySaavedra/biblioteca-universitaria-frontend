import axios from 'axios';

// En la constante se asigna la URL del BACK-END (controller-apis)
const API_REST_BASE_URL = 'http://localhost:8080/api/addresses';

// Llamar al API del Back-End para acceder a sus métodos
export const getAllAddresses = ()=> axios.get(API_REST_BASE_URL);
export const addAddress = (address) => axios.post(API_REST_BASE_URL, address);
export const deleteAddress = (id)=>axios.delete(API_REST_BASE_URL + '/' + id);
export const updateAddress = (id, address) => axios.put(API_REST_BASE_URL + '/' + id, address);
export const getAddress = (id) => axios.get(API_REST_BASE_URL + '/' + id);