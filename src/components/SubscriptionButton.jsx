import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { subscribeTransaction, unsubscribeTransaction } from '../api/transaction';

const SubscriptionButton = ({ idClient, idFund, isActive, onUpdate, onNotification, amount, minimumAmount }) => {
  const [followed, setFollowed] = useState(isActive);

  useEffect(() => {
    setFollowed(isActive);
  }, [isActive]);

  const toggleFollow = async () => {
    try {
      let response;

      if (followed) {
        response = await unsubscribeTransaction(idClient, idFund);
      } else {
        
        const amountValue = parseFloat(amount);

        if (isNaN(amountValue) || amountValue < minimumAmount) {
            onNotification(`El monto debe ser mayor o igual a $${minimumAmount}.`);
            return;
        }

        response = await subscribeTransaction(idClient, idFund, amountValue);
      }

      setFollowed(!followed);
      onUpdate();
      onNotification(response.data.message);
    } catch (error) {
      console.log(error);
      if (error.response) {
        switch (error.response.status) {
          case 401:
            onNotification(error.response.data.message);
            break;
          default:
            onNotification('Error al actualizar el estado de suscripción.');
        }
      } else if (error.request) {
        onNotification('No se recibió respuesta del servidor.');
      } else {
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