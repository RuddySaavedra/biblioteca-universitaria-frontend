// src/services/StudentService.js
import axios from 'axios';

// Debe coincidir con tu backend (sin /v1)
const API_REST_BASE_URL = 'http://localhost:8080/api/students';

export const getAllStudents = () => axios.get(API_REST_BASE_URL);
export const addStudent    = (student) => axios.post(API_REST_BASE_URL, student);
export const deleteStudent = (id) => axios.delete(`${API_REST_BASE_URL}/${id}`);
export const updateStudent = (id, student) => axios.put(`${API_REST_BASE_URL}/${id}`, student);
export const getStudent    = (id) => axios.get(`${API_REST_BASE_URL}/${id}`);
