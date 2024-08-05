import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const subscribeTransaction = async (idClient, idFund, amountValue) => {
    try {
        const response = await axios.post(`${API_URL}/transactions/subscribe`, {
            idClient: idClient.toString(),
            idFund: idFund.toString(),
            investedAmount: amountValue
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    } catch (error) {
        console.error('Error suscribiendo al fondo:', error);
        throw error;
    }
};

export const unsubscribeTransaction = async (idClient, idFund) => {
    try {
        const response = await axios.put(`${API_URL}/transactions/unscribe`, {
            idClient: idClient.toString(),
            idFund: idFund.toString()
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    } catch (error) {
        console.error('Error cancelando la suscripción al fondo:', error);
        throw error;
    }
};