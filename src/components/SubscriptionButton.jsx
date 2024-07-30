import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const SubscriptionButton = ({ idClient, idFund, isActive, onUpdate, onNotification, amount, minimumAmount }) => {
  const [followed, setFollowed] = useState(isActive);

  useEffect(() => {
    setFollowed(isActive);
  }, [isActive]);

  const toggleFollow = async () => {
    try {
      let response;

      if (followed) {
        response = await axios.put(`${import.meta.env.VITE_API_URL}/transactions/unscribe`, {
          idClient: idClient.toString(),
          idFund: idFund.toString()
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        
        const amountValue = parseFloat(amount);

        if (isNaN(amountValue) || amountValue < minimumAmount) {
            onNotification(`El monto debe ser mayor o igual a $${minimumAmount}.`);
            return;
        }

        response = await axios.post(`${import.meta.env.VITE_API_URL}/transactions/suscribe`, {
          idClient: idClient.toString(),
          idFund: idFund.toString(),
          investedAmount: amountValue
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      setFollowed(!followed);
      onUpdate();
      onNotification(response.data.message);
    } catch (error) {
      if (error.response) {
        // Errores con respuesta HTTP
        switch (error.response.status) {
          case 401:
            onNotification(error.response.data.message);
            break;
          default:
            onNotification('Error al actualizar el estado de suscripción.');
        }
      } else if (error.request) {
        // Error al hacer la solicitud
        onNotification('No se recibió respuesta del servidor.');
      } else {
        // Error al configurar la solicitud
        onNotification('Error al configurar la solicitud.');
      }
    }
  };

  return (
    <Button
      variant={followed ? "outline-danger" : "outline-primary"}
      onClick={toggleFollow}
    >
      {followed ? "Dar de baja" : "Suscribirme"}
    </Button>
  );
};

export default SubscriptionButton;