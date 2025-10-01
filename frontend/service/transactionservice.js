import axios from 'axios';
const API_URL = 'http://localhost:5000/api/transactions/';

export const getTransactions = (token) => axios.get(API_URL, { headers: { 'x-auth-token': token } });
export const addTransaction = (data, token) => axios.post(API_URL, data, { headers: { 'x-auth-token': token } });
export const deleteTransaction = (id, token) => axios.delete(API_URL + id, { headers: { 'x-auth-token': token } });
