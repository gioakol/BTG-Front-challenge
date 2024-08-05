import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getClientTransactionsActive = async (idClient) => {
    try {
        const response = await axios.get(`${API_URL}/clientsTransactions/getAllActive/${idClient}`);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo toda la información de un cliente:', error);
        throw error;
    }
};

export const getClientTransactions = async (idClient) => {
    try {
        const response = await axios.get(`${API_URL}/clientsTransactions/getAll/${idClient}`);
        return response.data.transactions;
    } catch (error) {
        console.error('Error obteniendo transacciones de cliente:', error);
        throw error;
    }
};
