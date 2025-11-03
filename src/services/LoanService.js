import axios from "axios";

// URL base del controlador Loan en el backend
const API_REST_BASE_URL = "http://localhost:8080/api/loans";

// Métodos para consumir el backend
export const getAllLoans = () => axios.get(API_REST_BASE_URL);
export const addLoan = (loan) => axios.post(API_REST_BASE_URL, loan);
export const deleteLoan = (id) => axios.delete(API_REST_BASE_URL + "/" + id);
export const updateLoan = (id, loan) => axios.put(API_REST_BASE_URL + "/" + id, loan);
export const getLoan = (id) => axios.get(API_REST_BASE_URL + "/" + id);
