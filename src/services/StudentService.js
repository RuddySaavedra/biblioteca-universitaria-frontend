// src/services/StudentService.js
import { apiClient } from './apiClient';

// Debe coincidir con tu backend (sin /v1)
const API_REST_BASE_URL = '/api/students';

export const getAllStudents = () => apiClient.get(API_REST_BASE_URL);
export const addStudent    = (student) => apiClient.post(API_REST_BASE_URL, student);
export const deleteStudent = (id) => apiClient.delete(`${API_REST_BASE_URL}/${id}`);
export const updateStudent = (id, student) => apiClient.put(`${API_REST_BASE_URL}/${id}`, student);
export const getStudent    = (id) => apiClient.get(`${API_REST_BASE_URL}/${id}`);
