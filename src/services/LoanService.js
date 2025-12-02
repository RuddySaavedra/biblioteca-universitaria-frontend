import { apiClient } from "./apiClient";

// URL base del controlador Loan en el backend
const API_REST_BASE_URL = "/api/loans";

// Métodos para consumir el backend
export const getAllLoans = () => apiClient.get(API_REST_BASE_URL);
export const addLoan = (loan) => apiClient.post(API_REST_BASE_URL, loan);
export const deleteLoan = (id) => apiClient.delete(API_REST_BASE_URL + "/" + id);
export const updateLoan = (id, loan) => apiClient.put(API_REST_BASE_URL + "/" + id, loan);
export const getLoan = (id) => apiClient.get(API_REST_BASE_URL + "/" + id);
