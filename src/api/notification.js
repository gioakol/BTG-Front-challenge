import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const validateSubscription = async (idClient) => {
    try {
        const response = await axios.get(`${API_URL}/email/validateSubscribe/${idClient}`);
        
        return response.data;
    } catch (error) {
        console.error('Error validando suscripciones en AWS:', error);
        throw error;
    }
};

export const subscribeToNotifications = async (idClient) => {
    try {
        await axios.post(`${API_URL}/email/subscribe/${idClient}`);
    } catch (error) {
        console.error('Error realizando la suscripción a las notificaciones en AWS:', error);
        throw error;
    }
};
