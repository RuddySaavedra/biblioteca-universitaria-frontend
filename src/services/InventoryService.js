import axios from 'axios';

// En la constante se asigna la URL del BACK-END (controller-apis)
const API_REST_BASE_URL = 'http://localhost:8080/api/inventory';

// Llamar al API del Back-End para acceder a sus métodos
export const getAllInventories = ()=> axios.get(API_REST_BASE_URL);
export const addInventory = (inventory)=>axios.post(API_REST_BASE_URL, inventory);
export const deleteInventory = (id)=>axios.delete(API_REST_BASE_URL + '/' + id);
export const updateInventory = (id, inventory)=>axios.put(API_REST_BASE_URL + '/' + id, inventory);
export const getInventory = (id) => axios.get(API_REST_BASE_URL + '/' + id)