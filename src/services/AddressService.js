import { apiClient } from "./apiClient";

// En la constante se asigna la URL del BACK-END (controller-apis)
const API_REST_BASE_URL = '/api/addresses';

// Llamar al API del Back-End para acceder a sus métodos
export const getAllAddresses = ()=> apiClient.get(API_REST_BASE_URL);
export const addAddress = (address) => apiClient.post(API_REST_BASE_URL, address);
export const deleteAddress = (id)=>apiClient.delete(API_REST_BASE_URL + '/' + id);
export const updateAddress = (id, address) => apiClient.put(API_REST_BASE_URL + '/' + id, address);
export const getAddress = (id) => apiClient.get(API_REST_BASE_URL + '/' + id);
