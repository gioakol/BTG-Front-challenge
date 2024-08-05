import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getAllFunds  = async () => {
    try {
        const response = await axios.get(`${API_URL}/funds/getAll`);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo toda la información de los fondos:', error);
        throw error;
    }
};
