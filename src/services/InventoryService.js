import { apiClient } from "./apiClient";

// En la constante se asigna la URL del BACK-END (controller-apis)
const API_REST_BASE_URL = '/api/inventory';

// Llamar al API del Back-End para acceder a sus métodos
export const getAllInventories = ()=> apiClient.get(API_REST_BASE_URL);
export const addInventory = (inventory)=>apiClient.post(API_REST_BASE_URL, inventory);
export const deleteInventory = (id)=>apiClient.delete(API_REST_BASE_URL + '/' + id);
export const updateInventory = (id, inventory)=>apiClient.put(API_REST_BASE_URL + '/' + id, inventory);
export const getInventory = (id) => apiClient.get(API_REST_BASE_URL + '/' + id)
